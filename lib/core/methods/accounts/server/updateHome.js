"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _rock = require("../../../util/rock");

var _util = require("../../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*global Meteor, check */


Meteor.methods({
  "rock/accounts/updateHome": function rockAccountsUpdateHome(data) {

    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your information");
    }

    var user = Meteor.users.findOne(this.userId);

    var query = _rock.api.parseEndpoint("\n      Groups/GetFamilies/" + user.services.rock.PersonId + "?\n        $expand=\n          GroupLocations,\n          GroupLocations/Location,\n          GroupLocations/GroupLocationTypeValue\n        &$select=\n          Id,\n          GroupLocations/Location/Id,\n          GroupLocations/GroupLocationTypeValue/Value\n    ");

    var locations = _rock.api.get.sync(query);
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

      var location = _ref;

      if (location.GroupLocationTypeValue.Value === "Home") {
        home = location.Location.Id;
      }
    }

    // move campus to another call
    var Campus = data.Campus;
    delete data.Campus;

    if (GroupId) {
      var _result = _rock.api.patch.sync("Groups/" + GroupId, { CampusId: Campus });
    }

    if (home) {
      var success = _rock.api.patch.sync("Locations/" + home, data);
      if (success) {
        return true;
      } else {
        throw new Meteor.Error(success);
      }
    }

    /*
       The user does not have a home so far, we need to create a Location and Group Location
     */

    var Location = (0, _extends3["default"])({
      Guid: (0, _util.makeNewGuid)(),
      IsActive: true
    }, data);

    var LocationId = _rock.api.post.sync("Locations", Location);

    if (!LocationId) {
      throw new Meteor.Error("Location could not be created", Location);
    }

    var GroupLocation = {
      GroupId: GroupId,
      LocationId: LocationId,
      GroupLocationTypeValueId: 19, // Home
      IsMailingLocation: true,
      Guid: (0, _util.makeNewGuid)(),
      CreatedByPersonAliasId: user.services.rock.PrimaryAliasId
    };

    var result = _rock.api.post.sync("GroupLocations", GroupLocation);

    if (result.state === 400) {
      throw new Meteor.Error(result);
    }

    return true;
  }
});