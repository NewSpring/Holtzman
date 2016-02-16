
import { api } from "../../core/util/rock"
import { makeNewGuid } from "../../core/util/guid"
import { TransactionReciepts } from "../collections/transactions"

const transactions = () => {
  if (api._ && api._.baseURL) {

    TransactionReciepts.find().observe({
      added: function (Transaction) {

        /*

          1. Create person if they dont exist
          2. Create FinancialPaymentDetail
          3. Create Transaction
          4. Create TransactionDetails
          5a. Create FinancialPersonSavedAccounts
          5b. Create location for person?
          6. Remove record

        */

        let { FinancialPaymentDetail, meta, TransactionDetails, _id } = { ...Transaction }
        delete Transaction.meta
        delete Transaction.FinancialPaymentDetail
        delete Transaction.TransactionDetails
        delete Transaction._id

        let { Person, FinancialPersonSavedAccounts } = meta

        let { PrimaryAliasId, PersonId } = { ...Person }
        delete Person.PersonId
        delete Person.PrimaryAliasId

        // Create Person
        Person = { ...Person, ...{
          Guid: makeNewGuid(),
          IsSystem: false,
          Gender: 0,
          SystemNote: "Created from NewSpring Apollos"
        } }

        const isGuest = PersonId ? false : true
        if (!PersonId) {
          PersonId = api.post.sync(`People`, Person)
          PrimaryAliasId = api.get.sync(`People/${PersonId}`).PrimaryAliasId
        }

        // Create FinancialPaymentDetail
        FinancialPaymentDetail = { ...FinancialPaymentDetail, ...{
          Guid: makeNewGuid()
        } }

        const FinancialPaymentDetailId = api.post.sync(`FinancialPaymentDetails`, FinancialPaymentDetail)

        if (FinancialPaymentDetailId.status) {
          return
        }

        // Create Transaction
        Transaction = { ...Transaction, ...{
          Guid: makeNewGuid(),
          AuthorizedPersonAliasId: PrimaryAliasId,
          CreatedByPersonAliasId: PrimaryAliasId,
          ModifiedByPersonAliasId: PrimaryAliasId,
          SourceTypeValueId: api._.rockId ? api._.rockId : 10,
          FinancialPaymentDetailId: FinancialPaymentDetailId,
          TransactionDateTime: new Date()
        } }

        const TransactionId = api.post.sync(`FinancialTransactions`, Transaction)

        if (TransactionId.status) {
          return
        }

        // Create TransactionDetails
        for (let TransactionDetail of TransactionDetails) {
          TransactionDetail = { ...{}, ...{
            AccountId: TransactionDetail.AccountId,
            Amount: TransactionDetail.Amount,
            Guid: makeNewGuid(),
            TransactionId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId
          } }

          api.post.sync(`FinancialTransactionDetails`, TransactionDetail)
        }


        if (FinancialPersonSavedAccounts) {

          // Create FinancialPaymentDetail
          let SecondFinancialPaymentDetail = { ...FinancialPaymentDetail, ...{
            Guid: makeNewGuid()
          } }

          let SecondFinancialPaymentDetailId = api.post.sync(`FinancialPaymentDetails`, SecondFinancialPaymentDetail)

          if (SecondFinancialPaymentDetailId.status) {
            return
          }

          // Create FinancialPersonSavedAccounts
          FinancialPersonSavedAccounts = { ...FinancialPersonSavedAccounts, ...{
            Guid: makeNewGuid(),
            PersonAliasId: PrimaryAliasId,
            FinancialPaymentDetailId: SecondFinancialPaymentDetailId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId
          } }

          if (FinancialPersonSavedAccounts.ReferenceNumber) {
            api.post.sync(`FinancialPersonSavedAccounts`, FinancialPersonSavedAccounts)
          }
        }


        if (TransactionId && !TransactionId.statusText ) {

          // taken from https://github.com/SparkDevNetwork/Rock/blob/cb8cb69aff36cf182b5d35c6e14c8a344b035a90/Rock/Transactions/SendPaymentReciepts.cs
          // setup merge fields
          const mergeFields = {
            Person,
          }

          let totalAmount = 0
          let accountAmounts = []
          for (const detail of TransactionDetails) {
            if (detail.Amount === 0 || !detail.AccountId) {
              continue
            }

            const accountAmount = {
              AccountId: detail.AccountId,
              AccountName: detail.AccountName,
              Amount: detail.Amount,
            }

            accountAmounts.push(accountAmount)
            totalAmount += detail.Amount
          }


          mergeFields["TotalAmount"] = totalAmount
          mergeFields["GaveAnonymous"] = isGuest
          mergeFields["ReceiptEmail"] = Person.Email
          mergeFields["ReceiptEmailed"] = true
          mergeFields["LastName"] = Person.LastName
          mergeFields["FirstNames"] = Person.NickName || Person.FirstName
          mergeFields["TransactionCode"] = Transaction.TransactionCode
          mergeFields["Amounts"] = accountAmounts

          // remove record
          TransactionReciepts.remove(_id, (err) => {
            if (!err) {
              Meteor.call(
                "communication/email/send",
                14, // Default giving system email
                PrimaryAliasId,
                mergeFields,
                (err, response) => {
                  // async stub
                }
              )
            }
          })
        }

      }
    })

  }

}

export default transactions
