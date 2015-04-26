
###

  @TODO: Move to NewSpring/apollos-give

###

Rock.accounts = {}

###

  Rock.accounts.refreshDetails

  @example refesh accounts from Rock

    Rock.accounts.refresh throwErrors

  @param throwErrors [Boolean] switch to silence error throwing

###
Rock.accounts.refresh = (throwErrors) ->

  query = "api/FinancialAccounts
    ?$select=
      Id,
      Guid,
      Name,
      CampusId,
      IsActive,
      StartDate,
      EndDate,
      PublicName,
      Description,
      AccountTypeValueId"

  Rock.refreshEntity query, "account", "accounts", throwErrors, true
