/*

  @TODO: Move to NewSpring/apollos-give
 */
Apollos.account = {};


/*

  Apollos.account.translate

  @example take data from a service and format it for Apollos

    Apollos.account.translate([obj, platform])

  @param account [Object] existing object to be translated
  @param platform [String] platform to be translated from
 */

Apollos.account.translate = function (account, platform) {
    var existingAccount;
    if (!account) {
        throw new Meteor.Error("Translation Error", "There is no default account setup because accounts are a one-way sync from Rock");
    }
    if (!platform) {
        platform = Rock.name;
    }
    switch (platform.toUpperCase()) {
    case Rock.name.toUpperCase():
        existingAccount = Apollos.accounts.findOne({
            $or: [{
                guid: RegExp(account.Guid, "i")
            },
            {
                accountId: account.Id
            }]
        });
        existingAccount || (existingAccount = {});
        existingAccount.accountId = account.Id;
        existingAccount.guid = account.Guid;
        existingAccount.campusId = account.CampusId;
        existingAccount.name = account.Name;
        existingAccount.publicName = account.PublicName;
        existingAccount.type = account.AccountTypeValueId;
        existingAccount.startDate = account.StartDate;
        existingAccount.endDate = account.EndDate;
        existingAccount.isActive = account.IsActive;
        existingAccount.description = account.Description;
        return existingAccount;
    }
};


/*

  Apollos.account.update

  @example update a account in apollos with data from the platform

    Apollos.account.update([obj, platform])

  @param account [Object] existing account from other service
  @param platform [String] platform to be update from
 */

Apollos.account.update = function (account, platform) {
    return Apollos.entityHelpers.update("account", "accounts", account, platform);
};


/*

  Apollos.account.delete

  @example take a account and delete it

    Apollos.account.delete(account, [platform])

  @param account [Object|String|Number] existing document, _id, or rock.accountId
  @param platform [String] platform initiating the delete
 */

Apollos.account["delete"] = function (account, platform) {
    return Apollos.entityHelpers["delete"]("account", "accounts", account, platform);
};