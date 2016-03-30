"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _rock = require("../../../util/rock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Meteor.methods({
  "rock/accounts/update": function rockAccountsUpdate(data) {

    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your information");
    }

    var user = Meteor.users.findOne(this.userId);

    var Person = (0, _extends3["default"])({}, data);

    // clean up data
    for (var key in Person) {
      if (!Person[key]) {
        delete Person[key];
      }
    }

    var result = void 0;
    try {
      result = _rock.api.patch.sync("People/" + user.services.rock.PersonId, Person);
    } catch (e) {
      throw new Meteor.Error(e.message);
    }

    if (result.status === 400) {
      throw new Meteor.Error("There was a problem updating your profile");
    }

    return true;
  }
}); /*global Meteor, check */