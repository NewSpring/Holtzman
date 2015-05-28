Apollos.api || (Apollos.api = {});

Apollos.api.base = "api/v1";

Apollos.api.allEndpoints = [];

Apollos.api.endpoints = {
    user: {
        url: "users/"
    },
    person: {
        url: "people/"
    }
};

Apollos.api.tokenName = Meteor.settings.api.tokenName;

Apollos.api.token = Meteor.settings.api.token;

if (!Apollos.api.tokenName || !Apollos.api.token) {
    return;
}

Apollos.api.register = function (collections, platform) {
    var base, collection, i, len;
    if (!_.isArray(collections) && collections !== "all") {
        Apollos.debug("You must specify an array of collections to register, or the keyword all to register all endpoints");
        return;
    }
    if (collections === "all") {
        Apollos.api.allEndpoints = _.union(Apollos.api.allEndpoints, [platform]);
        return;
    }
    for (i = 0, len = collections.length; i < len; i++) {
        collection = collections[i];
        if (!Apollos.api.endpoints[collection]) {
            Apollos.debug("no endpoint set for " + collection);
            continue;
        }(base = Apollos.api.endpoints[collection]).platforms || (base.platforms = []);
        Apollos.api.endpoints[collection].platforms = _.union(Apollos.api.endpoints[collection].platforms, [platform]);
    }
};