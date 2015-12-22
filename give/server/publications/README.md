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


```
