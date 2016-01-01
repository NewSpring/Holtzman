
import { api } from "../../../rock/lib/api"
import { Transactions } from "../../lib/collections"

const transactions = () => {
  if (api._ && api._.baseURL) {
    console.log(api._)
    Transactions.find().observe({
      added: function(Transaction) {

        /*

          1. Create person if they dont exist
          2. Create FinancialPaymentDetail
          3. Create Transaction
          4. Create TransactionDetails
          5. Create location for person
          6. Remove record

        */

        let { FinancialPaymentDetail, meta, TransactionDetails, _id } = {...Transaction}
        delete Transaction.meta
        delete Transaction.FinancialPaymentDetail
        delete Transaction.TransactionDetails
        delete Transaction._id

        let { Person, Location } = meta

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

        // Create Transaction
        Transaction = {...Transaction, ...{
          Guid: api.makeGUID(),
          AuthorizedPersonAliasId: PrimaryAliasId,
          CreatedByPersonAliasId: PrimaryAliasId,
          ModifiedByPersonAliasId: PrimaryAliasId,
          SourceTypeValueId: 10,
          FinancialPaymentDetailId: FinancialPaymentDetailId,
          TransactionDateTime: new Date()
        }}

        const TransactionId = api.post.sync(`FinancialTransactions`, Transaction)


        // Create TransactionDetails
        for (let TransactionDetail of TransactionDetails) {
          TransactionDetail = {...TransactionDetail, ...{
            AccountId: TransactionDetail.AccountId,
            Amount: TransactionDetail.Amount,
            Guid: api.makeGUID(),
            TransactionId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId,
          }}

          let TransactionDetailId = api.post.sync(`FinancialTransactionDetails`, TransactionDetail)
        }

        if (TransactionId && !TransactionId.statusText ) {
          // remove record
          Transactions.remove(_id)
        }

      }
    })

  }

}

export default transactions




// {
//      "FinancialPaymentDetail": {
//        "AccountNumberMasked": null,
//        "CurrencyTypeValueId": 156,
//        "CreditCardTypeValueId": null,
//        "NameOnCardEncrypted": null,
//        "ExpirationMonthEncrypted": null,
//        "ExpirationYearEncrypted": null,
//        "BillingLocationId": null,
//        "CreatedDateTime": null,
//        "ModifiedDateTime": null,
//        "CreatedByPersonAliasId": null,
//        "ModifiedByPersonAliasId": null,
//        "Id": 917571,
//        "Guid": "290782b3-650c-4bc9-85cb-62a1d7270046",
//        "ForeignId": null,
//        "ForeignGuid": null,
//        "ForeignKey": null
//      },
//    "TransactionDetails": [
//      {
//        "TransactionId": 6105,
//        "AccountId": 8,
//        "IsNonCash": false,
//        "Amount": 15,
//        "Summary": null,
//        "EntityTypeId": null,
//        "EntityId": null,
//        "CreatedDateTime": "2014-11-25T09:31:59",
//        "ModifiedDateTime": null,
//        "CreatedByPersonAliasId": null,
//        "ModifiedByPersonAliasId": null,
//        "Id": 6105,
//        "Guid": "eed0491c-f2b3-4bef-993c-00e2c4ead525",
//        "ForeignId": null,
//        "ForeignGuid": null,
//        "ForeignKey": null
//      }
//    ],
//    "AuthorizedPersonAliasId": 90818,
//    "BatchId": null,
//    "FinancialGatewayId": 2,
//    "FinancialPaymentDetailId": 917571,
//    "TransactionDateTime": "2014-11-25T09:31:59",
//    "TransactionCode": null,
//    "Summary": "Reference Number: 4169295172680176327038",
//    "TransactionTypeValueId": 53,
//    "SourceTypeValueId": null,
//    "CheckMicrEncrypted": null,
//    "CheckMicrHash": null,
//    "MICRStatus": null,
//    "CheckMicrParts": null,
//    "ScheduledTransactionId": null,
//    "SundayDate": "2014-11-30T00:00:00",
//    "CreatedDateTime": "2014-11-25T09:31:59",
//    "ModifiedDateTime": null,
//    "CreatedByPersonAliasId": 1,
//    "ModifiedByPersonAliasId": null,
//    "Id": 6105,
//    "Guid": "a86a7d4e-b872-4039-8548-71c468368010",
//    "ForeignId": null,
//    "ForeignGuid": null,
//    "ForeignKey": "305819066"
//  },
