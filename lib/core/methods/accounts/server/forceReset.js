"use strict";

var _rock = require("../../../util/rock");

Meteor.methods({
  "rock/accounts/forceReset": function rockAccountsForceReset(Username) {
    check(Username, String);

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      throw new Meteor.Error("NewSpring staff accounts are managed by IT");
    }

    var RockUser = _rock.api.get.sync("UserLogins?$filter=UserName eq '" + Username + "'");
    if (RockUser.statusText || !RockUser.length) {
      // we don't tell people there account doesn't exist
      return true;
    }

    RockUser = RockUser[0];
    var _RockUser = RockUser;
    var PersonId = _RockUser.PersonId;


    try {
      (function () {
        var person = _rock.api.get.sync("People/" + PersonId);
        var PrimaryAliasId = person.PrimaryAliasId;


        var meteorUserId = Accounts.createUser({ email: Username });

        Meteor.users.upsert(meteorUserId, {
          $set: {
            "services.rock": {
              PersonId: PersonId,
              PrimaryAliasId: PrimaryAliasId
            }
          }
        }, function (err, response) {
          if (!err) {
            console.log("sending link");
            Accounts.sendResetPasswordEmail(meteorUserId);
          }
        });
      })();
    } catch (e) {
      console.log(e);
    }

    return true;
  }
}); /*global Meteor, check */