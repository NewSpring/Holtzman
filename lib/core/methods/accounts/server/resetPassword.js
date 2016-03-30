"use strict";

var _rock = require("../../../util/rock");

var RESET_EMAIL_ID = false; /*global Meteor, check */

if (typeof Accounts != "undefined") {
  Accounts.emailTemplates.resetPassword.text = function (user, token) {

    // let PersonAliasId, mergeFields
    var _user$services$rock = user.services.rock;
    var PersonAliasId = _user$services$rock.PersonAliasId;
    var PersonId = _user$services$rock.PersonId;
    var _meteor_runtime_conf = __meteor_runtime_config__;
    var ROOT_URL = _meteor_runtime_conf.ROOT_URL;


    var Person = _rock.api.get.sync("People/" + PersonId);

    if (!RESET_EMAIL_ID) {
      RESET_EMAIL_ID = _rock.api.get.sync("SystemEmails?$filter=Title eq 'Reset Password'");
      RESET_EMAIL_ID = RESET_EMAIL_ID[0].Id;
    }

    token = token.split("/");
    token = token[token.length - 1];
    Meteor.call("communication/email/send", RESET_EMAIL_ID, Number(Person.PrimaryAliasId), {
      ResetPasswordUrl: ROOT_URL + "/_/reset-password/" + token,
      Person: Person
    }, function (err, response) {});

    return false;
  };
}

Meteor.methods({
  "rock/accounts/reset": function rockAccountsReset(current, newPassword) {
    // check(current, String)
    check(newPassword, String);

    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your password");
    }

    var user = Meteor.users.findOne(this.userId);
    var email = user.emails[0].address;
    var Username = email; // this will need to be adjusted long term

    // special case for AD lookup
    if (email.indexOf("@newspring.cc") > -1) {
      throw new Meteor.Error("NewSpring staff accounts are managed by IT");
    }

    var isAuthorized = false;
    if (current) {
      try {
        isAuthorized = _rock.api.post.sync("Auth/login", { Username: Username, Password: current });
      } catch (e) {
        isAuthorized = false;
      }

      if (!isAuthorized) {
        throw new Meteor.Error("Existing password is incorrect");
      }
    }

    var RockUser = _rock.api.get.sync("UserLogins?$filter=UserName eq '" + Username + "'");
    RockUser = RockUser[0];
    RockUser.PlainTextPassword = newPassword;
    RockUser.IsConfirmed = true;
    RockUser.EntityTypeId = 27;
    try {
      var response = _rock.api.put.sync("UserLogins/" + RockUser.Id, RockUser);
      if (response.statusText) {
        console.error("@@GROUP_ADD_ERROR", RockUser, response);
        throw new Meteor.Error("It looks like we had an unexpected issue! We are so sorry! Please try again");
      }
    } catch (e) {
      console.error("@@GROUP_ADD_SECOND_ERROR", e, e.message);
      throw new Meteor.Error("It looks like we had an unexpected issue! We are so sorry! Please try again");
    }

    Accounts.setPassword(this.userId, newPassword, { logout: false });

    return true;
  }
});