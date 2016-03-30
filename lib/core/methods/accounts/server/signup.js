"use strict";

var _rock = require("../../../util/rock");

var _util = require("../../../util");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NEW_USER_EMAL_ID = false; /*global Meteor, check */

Meteor.methods({

  "rock/accounts/signup": function rockAccountsSignup(account) {
    check(account.email, String);
    check(account.firstName, String);
    check(account.lastName, String);
    check(account.password, String);

    // special case for AD lookup
    if (account.email.indexOf("@newspring.cc") > -1) {
      return Meteor.call("rock/accounts/login", account.email, account.password);
    }

    var existing = _rock.api.get.sync("UserLogins?$filter=UserName eq '" + account.email + "'");
    if (!existing.statusText && existing[0] && existing[0].Id) {
      return Meteor.call("rock/accounts/login", account.email, account.password);
    }

    // return variable
    var success = false;

    // see if they already have a meteor account (they shouldn't)
    var userAccount = Accounts.findUserByEmail(account.email);

    // if they do, kill it with fire
    if (userAccount) {
      Meteor.users.remove(userAccount._id);
    }

    var meteorUserId = null;
    // try to create new meteor account
    try {
      meteorUserId = Accounts.createUser({
        email: account.email,
        password: account.password
      });
      success = true;
    } catch (e) {
      return false;
    }

    /*
       Create person in Rock
       Async
     */

    // Create person
    var Person = {
      Email: account.email,
      Guid: (0, _util.makeNewGuid)(),
      FirstName: account.firstName,
      LastName: account.lastName,
      IsSystem: false,
      Gender: 0,
      ConnectionStatusValueId: 67, // Web Prospect
      SystemNote: "Created from NewSpring Apollos on " + __meteor_runtime_config__.ROOT_URL
    };

    var PersonId = _rock.api.post.sync("People", Person);
    // create user
    var user = {
      PersonId: PersonId,
      EntityTypeId: 27,
      UserName: account.email,
      IsConfirmed: true,
      PlainTextPassword: account.password,
      LastLoginDateTime: "" + (0, _moment2["default"])().toISOString()
    };

    var createdUser = _rock.api.post.sync("UserLogins", user);

    Person = _rock.api.get.sync("People/" + PersonId);

    var _Person = Person;
    var PrimaryAliasId = _Person.PrimaryAliasId;

    Meteor.users.update(meteorUserId, {
      $set: {
        "services.rock": {
          PersonId: PersonId,
          PrimaryAliasId: PrimaryAliasId
        }
      }
    });

    Meteor.setTimeout(function () {
      if (!NEW_USER_EMAL_ID) {
        NEW_USER_EMAL_ID = _rock.api.get.sync("SystemEmails?$filter=Title eq 'Account Created'");
        NEW_USER_EMAL_ID = NEW_USER_EMAL_ID[0].Id;
      }

      var UserLogin = _rock.api.get.sync("UserLogins/" + createdUser);
      // @TODO setup methods for deleting account and confirming - ConfirmAccountUrl

      Meteor.call("communication/email/send", NEW_USER_EMAL_ID, Number(Person.PrimaryAliasId), {
        Person: Person,
        User: UserLogin

      }, function (err, response) {});

      if (process.env.NODE_ENV === "production") {
        var currentCount = Meteor.users.find().count();
        var missing = ("" + (50000 - currentCount)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        var text = "Another user signed up for a NewSpring Account! Only " + missing + " to go!";

        Meteor.call("communication/slack/send", text, "#users");
      }
    }, 100);

    return success;
  }
});