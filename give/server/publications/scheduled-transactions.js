
import { api } from "../../../rock/lib/api"

const scheduledTransactions = () => {
  if (api._ && api._.baseURL && REST2DDP) {

    // let query = api.parseEndpoint(`
    //   FinancialTransactions/GetContributionTransactions/237198/232269
    // `)

    let allAccounts = api.parseEndpoint(`
      FinancialAccounts?
        $expand=
          ChildAccounts
        &$select=
          PublicName,
          PublicDescription,
          Id,
          ChildAccounts/PublicName,
          ChildAccounts/Id,
          ChildAccounts/PublicDescription
        &$filter=
          ChildAccounts/any(ca: Id ne null) or
          (Id ne null and ParentAccountId eq null)
    `)


    const getSchedules = function(callback) {

      const user = Meteor.users.findOne(this.userId)

      if (!user || !user.services || !user.services.rock || !user.services.rock.PrimaryAliasId) {
        callback(null, [])
        return
      }

      let query =  api.parseEndpoint(`
        FinancialScheduledTransactions?
          $filter=
            AuthorizedPersonAliasId eq ${user.services.rock.PrimaryAliasId} and
            IsActive eq true
          &$expand=
            ScheduledTransactionDetails,
            TransactionFrequencyValue,
            FinancialPaymentDetail,
            FinancialPaymentDetail/CreditCardTypeValue,
            FinancialPaymentDetail/CurrencyTypeValue
          &$select=
            Id,
            CardReminderDate,
            ScheduledTransactionDetails/Amount,
            ScheduledTransactionDetails/AccountId,
            EndDate,
            StartDate,
            NextPaymentDate,
            TransactionFrequencyValue/Value,
            TransactionFrequencyValue/Description,
            FinancialPaymentDetail/CreditCardTypeValue/Value,
            FinancialPaymentDetail/CreditCardTypeValue/Description,
            FinancialPaymentDetail/AccountNumberMasked,
            TransactionCode,
            GatewayScheduleId,
            NumberOfPayments,
            FinancialPaymentDetail/CurrencyTypeValueId,
            FinancialPaymentDetail/Id,
            ScheduledTransactionDetails/Summary,
            ScheduledTransactionDetails/AccountId,
            ScheduledTransactionDetails/ScheduledTransactionId,
            ScheduledTransactionDetails/Summary
      `)


      api.get(query, (err, data) => {
        if (err) { callback(err) }

        api.get(allAccounts, (err, accounts) => {
          if (err) { callback(err) }

          let accountObj = {}

          for (let account of accounts) {

            for (let child of account.ChildAccounts) {
              child.parent = account.Id
              accountObj[child.Id] = child
            }

            delete account.ChildAccounts

            // map parent account
            accountObj[account.Id] = account
          }

          for (let transaction of data) {
            for (let detail of transaction.ScheduledTransactionDetails) {

              let account = accountObj[detail.AccountId]
              if (account) {
                if (account.parent) {
                  detail.Account = accountObj[account.parent]
                  continue
                }
                detail.Account = account
              }
            }
          }

          callback(null, data)
        })

      })
    }


    REST2DDP.publish("scheduledTransactions", {
      collectionName: "scheduledTransactions",
      method: getSchedules,
      jsonPath: "*",
      pollInterval: 10000
    });
    return
  }

}

export default scheduledTransactions
