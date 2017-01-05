import "../imports/util/regex";

// publications
import "../imports/deprecated/database/publications/likes";
import "../imports/deprecated/database/publications/user";

// methods
import "../imports/deprecated/methods/accounts/server";
import "../imports/deprecated/methods/communication/server";
import "../imports/deprecated/methods/files/server";
import "../imports/deprecated/methods/groups/server";

import "../imports/deprecated/methods/topics/server";
import "../imports/deprecated/methods/scripture/server";

import { api } from "../imports/util/rock";

// add support for Promise since meteor ships with node 10.41
fetch.Promise = Promise;

// register env variables to rock api
api.registerEndpoint(Meteor.settings.rock);
