
import { api } from "../../core/util/rock"
import { makeNewGuid } from "../../core/util/guid"
import { ScheduledTransactionReciepts } from "../collections/scheduledTransactions"

const ScheduledTransactions = () => {
  if (api._ && api._.baseURL) {

    ScheduledTransactionReciepts.find().observe({
      added: function (ScheduledTransaction) {

        /*

          1. Create person if they dont exist
          2. Create FinancialPaymentDetail
          3. Create ScheduledTransaction
          4. Create ScheduledTransactionDetails
          5a. Create FinancialPersonSavedAccounts
          5b. Create location for person?
          6. Remove record

        */

        let {
          FinancialPaymentDetail,
          meta,
          ScheduledTransactionDetails,
          _id
        } = { ...ScheduledTransaction }

        delete ScheduledTransaction.meta
        delete ScheduledTransaction.FinancialPaymentDetail
        delete ScheduledTransaction.ScheduledTransactionDetails
        delete ScheduledTransaction._id

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

        // Create ScheduledTransaction
        ScheduledTransaction = { ...ScheduledTransaction, ...{
          Guid: makeNewGuid(),
          AuthorizedPersonAliasId: PrimaryAliasId,
          CreatedByPersonAliasId: PrimaryAliasId,
          ModifiedByPersonAliasId: PrimaryAliasId,
          FinancialPaymentDetailId: FinancialPaymentDetailId
        } }


        let ScheduledTransactionId;
        // either mark is active or create schedule
        if (ScheduledTransaction.Id) {

          ScheduledTransactionId = ScheduledTransaction.Id
          delete ScheduledTransaction.Id
          delete ScheduledTransaction.Guid

          let response = api.patch.sync(`FinancialScheduledTransactions/${ScheduledTransactionId}`, ScheduledTransaction)
          if (response.statusText) {
            ScheduledTransactionId = response
          } else {
            // Delete all schedule transaction details associated with this account
            // since new deatils were generated
            let details = api.get.sync(`FinancialScheduledTransactionDetails?$filter=ScheduledTransactionId eq ${ScheduledTransactionId}`)
            for (let oldSchedule of details) {
              let success = api.delete.sync(`FinancialScheduledTransactionDetails/${oldSchedule.Id}`)
            }
          }

        } else {
          ScheduledTransactionId = api.post.sync(`FinancialScheduledTransactions`, ScheduledTransaction)
        }

        if (ScheduledTransactionId.status) {
          return
        }

        // Create ScheduledTransactionDetails
        for (let ScheduledTransactionDetail of ScheduledTransactionDetails) {
          ScheduledTransactionDetail = { ...ScheduledTransactionDetail, ...{
            AccountId: ScheduledTransactionDetail.AccountId,
            Amount: ScheduledTransactionDetail.Amount,
            Guid: makeNewGuid(),
            ScheduledTransactionId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId
          } }

          api.post.sync(`FinancialScheduledTransactionDetails`, ScheduledTransactionDetail)
        }


        if (FinancialPersonSavedAccounts && FinancialPersonSavedAccounts.ReferenceNumber) {
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

          api.post.sync(`FinancialPersonSavedAccounts`, FinancialPersonSavedAccounts)
        }


        if (ScheduledTransactionId && !ScheduledTransactionId.statusText ) {
          // remove record
          ScheduledTransactionReciepts.remove(_id)
        }

      }
    })

  }

}

export default ScheduledTransactions

// "_id" : "ZGjdHYiaJi7xDT6NA",
// "GatewayScheduleId" : "3011999604",
// "TransactionFrequencyValueId" : 132,
// "IsActive" : true,
// "StartDate" : "2016-02-26T05:58:07.080Z",
// "FinancialGatewayId" : 4,
// "ScheduledTransactionDetails" : [
//     {
//         "AccountId" : 1779,
//         "Amount" : 345
//     }
// ],
// "FinancialPaymentDetail" : {
//     "AccountNumberMasked" : "411111******1111",
//     "CurrencyTypeValueId" : 156,
//     "CreditCardTypeValueId" : 7
// },
// "meta" : {
//     "Person" : {
//         "PrimaryAliasId" : 117948,
//         "PersonId" : 117948,
//         "FirstName" : "James",
//         "LastName" : "Baxley",
//         "Email" : "james.baxley@newspring.cc"
//     },
//     "Location" : {
//         "Street1" : "808 Pebble Ln",
//         "Street2" : null,
//         "City" : "Anderson",
//         "State" : "SC",
//         "Postal" : "29621-3452"
//     }
// },
// "Id" : "2385"
