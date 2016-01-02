
import { api } from "../../../rock/lib/api"
import { ScheduledTransactionReciepts } from "../../lib/collections/collections.scheduled-transactions"

const ScheduledTransactions = () => {
  if (api._ && api._.baseURL) {

    ScheduledTransactionReciepts.find().observe({
      added: function(ScheduledTransaction) {
        console.log("here")
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
        } = {...ScheduledTransaction}

        delete ScheduledTransaction.meta
        delete ScheduledTransaction.FinancialPaymentDetail
        delete ScheduledTransaction.ScheduledTransactionDetails
        delete ScheduledTransaction._id

        let { Person, Location, FinancialPersonSavedAccounts } = meta

        let { PrimaryAliasId, PersonId } = {...Person}
        delete Person.PersonId
        delete Person.PrimaryAliasId

        // Create Person
        Person = {...Person, ...{
          Guid: api.makeGUID(),
          IsSystem: false,
          Gender: 0,
          SystemNote: "Created from NewSpring Apollos",
        }}

        if (!PersonId) {
          PersonId = api.post.sync(`People`, Person)
          PrimaryAliasId = api.get.sync(`People/${PersonId}`).PrimaryAliasId
        }

        // Create FinancialPaymentDetail
        FinancialPaymentDetail = {...FinancialPaymentDetail, ...{
          Guid: api.makeGUID()
        }}

        const FinancialPaymentDetailId = api.post.sync(`FinancialPaymentDetails`, FinancialPaymentDetail)

        // Create ScheduledTransaction
        ScheduledTransaction = {...ScheduledTransaction, ...{
          Guid: api.makeGUID(),
          AuthorizedPersonAliasId: PrimaryAliasId,
          CreatedByPersonAliasId: PrimaryAliasId,
          ModifiedByPersonAliasId: PrimaryAliasId,
          FinancialPaymentDetailId: FinancialPaymentDetailId
        }}

        const ScheduledTransactionId = api.post.sync(`FinancialScheduledTransactions`, ScheduledTransaction)

        // Create ScheduledTransactionDetails
        for (let ScheduledTransactionDetail of ScheduledTransactionDetails) {
          ScheduledTransactionDetail = {...ScheduledTransactionDetail, ...{
            AccountId: ScheduledTransactionDetail.AccountId,
            Amount: ScheduledTransactionDetail.Amount,
            Guid: api.makeGUID(),
            ScheduledTransactionId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId,
          }}

          let ScheduledTransactionDetailId = api.post.sync(`FinancialScheduledTransactionDetails`, ScheduledTransactionDetail)
        }


        if (FinancialPersonSavedAccounts) {
          // Create FinancialPersonSavedAccounts
          FinancialPersonSavedAccounts = {...FinancialPersonSavedAccounts, ...{
            Guid: api.makeGUID(),
            PersonAliasId: PrimaryAliasId,
            FinancialPaymentDetailId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId,
          }}

          let FinancialPersonSavedAccountsId = api.post.sync(`FinancialPersonSavedAccounts`, FinancialPersonSavedAccounts)
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




// {
//   "FinancialPaymentDetail": {
//     "Id": 1443727,
//     "CurrencyTypeValueId": 156,
//     "AccountNumberMasked": "************1111",
//     "CreditCardTypeValue": {
//       "Description": "Visa Card",
//       "Value": "Visa"
//     }
//   },
//   "TransactionFrequencyValue": {
//     "Description": "Once a Month",
//     "Value": "Monthly"
//   },
//   "ScheduledTransactionDetails": [
//     {
//       "ScheduledTransactionId": 1,
//       "Summary": null,
//       "AccountId": 1,
//       "Amount": 10
//     }
//   ],
//   "AuthorizedPersonAliasId": 90818,
//   "TransactionFrequencyValueId": 135,
//   "StartDate": "2015-12-23T00:00:00",
//   "EndDate": null,
//   "NumberOfPayments": null,
//   "NextPaymentDate": "2015-12-23T00:00:00",
//   "LastStatusUpdateDateTime": "2015-12-22T10:13:49.493",
//   "IsActive": true,
//   "FinancialGatewayId": 2,
//   "FinancialPaymentDetailId": 1443727,
//   "TransactionCode": "T20151222101349492",
//   "GatewayScheduleId": "P20151222101349492",
//   "CardReminderDate": null,
//   "LastRemindedDate": null,
//   "CreatedDateTime": "2015-12-22T10:13:49.61",
//   "ModifiedDateTime": "2015-12-22T10:13:49.61",
//   "CreatedByPersonAliasId": 90818,
//   "ModifiedByPersonAliasId": 90818,
//   "Id": 1,
//   "Guid": "f6f10201-4570-4ed8-8287-b8a834429ef1",
//   "ForeignId": null,
//   "ForeignGuid": null,
//   "ForeignKey": null
// },
//

// {
//   "Description": "One Time",
//   "Value": "One-Time",
//   "Id": 130
// },
// {
//   "Description": "Every Week",
//   "Value": "Weekly",
//   "Id": 132
// },
// {
//   "Description": "Every Two Weeks",
//   "Value": "Bi-Weekly",
//   "Id": 133
// },
// {
//   "Description": "Twice a Month",
//   "Value": "Twice a Month",
//   "Id": 134
// },
// {
//   "Description": "Once a Month",
//   "Value": "Monthly",
//   "Id": 135
// },
