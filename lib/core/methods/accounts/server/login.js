"use strict";

var _rock = require("../../../util/rock");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*global Meteor, check */


Meteor.methods({
  "rock/accounts/login": function rockAccountsLogin(Username, password) {
    check(Username, String);
    check(password, String);

    var email = Username;

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      Username = Username.replace(/@newspring.cc/, "");
    }

    var isAuthorized = _rock.api.post.sync("Auth/login", { Username: Username, Password: password });

    if (isAuthorized.statusText) {
      throw new Meteor.Error("Your password is incorrect");
    }

    var userAccount = Accounts.findUserByEmail(email);

    // ensure the users exists if they tried to login
    if (isAuthorized && !userAccount) {
      userAccount = Accounts.createUser({
        email: email,
        password: password
      });

      var user = _rock.api.get.sync("UserLogins?$filter=UserName eq '" + Username + "'");
      var PersonId = user[0].PersonId;

      if (!user[0].IsConfirmed) {
        _rock.api.post("UserLogins/" + user[0].Id, { IsConfirmed: true }, function (err, response) {
          console.log(err, response);
        });
      }

      _rock.api.patch("UserLogins/" + user[0].Id, {
        LastLoginDateTime: "" + (0, _moment2["default"])().toISOString()
      });

      var person = _rock.api.get.sync("People/" + PersonId);
      var PrimaryAliasId = person.PrimaryAliasId;


      if (userAccount) {
        Meteor.users.update(userAccount._id || userAccount, {
          $set: {
            "services.rock": {
              PersonId: PersonId,
              PrimaryAliasId: PrimaryAliasId
            }
          }
        });
      }

      if (process.env.NODE_ENV === "production") {

        Meteor.setTimeout(function () {

          var currentCount = Meteor.users.find().count();
          var missing = ("" + (50000 - currentCount)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          var text = "Another user signed up for a NewSpring Account! Only " + missing + " to go!";

          Meteor.call("communication/slack/send", text, "#users");
        }, 10);
      }

      // slack hook here
    }
    // ensure meteor password is same as rock's
    else {
        Accounts.setPassword(userAccount._id, password, { logout: false });
        _rock.api.get("UserLogins?$filter=UserName eq '" + Username + "'", function (err, user) {
          var PersonId = user[0].PersonId;


          if (!user[0].IsConfirmed) {
            _rock.api.post("UserLogins/" + user[0].Id, { IsConfirmed: true }, function (err, response) {
              console.log(err, response);
            });
          }

          _rock.api.patch("UserLogins/" + user[0].Id, {
            LastLoginDateTime: "" + (0, _moment2["default"])().toISOString()
          });

          _rock.api.get("People/" + PersonId, function (err, person) {
            var PrimaryAliasId = person.PrimaryAliasId;


            if (userAccount) {
              var userRock = userAccount.services.rock;
              if (userRock.PersonId != PersonId || userRock.PrimaryAliasId != PrimaryAliasId) {
                Meteor.users.update(userAccount._id || userAccount, {
                  $set: {
                    "services.rock": {
                      PersonId: PersonId,
                      PrimaryAliasId: PrimaryAliasId
                    }
                  }
                });
              }
            }
          });
        });
      }

    return isAuthorized;
  }
});