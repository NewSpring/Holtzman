/* global __meteor_runtime_config__ serverWatch */
/* eslint-disable no-param-reassign */

import makeNewGuid from "../guid";

export default function startup(api) {
  if (Meteor.isServer) {
    if (
      process.env.NODE_ENV === "production" &&
      __meteor_runtime_config__.ROOT_URL.match("localhost") === null
    ) {
      // eslint-disable-next-line camelcase
      const { ROOT_URL } = __meteor_runtime_config__;
      let current = api.get.sync(
        `DefinedValues?$filter=Value eq '${ROOT_URL}' and DefinedTypeId eq 12`
      );

      if (!current.length) {
        const DefinedValue = {
          IsSystem: true,
          Order: 0,
          DefinedTypeId: 12,
          Value: ROOT_URL,
          Description: `Application at ${ROOT_URL}`,
          Guid: makeNewGuid(),
        };
        current = api.post.sync("DefinedValues", DefinedValue);
        current = [{
          Id: current,
        }];
      }

      api._.rockId = current[0].Id;

      let site = api.get.sync(`Sites?$filter=Name eq '${ROOT_URL}'`);

      if (!site.length) {
        const Site = {
          IsSystem: false,
          Name: ROOT_URL,
          Description: `Application at ${ROOT_URL}`,
          Theme: "Rock",
          AllowIndexing: false,
          Guid: makeNewGuid(),
        };

        site = api.post.sync("Sites", Site);
        site = [{
          Id: site,
        }];
      }

      api._.siteId = site[0].Id;
    }


    // GIVE

    if (!api._.give) {
      api._.give = {};
    }

    // Gateways
    let NMI = api.get.sync(
      "FinancialGateways?$filter=substringof('NMI', EntityType/Name) eq true&$expand=EntityType"
    );

    if (!NMI.statusText && NMI.length) {
      // Meteor.settings.nmi = NMI
      const { Id } = NMI[0];
      NMI = api.get.sync(
        `AttributeValues?$filter=EntityId eq ${Id} ` +
        "and Attribute/Key eq 'SecurityKey'&$expand=Attribute&$select=Value,Id"
      );
      if (!NMI.statusText && NMI.length) {
        Meteor.settings.nmi = NMI[0].Value;
        api._.give.gateway = {
          id: Id,
          api: NMI[0].Value,
        };
      }
    }

    /*

      Defined Values (move to GQL)

    */
    const frequencies = api.get.sync(
      "DefinedValues?$filter=DefinedTypeId eq 23&$select=Value,Description,Id"
    );
    api._.give.frequencies = frequencies;

    const paymentTypes = api.get.sync(
      "DefinedValues?$filter=DefinedTypeId eq 10 " +
      "or DefinedTypeId eq 11&$select=Value,Description,Id"
    );
    api._.give.paymentTypes = paymentTypes;

    if (typeof serverWatch !== "undefined") {
      // If Rock is being watched (aka old states), remove watching
      if (serverWatch.getKeys().indexOf("ROCK") > -1) {
        serverWatch.stopWatching("ROCK");
      }

      // Start watching again
      serverWatch.watch("ROCK", api._.baseURL, 30 * 1000);
    }
  }
}
