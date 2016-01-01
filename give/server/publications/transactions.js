
import { api } from "../../../rock/lib/api"

const transactions = () => {
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


    const mergeTransactions = function(callback) {

      const user = Meteor.users.findOne(this.userId)

      if (!user || !user.services || !user.services.rock || !user.services.rock.PrimaryAliasId) {
        callback(null, [])
        return
      }

      let query =  api.parseEndpoint(`
        FinancialTransactions?
          $filter=
            AuthorizedPersonAliasId eq ${user.services.rock.PrimaryAliasId}
          &$expand=
            TransactionDetails,
            FinancialPaymentDetail,
            FinancialPaymentDetail/CurrencyTypeValue,
            FinancialPaymentDetail/CreditCardTypeValue
          &$select=
            Id,
            CreatedDateTime,
            Summary,
            AuthorizedPersonAliasId,
            TransactionDetails/Amount,
            TransactionDetails/AccountId,
            TransactionDetails/CreatedDateTime,
            FinancialPaymentDetail/CurrencyTypeValue/Description,
            FinancialPaymentDetail/CurrencyTypeValue/Value,
            FinancialPaymentDetail/CreditCardTypeValue/Description,
            FinancialPaymentDetail/CreditCardTypeValue/Value,
            FinancialPaymentDetail/AccountNumberMasked
      `)

      api.get(query, (err, data) => {
        if (err) { callback(err); return }

        api.get(allAccounts, (err, accounts) => {
          if (err) { callback(err); return }

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
            for (let detail of transaction.TransactionDetails) {

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


    REST2DDP.publish("transactions", {
      collectionName: "transactions",
      method: mergeTransactions,
      jsonPath: "*",
      pollInterval: 10000
    });
    return
  }

}

export default transactions
