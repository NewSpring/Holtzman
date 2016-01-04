"use strict";

exports.__esModule = true;

var _libApi = require("../../lib/api");

var people = function people() {
  if (_libApi.api._ && _libApi.api._.baseURL && REST2DDP) {

    var getPerson = function getPerson(callback) {

      var user = Meteor.users.findOne(this.userId);

      if (!user || !user.services || !user.services.rock || !user.services.rock.PrimaryAliasId) {
        callback(null, []);
        return;
      }

      var rock = user.services.rock;

      var query = _libApi.api.parseEndpoint("\n        People/" + rock.PersonId + "\n      ");

      _libApi.api.get(query, function (err, person) {
        if (err) {
          callback(err);return;
        }

        var locations = _libApi.api.parseEndpoint("\n          Groups/GetFamilies/" + rock.PersonId + "?\n            $expand=\n              GroupLocations,\n              GroupLocations/Location,\n              GroupLocations/GroupLocationTypeValue,\n              Campus\n            &$select=\n              Campus/Name,\n              Campus/ShortCode,\n              Campus/Id,\n              GroupLocations/Location/Street1,\n              GroupLocations/Location/Street2,\n              GroupLocations/Location/City,\n              GroupLocations/Location/State,\n              GroupLocations/Location/Country,\n              GroupLocations/Location/PostalCode,\n              GroupLocations/Location/Id,\n              GroupLocations/GroupLocationTypeValue/Value\n        ");

        _libApi.api.get(locations, function (err, personLocations) {

          if (err) {
            callback(err);return;
          }

          var personLocation = personLocations[0];
          var groups = personLocation.GroupLocations.filter(function (x) {
            return x.GroupLocationTypeValue.Value === "Home";
          });

          var home = groups[0];
          home || (home = {});
          home = home.Location;
          person.Home = home;
          person.Campus = personLocation.Campus;

          var keysToKeep = ["Age", "BirthDay", "BirthMonth", "BirthYear", "Campus", "Email", "FirstName", "Home", "LastName", "NickName", "PhoneNumbers", "PhotoUrl"];

          for (var key in person) {
            if (keysToKeep.indexOf(key) === -1) {
              delete person[key];
            }
          }

          callback(null, [person]);
        });
      });
    };

    return REST2DDP.publish("people", {
      collectionName: "people",
      method: getPerson,
      jsonPath: "*",
      pollInterval: 10000
    });
  }
};

exports["default"] = people;
module.exports = exports["default"];