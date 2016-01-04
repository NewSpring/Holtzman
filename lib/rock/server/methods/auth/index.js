"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libApi = require("../../../lib/api");

var _coreLib = require("../../../../core/lib");

var _coreLib2 = _interopRequireDefault(_coreLib);

function makeGUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  var guid = "" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  return guid.toUpperCase();
}

Meteor.methods({
  "Rock.auth.available": function RockAuthAvailable(email) {
    check(email, String);

    // special case for AD lookup
    if (email.indexOf("@newspring.cc") > -1) {
      email = email.replace(/@newspring.cc/, "");
    }

    var isAvailable = false;
    try {
      isAvailable = _libApi.api.get.sync("userlogins/available/" + email);
    } catch (e) {
      console.log(e, "DANGER WILL ROBINSON");
      console.log("lookup in users account in meteor");
    }

    return isAvailable;
  },
  "Rock.auth.reset": function RockAuthReset(current, newPassword) {
    check(current, String);
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
    try {
      isAuthorized = _libApi.api.post.sync("Auth/login", { Username: Username, Password: current });
    } catch (e) {
      isAuthorized = false;
    }

    if (!isAuthorized) {
      throw new Meteor.Error("Existing password is incorrect");
    }

    var RockUser = _libApi.api.get.sync("UserLogins?$filter=UserName eq '" + Username + "'");

    RockUser.PlainTextPassword = newPassword;

    try {
      _libApi.api.put.sync("UserLogins/" + RockUser.Id, RockUser);
    } catch (e) {
      throw new Meteor.Error(e);
    }

    Accounts.setPassword(this.userId, newPassword, { logout: false });

    return true;
  },
  "Rock.auth.update": function RockAuthUpdate(data) {

    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your information");
    }

    var user = Meteor.users.findOne(this.userId);

    var Person = _extends({}, data);

    // move campus to another call
    var Campus = Person.Campus;
    delete Person.Campus;

    var result = undefined;
    try {
      result = _libApi.api.patch.sync("People/" + user.services.rock.PersonId, Person);
      var group = _libApi.api.get.sync("Groups/GetFamilies/" + user.services.rock.PersonId + "?$select=Id");
      result = _libApi.api.patch.sync("Groups/" + group[0].Id, { CampusId: Campus });
    } catch (e) {
      throw new Meteor.Error(e);
    }

    if (result.status === 400) {
      throw new Meteor.Error("There was a problem updating your profile");
    }

    return true;
  },
  "Rock.auth.updateHome": function RockAuthUpdateHome(data) {

    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your information");
    }

    var user = Meteor.users.findOne(this.userId);

    var query = _libApi.api.parseEndpoint("\n      Groups/GetFamilies/" + user.services.rock.PersonId + "?\n        $expand=\n          GroupLocations,\n          GroupLocations/Location,\n          GroupLocations/GroupLocationTypeValue\n        &$select=\n          Id,\n          GroupLocations/Location/Id,\n          GroupLocations/GroupLocationTypeValue/Value\n    ");

    var locations = _libApi.api.get.sync(query);
    locations = locations[0];
    var GroupId = locations.Id;
    locations = locations.GroupLocations;

    var home = false;

    for (var _iterator = locations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _location = _ref;

      if (_location.GroupLocationTypeValue.Value === "Home") {
        home = _location.Location.Id;
      }
    }

    if (home) {
      var success = _libApi.api.patch.sync("Locations/" + home, data);
      if (success) {
        console.log(success);
        return true;
      } else {
        throw new Meteor.Error(success);
      }
    }

    /*
       The user does not have a home so far, we need to create a Location and Group Location
     */

    var Location = _extends({
      Guid: makeGUID(),
      isActive: true
    }, data);

    var LocationId = _libApi.api.post.sync("Locations", Location);

    if (!LocationId) {
      throw new Meteor.Error("Location could not be created", Location);
    }

    var GroupLocation = {
      GroupId: GroupId,
      LocationId: LocationId,
      GroupLocationTypeValueId: 19, // Home
      IsMailingLocation: true,
      Guid: makeGUID(),
      CreatedByPersonAliasId: user.services.rock.PrimaryAliasId
    };

    var result = _libApi.api.post.sync("GroupLocations", GroupLocation);

    if (result.state === 400) {
      throw new Meteor.Error(result);
    }

    return true;
  },
  "Rock.auth.login": function RockAuthLogin(Username, password) {
    check(Username, String);
    check(password, String);

    var email = Username;

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      Username = Username.replace(/@newspring.cc/, "");
    }

    var isAuthorized = false;
    try {
      isAuthorized = _libApi.api.post.sync("Auth/login", { Username: Username, Password: password });
    } catch (e) {
      isAuthorized = false;
    }

    var userAccount = Accounts.findUserByEmail(email);

    // ensure the users exists if they tried to login
    if (isAuthorized && !userAccount) {
      userAccount = Accounts.createUser({
        email: email,
        password: password
      });
    }

    _libApi.api.get("UserLogins?$filter=UserName eq '" + Username + "'", function (err, user) {
      var PersonId = user[0].PersonId;

      _libApi.api.get("People/" + PersonId, function (err, person) {
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
      });
    });

    return isAuthorized;
  },
  "Rock.auth.signup": function RockAuthSignup(account) {
    check(account.email, String);
    check(account.firstName, String);
    check(account.lastName, String);
    check(account.password, String);

    // return variable
    var success = false;

    // special case for AD lookup
    if (account.email.indexOf("@newspring.cc") > -1) {
      return false;
    }

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
      Guid: _libApi.api.makeGUID(),
      FirstName: account.firstName,
      LastName: account.lastName,
      IsSystem: false,
      Gender: 0,
      SystemNote: "Created from NewSpring Apollos"
    };

    var PersonId = null;
    _libApi.api.post("People", Person, function (err, PersonId) {
      // create user
      var user = {
        PersonId: PersonId,
        EntityTypeId: 27,
        UserName: account.email,
        PlainTextPassword: account.password
      };

      _libApi.api.post("UserLogins", user, function (err, userId) {
        _libApi.api.get("People/" + PersonId, function (err, createdPerson) {
          var PrimaryAliasId = createdPerson.PrimaryAliasId;

          Meteor.users.update(meteorUserId, {
            $set: {
              "services.rock": {
                PersonId: PersonId,
                PrimaryAliasId: PrimaryAliasId
              }
            }
          }, function (err, id) {});
        });
      });
    });

    console.log(success);
    return success;
  }
});