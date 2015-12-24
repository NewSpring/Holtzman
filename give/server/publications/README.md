<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Publications for Giving
=======================


**Transactions**
```javascript

const Query = (string) => {
  return string.split("\n").map((x) => { return x.trim()}).join("")
}
https://stock-rock.newspring.cc/api/FinancialTransactions?$filter=AuthorizedPersonAliasId eq 90818&$expand=TransactionDetails,FinancialPaymentDetail,FinancialPaymentDetail/CurrencyTypeValue&$select=

const transactions =  Query(`
  FinancialTransactions?
    $filter=
      AuthorizedPersonAliasId eq 90818
    &$expand=
      TransactionDetails,
      FinancialPaymentDetail,
      FinancialPaymentDetail/CurrencyTypeValue
    &$select=
      Id,
      CreatedDateTime,
      Summary,
      AuthorizedPersonAliasId,
      TransactionDetails/Amount,
      TransactionDetails/CreatedDateTime
      FinancialPaymentDetail/CurrencyTypeValue/Description
      FinancialPaymentDetail/CurrencyTypeValue/Value
`)

const funds = Query(`
  FinancialAccounts?
    $expand=
      ChildAccounts
    &$filter=
      ChildAccounts/any(ca: ca/Id eq ${AccountId}) or
      (Id eq ${AccountId} and ParentAccountId eq null)
`)


const schedules = `https://stock-rock.newspring.cc/api/FinancialScheduledTransactions?$top=100&$expand=ScheduledTransactionDetails,TransactionFrequencyValue,FinancialPaymentDetail,FinancialPaymentDetail/CreditCardTypeValue,FinancialPaymentDetail/BillingLocation`

const savedAccounts = `https://stock-rock.newspring.cc/api/FinancialPersonSavedAccounts?$top=100&$expand=FinancialPaymentDetail,FinancialPaymentDetail/CreditCardTypeValue,FinancialPaymentDetail/CurrencyTypeValue`


const home = `https://stock-rock.newspring.cc/api/Groups/GetFamilies/90818?$expand=GroupLocations,GroupLocations/Location,GroupLocations/GroupLocationTypeValue,Campus&$select=Campus/Name,Campus/ShortCode,GroupLocations/Location/Street1,GroupLocations/Location/Street2,GroupLocations/Location/City,GroupLocations/Location/State,GroupLocations/Location/Country,GroupLocations/Location/PostalCode,GroupLocations/Location/Id,GroupLocations/GroupLocationTypeValue/Value`


```
