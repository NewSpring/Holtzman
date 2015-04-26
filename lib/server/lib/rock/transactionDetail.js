/*

  @TODO: Move to NewSpring/apollos-give
 */
Rock.transactionDetails = {};


/*

  Rock.transactionDetails.refreshDetails

  @example refesh transactionDetails from Rock

    Rock.transactionDetails.refresh throwErrors

  @param throwErrors [Boolean] switch to silence error throwing
 */

Rock.transactionDetails.refresh = function (throwErrors) {
    var query;
    query = "api/FinancialTransactionDetails ?$select= Id, Guid, TransactionId, AccountId, Amount";
    return Rock.refreshEntity(query, "transactionDetail", "transactionDetails", throwErrors, true);
};