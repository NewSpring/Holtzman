
import { api } from "../../core/util/rock"
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
          Guid: api.makeGUID(),
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
          Guid: api.makeGUID()
        } }

        const FinancialPaymentDetailId = api.post.sync(`FinancialPaymentDetails`, FinancialPaymentDetail)

        if (FinancialPaymentDetailId.status) {
          return
        }

        // Create ScheduledTransaction
        ScheduledTransaction = { ...ScheduledTransaction, ...{
          Guid: api.makeGUID(),
          AuthorizedPersonAliasId: PrimaryAliasId,
          CreatedByPersonAliasId: PrimaryAliasId,
          ModifiedByPersonAliasId: PrimaryAliasId,
          FinancialPaymentDetailId: FinancialPaymentDetailId
        } }

        const ScheduledTransactionId = api.post.sync(`FinancialScheduledTransactions`, ScheduledTransaction)

        if (ScheduledTransactionId.status) {
          return
        }

        // Create ScheduledTransactionDetails
        for (let ScheduledTransactionDetail of ScheduledTransactionDetails) {
          ScheduledTransactionDetail = { ...ScheduledTransactionDetail, ...{
            AccountId: ScheduledTransactionDetail.AccountId,
            Amount: ScheduledTransactionDetail.Amount,
            Guid: api.makeGUID(),
            ScheduledTransactionId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId
          } }

          api.post.sync(`FinancialScheduledTransactionDetails`, ScheduledTransactionDetail)
        }


        if (FinancialPersonSavedAccounts) {
          // Create FinancialPaymentDetail
          let SecondFinancialPaymentDetail = { ...FinancialPaymentDetail, ...{
            Guid: api.makeGUID()
          } }

          let SecondFinancialPaymentDetailId = api.post.sync(`FinancialPaymentDetails`, SecondFinancialPaymentDetail)

          if (SecondFinancialPaymentDetailId.status) {
            return
          }

          // Create FinancialPersonSavedAccounts
          FinancialPersonSavedAccounts = { ...FinancialPersonSavedAccounts, ...{
            Guid: api.makeGUID(),
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
