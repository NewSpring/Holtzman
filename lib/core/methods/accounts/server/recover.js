"use strict";

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _rock = require("../../../util/rock");

var _validate = require("../../../util/validate");

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RECOVER_ACCOUNT = false; /*global Meteor, check */

if (typeof Accounts != "undefined") {
  Accounts.emailTemplates.enrollAccount.text = function (user, token) {

    // let PersonAliasId, mergeFields
    var PersonId = user.profile.rock.PersonId;
    var _meteor_runtime_conf = __meteor_runtime_config__;
    var ROOT_URL = _meteor_runtime_conf.ROOT_URL;


    var Person = _rock.api.get.sync("People/" + PersonId);

    if (!RECOVER_ACCOUNT) {
      RECOVER_ACCOUNT = _rock.api.get.sync("SystemEmails?$filter=Title eq 'Recover Account'");
      RECOVER_ACCOUNT = RECOVER_ACCOUNT.length ? RECOVER_ACCOUNT[0].Id : false;
    }

    token = token.split("/");
    token = token[token.length - 1];
    if (RECOVER_ACCOUNT) {
      Meteor.call("communication/email/send", RECOVER_ACCOUNT, Number(Person.PrimaryAliasId), {
        ResetPasswordUrl: ROOT_URL + "/_/reset-password/" + token,
        Person: Person
      }, function (err, response) {});
    }

    return false;
  };
}

Meteor.methods({
  "rock/accounts/recover": function rockAccountsRecover(email, PersonId) {

    check(email, String);
    check(PersonId, Number);

    var meteorUserId = void 0;

    // Create Apollos Account
    // try to create new meteor account
    try {
      var _user = Accounts.findUserByEmail(email);
      if (_user && _user._id) {
        meteorUserId = _user._id;
      } else {
        meteorUserId = Accounts.createUser({
          email: email,
          profile: {
            rock: {
              PersonId: PersonId
            }
          }
        });
      }
    } catch (e) {
      throw new Meteor.Error("There was a problem finishing your account, please try again or create a new account");
    }

    // Create Rock Account
    var user = {
      PersonId: PersonId,
      EntityTypeId: 27,
      UserName: email,
      IsConfirmed: false,
      // PlainTextPassword: account.password,
      LastLoginDateTime: "" + (0, _moment2["default"])().toISOString()
    };

    var createdUser = _rock.api.post.sync("UserLogins", user);
    if (createdUser.statusText) {
      throw new Meteor.Error("There was a problem finishing your account, please try again or create a new account");
    }

    try {
      var person = _rock.api.get.sync("People/" + PersonId);
      var PrimaryAliasId = person.PrimaryAliasId;


      Meteor.users.update(meteorUserId, {
        $set: {
          "services.rock": {
            PersonId: PersonId,
            PrimaryAliasId: PrimaryAliasId
          }
        }
      });

      // Send Reset Email
      Accounts.sendEnrollmentEmail(meteorUserId);

      // let the client know
      return true;
    } catch (e) {
      console.error("@@RECOVER_ERROR", e);
      throw new Meteor.Error("There was a problem finishing your account, please try again or create a new account");
    }
  }
});