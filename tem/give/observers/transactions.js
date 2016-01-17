
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
          SourceTypeValueId: 10,
          FinancialPaymentDetailId: FinancialPaymentDetailId,
          TransactionDateTime: new Date()
        } }

        const TransactionId = api.post.sync(`FinancialTransactions`, Transaction)

        if (TransactionId.status) {
          return
        }

        // Create TransactionDetails
        for (let TransactionDetail of TransactionDetails) {
          TransactionDetail = { ...TransactionDetail, ...{
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

          if (FinancialPersonSavedAccounts.TransactionCode) {
            api.post.sync(`FinancialPersonSavedAccounts`, FinancialPersonSavedAccounts)
          }
        }


        if (TransactionId && !TransactionId.statusText ) {
          // remove record
          TransactionReciepts.remove(_id)
        }

      }
    })

  }

}

export default transactions
