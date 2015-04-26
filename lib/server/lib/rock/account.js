/*

  @TODO: Move to NewSpring/apollos-give
 */
Rock.accounts = {};


/*

  Rock.accounts.refreshDetails

  @example refesh accounts from Rock

    Rock.accounts.refresh throwErrors

  @param throwErrors [Boolean] switch to silence error throwing
 */

Rock.accounts.refresh = function (throwErrors) {
    var query;
    query = "api/FinancialAccounts ?$select= Id, Guid, Name, CampusId, IsActive, StartDate, EndDate, PublicName, Description, AccountTypeValueId";
    return Rock.refreshEntity(query, "account", "accounts", throwErrors, true);
};