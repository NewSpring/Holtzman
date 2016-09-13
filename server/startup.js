import "/imports/util/regex";

// publications
import "/imports/database/publications/likes";
import "/imports/database/publications/user";

// methods
import "/imports/methods/accounts/server";
import "/imports/methods/communication/server";
import "/imports/methods/files/server";
import "/imports/methods/give/server";
import "/imports/methods/groups/server";
import "/imports/methods/paymentAccounts/server";
// import "/imports/methods/routing/server";
import "/imports/methods/topics/server";
import "/imports/methods/scripture/server";


import Give from "/imports/database/observers";
import { api } from "/imports/util/rock";

// add support for Promise since meteor ships with node 10.41
fetch.Promise = Promise;

// register env variables to rock api
api.registerEndpoint(Meteor.settings.rock);

// setup collection observations
Give();
