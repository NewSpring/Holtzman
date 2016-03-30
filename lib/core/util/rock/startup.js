"use strict";

exports.__esModule = true;
exports["default"] = startup;

var _guid = require("../guid");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function startup(api) {

  if (Meteor.isServer) {
    if (process.env.NODE_ENV === "production" && __meteor_runtime_config__.ROOT_URL.match("localhost") === null) {
      var _meteor_runtime_conf = __meteor_runtime_config__;
      var ROOT_URL = _meteor_runtime_conf.ROOT_URL;

      var current = api.get.sync("DefinedValues?$filter=Value eq '" + ROOT_URL + "' and DefinedTypeId eq 12");

      if (!current.length) {
        var DefinedValue = {
          IsSystem: true,
          Order: 0,
          DefinedTypeId: 12,
          Value: ROOT_URL,
          Description: "Application at " + ROOT_URL,
          Guid: (0, _guid.makeNewGuid)()
        };
        current = api.post.sync("DefinedValues", DefinedValue);
        current = [{
          Id: current
        }];
      }

      api._.rockId = current[0].Id;

      var site = api.get.sync("Sites?$filter=Name eq '" + ROOT_URL + "'");

      if (!site.length) {
        var Site = {
          IsSystem: false,
          Name: ROOT_URL,
          Description: "Application at " + ROOT_URL,
          Theme: "Rock",
          AllowIndexing: false,
          Guid: (0, _guid.makeNewGuid)()
        };

        site = api.post.sync("Sites", Site);
        site = [{
          Id: site
        }];
      }

      api._.siteId = site[0].Id;
    }

    // GIVE

    api._.give || (api._.give = {});

    // Gateways
    var NMI = api.get.sync("FinancialGateways?$filter=substringof('NMI', EntityType/Name) eq true&$expand=EntityType");

    if (!NMI.statusText && NMI.length) {
      // Meteor.settings.nmi = NMI
      var Id = NMI[0].Id;

      NMI = api.get.sync("AttributeValues?$filter=EntityId eq " + Id + " and Attribute/Key eq 'SecurityKey'&$expand=Attribute&$select=Value,Id");
      if (!NMI.statusText && NMI.length) {
        Meteor.settings.nmi = NMI[0].Value;
        api._.give.gateway = {
          id: Id,
          api: NMI[0].Value
        };
      }
    }

    /*
       Defined Values (move to GQL)
     */
    var frequencies = api.get.sync("DefinedValues?$filter=DefinedTypeId eq 23&$select=Value,Description,Id");
    api._.give.frequencies = frequencies;

    var paymentTypes = api.get.sync("DefinedValues?$filter=DefinedTypeId eq 10 or DefinedTypeId eq 11&$select=Value,Description,Id");
    api._.give.paymentTypes = paymentTypes;

    if (typeof serverWatch != "undefined") {
      // If Rock is being watched (aka old states), remove watching
      if (serverWatch.getKeys().indexOf("ROCK") != -1) {
        serverWatch.stopWatching("ROCK");
      }

      // Start watching again
      serverWatch.watch("ROCK", api._.baseURL, 30 * 1000);
    }
  }
}
module.exports = exports['default'];