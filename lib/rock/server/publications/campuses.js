"use strict";

exports.__esModule = true;

var _libApi = require("../../lib/api");

var campuses = function campuses() {
  if (_libApi.api._ && _libApi.api._.baseURL && REST2DDP) {

    var getCampuses = function getCampuses(callback) {
      var query = _libApi.api.parseEndpoint("\n        Campuses?\n          $select=\n            Name,\n            ShortCode,\n            Id,\n            LocationId\n      ");

      _libApi.api.get(query, function (err, locations) {
        if (err) {
          callback(err);return;
        }

        callback(null, locations);
      });
    };

    return REST2DDP.publish("campuses", {
      collectionName: "campuses",
      method: getCampuses,
      jsonPath: "*",
      pollInterval: 86400000
    });
  }
};

exports["default"] = campuses;
module.exports = exports["default"];