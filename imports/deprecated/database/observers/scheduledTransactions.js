
import { api } from "../../../util/rock";
import makeNewGuid from "../../../util/guid";
import { ScheduledTransactionReciepts } from "../collections/scheduledTransactions";
import { upsertLocations } from "./upsertLocations";

const ScheduledTransactions = () => {
  if (api._ && api._.baseURL) {
    ScheduledTransactionReciepts.find().observe({
      added(doc) {
        let ScheduledTransaction = doc;
        /*

          This is a crude (but hopefully successful) way to
          prevent a load balanced env from creating duplicated transactions

        */
        if (ScheduledTransaction.__processing) { // eslint-disable-line
          return;
        }

        ScheduledTransactionReciepts.update(ScheduledTransaction._id, { // eslint-disable-line
          $set: {
            __processing: true,
          },
        });

        delete ScheduledTransaction.__processing; // eslint-disable-line

        /*

          1. Create person if they dont exist
          2. Create FinancialPaymentDetail
          3. Create ScheduledTransaction
          4. Create ScheduledTransactionDetails
          5a. Create FinancialPersonSavedAccounts
          5b. Create location for person?
          6. Remove record

        */

        const {
          meta,
          ScheduledTransactionDetails,
          _id,
        } = { ...ScheduledTransaction };

        let { FinancialPaymentDetail } = { ...ScheduledTransaction };

        delete ScheduledTransaction.meta;
        delete ScheduledTransaction.FinancialPaymentDetail;
        delete ScheduledTransaction.ScheduledTransactionDetails;
        delete ScheduledTransaction._id; // eslint-disable-line

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
          console.error("@@SCHEDULE_TRANSACTION_ERROR", e, PersonId, PrimaryAliasId);
        }


        // Create FinancialPaymentDetail
        FinancialPaymentDetail = { ...FinancialPaymentDetail, ...{ Guid: makeNewGuid() } };

        const FinancialPaymentDetailId = api.post.sync(
          "FinancialPaymentDetails", FinancialPaymentDetail,
        );


        if (FinancialPaymentDetailId.status) return;

        // Create ScheduledTransaction
        ScheduledTransaction = { ...ScheduledTransaction,
          ...{
            Guid: makeNewGuid(),
            AuthorizedPersonAliasId: PrimaryAliasId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId,
            FinancialPaymentDetailId,
          },
        };


        let ScheduledTransactionId;
        // either mark is active or create schedule
        if (ScheduledTransaction.Id) {
          ScheduledTransactionId = ScheduledTransaction.Id;
          delete ScheduledTransaction.Id;
          delete ScheduledTransaction.Guid;

          const response = api.patch.sync(
            `FinancialScheduledTransactions/${ScheduledTransactionId}`, ScheduledTransaction,
          );
          if (response.statusText) {
            ScheduledTransactionId = response;
          } else {
            // Delete all schedule transaction details associated with this account
            // since new deatils were generated
            const details = api.get.sync(
              // eslint-disable-next-line max-len
              `FinancialScheduledTransactionDetails?$filter=ScheduledTransactionId eq ${ScheduledTransactionId}`,
            );
            for (const oldSchedule of details) {
              api.delete.sync(`FinancialScheduledTransactionDetails/${oldSchedule.Id}`);
            }
          }
        } else {
          ScheduledTransactionId = api.post.sync(
            "FinancialScheduledTransactions", ScheduledTransaction,
          );
        }

        if (ScheduledTransactionId.status) return;

        // Create ScheduledTransactionDetails
        for (let ScheduledTransactionDetail of ScheduledTransactionDetails) {
          ScheduledTransactionDetail = { ...ScheduledTransactionDetail,
            ...{
              AccountId: ScheduledTransactionDetail.AccountId,
              Amount: ScheduledTransactionDetail.Amount,
              Guid: makeNewGuid(),
              ScheduledTransactionId,
              CreatedByPersonAliasId: PrimaryAliasId,
              ModifiedByPersonAliasId: PrimaryAliasId,
            },
          };

          api.post.sync("FinancialScheduledTransactionDetails", ScheduledTransactionDetail);
        }


        if (FinancialPersonSavedAccounts && FinancialPersonSavedAccounts.ReferenceNumber) {
          // Create FinancialPaymentDetail
          const SecondFinancialPaymentDetail = { ...FinancialPaymentDetail,
            ...{ Guid: makeNewGuid() },
          };

          const SecondFinancialPaymentDetailId = api.post.sync(
            "FinancialPaymentDetails", SecondFinancialPaymentDetail,
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

          api.post.sync("FinancialPersonSavedAccounts", FinancialPersonSavedAccounts);
        }


        if (ScheduledTransactionId && !ScheduledTransactionId.statusText) {
          // remove record
          ScheduledTransactionReciepts.remove(_id);
        }
      },
    });
  }
};

export default ScheduledTransactions;
