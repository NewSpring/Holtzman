
import { api } from "../../../util/rock";
import makeNewGuid from "../../../util/guid";
import { TransactionReciepts } from "../collections/transactions";
import { upsertLocations } from "./upsertLocations";

let GIVING_EMAIL_ID = false;
const transactions = () => {
  if (api._ && api._.baseURL) {
    TransactionReciepts.find().observe({
      added(doc) {
        let Transaction = doc;
        /*

          This is a crude (but hopefully successful) way to
          prevent a load balanced env from creating duplicated transactions

        */
        // eslint-disable-next-line
        if (Transaction.__processing) return;

        TransactionReciepts.update(Transaction._id, { // eslint-disable-line
          $set: {
            __processing: true,
          },
        });


        delete Transaction.__processing; // eslint-disable-line


        /*

          1. Create person if they dont exist
          2. Create FinancialPaymentDetail
          3. Create Transaction
          4. Create TransactionDetails
          5a. Create FinancialPersonSavedAccounts
          5b. Create location for person?
          6. Remove record

        */

        const { meta, TransactionDetails, _id } = { ...Transaction };
        let { FinancialPaymentDetail } = { ...Transaction };

        delete Transaction.meta;
        delete Transaction.FinancialPaymentDetail;
        delete Transaction.TransactionDetails;
        delete Transaction._id; // eslint-disable-line

        const { Location } = meta;
        let { Person, FinancialPersonSavedAccounts } = meta;

        let { PrimaryAliasId, PersonId } = { ...Person };
        delete Person.PersonId;
        delete Person.PrimaryAliasId;

        // Create Person
        Person = { ...Person,
          ...{
            Guid: makeNewGuid(),
            IsSystem: false,
            Gender: 0,
            ConnectionStatusValueId: 67, // Web Prospect
            SystemNote: `Created from NewSpring Apollos on ${__meteor_runtime_config__.ROOT_URL}`,
          },
        };

        const isGuest = !PersonId;
        // This scope issue is bizzare to me, but this works
        const ScopedAliasId = PrimaryAliasId;
        if (!PersonId) {
          PersonId = api.post.sync("People", Person);
          PrimaryAliasId = api.get.sync(`People/${PersonId}`).PrimaryAliasId;
        } else {
          let RockPerson = api.get.sync(`PersonAlias/${ScopedAliasId}`);
          const RockPersonId = RockPerson.Person.Id;
          RockPerson = api.get.sync(`People/${RockPersonId}`);
          Person = { ...Person, ...RockPerson };
          PrimaryAliasId = Person.PrimaryAliasId;
          PersonId = Person.Id;
        }

        try {
          // add locatin data to person
          upsertLocations(PersonId, Location);
        } catch (e) {
          // eslint-disable-next-line
          console.error("@@TRANSACTION_ERROR", e, PersonId, PrimaryAliasId);
        }


        // Create FinancialPaymentDetail
        FinancialPaymentDetail = { ...FinancialPaymentDetail,
          ...{ Guid: makeNewGuid() },
        };

        const FinancialPaymentDetailId = api.post.sync(
          "FinancialPaymentDetails", FinancialPaymentDetail
        );

        if (FinancialPaymentDetailId.status) return;

        // Create Transaction
        Transaction = { ...Transaction,
          ...{
            Guid: makeNewGuid(),
            AuthorizedPersonAliasId: PrimaryAliasId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId,
            SourceTypeValueId: api._.rockId ? api._.rockId : 10,
            FinancialPaymentDetailId,
            TransactionDateTime: new Date(),
          },
        };

        const TransactionId = api.post.sync("FinancialTransactions", Transaction);

        if (TransactionId.status) return;

        // Create TransactionDetails
        for (let TransactionDetail of TransactionDetails) {
          TransactionDetail = { ...{},
            ...{
              AccountId: TransactionDetail.AccountId,
              Amount: TransactionDetail.Amount,
              Guid: makeNewGuid(),
              TransactionId,
              CreatedByPersonAliasId: PrimaryAliasId,
              ModifiedByPersonAliasId: PrimaryAliasId,
            },
          };

          api.post.sync("FinancialTransactionDetails", TransactionDetail);
        }


        if (FinancialPersonSavedAccounts) {
          // Create FinancialPaymentDetail
          const SecondFinancialPaymentDetail = { ...FinancialPaymentDetail,
            ...{ Guid: makeNewGuid() },
          };

          const SecondFinancialPaymentDetailId = api.post.sync(
            "FinancialPaymentDetails", SecondFinancialPaymentDetail
          );

          if (SecondFinancialPaymentDetailId.status) return;

          // Create FinancialPersonSavedAccounts
          FinancialPersonSavedAccounts = { ...FinancialPersonSavedAccounts,
            ...{
              Guid: makeNewGuid(),
              PersonAliasId: PrimaryAliasId,
              FinancialPaymentDetailId: SecondFinancialPaymentDetailId,
              CreatedByPersonAliasId: PrimaryAliasId,
              ModifiedByPersonAliasId: PrimaryAliasId,
            },
          };

          if (FinancialPersonSavedAccounts.ReferenceNumber) {
            // @TODO we need a way to let the UI know if this worked or not
            // if we start getting reports of people not being able to save accounts
            // look here first
            api.post.sync("FinancialPersonSavedAccounts", FinancialPersonSavedAccounts);
          }
        }


        if (TransactionId && !TransactionId.statusText) {
          // taken from https://github.com/SparkDevNetwork/Rock/blob/cb8cb69aff36cf182b5d35c6e14c8a344b035a90/Rock/Transactions/SendPaymentReciepts.cs
          // setup merge fields
          const mergeFields = {
            Person,
          };

          let totalAmount = 0;
          const accountAmounts = [];
          for (const detail of TransactionDetails) {
            if (detail.Amount === 0 || !detail.AccountId) continue; // eslint-disable-line

            const accountAmount = {
              AccountId: detail.AccountId,
              AccountName: detail.AccountName,
              Amount: detail.Amount,
            };

            accountAmounts.push(accountAmount);
            totalAmount += detail.Amount;
          }


          mergeFields.TotalAmount = totalAmount;
          mergeFields.GaveAnonymous = isGuest;
          mergeFields.ReceiptEmail = Person.Email;
          mergeFields.ReceiptEmailed = true;
          mergeFields.LastName = Person.LastName;
          mergeFields.FirstNames = Person.NickName || Person.FirstName;
          mergeFields.TransactionCode = Transaction.TransactionCode;
          mergeFields.Amounts = accountAmounts;
          mergeFields.AccountNumberMasked = FinancialPaymentDetail.AccountNumberMasked.slice(-4);

          // remove record
          TransactionReciepts.remove(_id, err => {
            if (!err) {
              if (!GIVING_EMAIL_ID) {
                GIVING_EMAIL_ID = api.get.sync("SystemEmails?$filter=Title eq 'Giving Receipt'");
                GIVING_EMAIL_ID = GIVING_EMAIL_ID[0].Id;
              }

              Meteor.call(
                "communication/email/send",
                GIVING_EMAIL_ID, // Default giving system email
                PrimaryAliasId,
                mergeFields,
                () => {
                  // async stub
                }
              );
            }
          });
        }
      },
    });
  }
};

export default transactions;
