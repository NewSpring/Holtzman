/*

  @TODO: Move to NewSpring/apollos-give
 */
Rock.transactions = {};


/*

  Rock.transactions.refreshDetails

  @example refesh transactions from Rock

    Rock.transactions.refresh throwErrors

  @param throwErrors [Boolean] switch to silence error throwing
 */

Rock.transactions.refresh = function (throwErrors) {
    var transactionsQuery;
    transactionsQuery = "api/FinancialTransactions ?$select= Id, Guid, SourceTypeValueId, TransactionDateTime, CreditCardTypeValueId, CurrencyTypeValueId";
    return Rock.refreshEntity(transactionsQuery, "transaction", "transactions", throwErrors, true);
};