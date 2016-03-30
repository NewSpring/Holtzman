"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.upsertLocations = upsertLocations;

var _rock = require("../../core/util/rock");

var _guid = require("../../core/util/guid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HomeId = false;
var BillingAddressId = false;
function upsertLocations(PersonId, Location) {

  if (!PersonId || !Location) {
    return;
  }

  // verify the defined values are correctly in Rock
  // if they aren't in Rock already add them
  if (!HomeId || !BillingAddressId) {
    var locationTypes = _rock.api.get.sync("DefinedValues?$filter=DefinedTypeId eq 15");
    for (var _iterator = locationTypes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var loc = _ref;

      if (loc.Value === "Home") {
        HomeId = loc.Id;
        continue;
      }

      if (loc.Value === "Billing Address") {
        BillingAddressId = loc.Id;
      }
    }

    // this location type doesn't exist yet
    if (!BillingAddressId) {
      var BillingLocationDefinedValue = {
        IsSystem: false,
        Guid: (0, _guid.makeNewGuid)(),
        Value: "Billing Address",
        DefinedTypeId: 15,
        Order: 0,
        Description: "Address created from a transaction if the used address isn't already on file"
      };

      BillingAddressId = _rock.api.post.sync("DefinedValues", BillingLocationDefinedValue);
    }
  }

  // get the locations of a person
  var query = _rock.api.parseEndpoint("\n    Groups/GetFamilies/" + PersonId + "?\n      $expand=\n        GroupLocations,\n        GroupLocations/Location,\n        GroupLocations/GroupLocationTypeValue\n  ");

  // get the group details
  var locations = _rock.api.get.sync(query);

  // only select the first family for now
  locations = locations[0];

  // store the Id for easy upserts / posts
  var GroupId = locations.Id;

  // repurpose the locations variable
  locations = locations.GroupLocations;

  // see if Street1 of the location matches any on file
  var home = false,
      exists = false;

  for (var _iterator2 = locations, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var _loc = _ref2;


    var location = _loc.Location;
    // this location is probably already on file
    if (location && location.Street1.trim() === Location.Street1.trim()) {
      exists = true;
      break;
    }

    // see if the person has a home
    if (_loc.GroupLocationTypeValue.Value === "Home") {
      home = true;
    }
  }

  // location is already on file for this person :tada:
  if (exists) {
    return;
  }

  // add Guid and IsActive to the location
  Location = (0, _extends3["default"])({
    Guid: (0, _guid.makeNewGuid)(),
    IsActive: true
  }, Location);

  var LocationId = _rock.api.post.sync("Locations", Location);

  if (!LocationId || LocationId.statusText) {
    console.error("@@LOCATION_UPDATE_ERROR", Location);
    return;
  }

  // if a person has no home, make this locaiton their home
  if (!home) {

    var GroupLocation = {
      GroupId: GroupId,
      LocationId: LocationId,
      GroupLocationTypeValueId: HomeId,
      IsMailingLocation: true,
      Guid: (0, _guid.makeNewGuid)()
    };

    var result = _rock.api.post.sync("GroupLocations", GroupLocation);

    return;
  }

  // create the location as a custom `Billing Address`
  if (BillingAddressId) {

    var _GroupLocation = {
      GroupId: GroupId,
      LocationId: LocationId,
      GroupLocationTypeValueId: BillingAddressId,
      IsMailingLocation: true,
      Guid: (0, _guid.makeNewGuid)()
    };

    var _result = _rock.api.post.sync("GroupLocations", _GroupLocation);
    return;
  }
}