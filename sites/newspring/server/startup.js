import "apollos/dist/core/publications";
import "apollos/dist/core/methods";
import "apollos/dist/give/methods";
import Give from "apollos/dist/give/observers";
import { api } from "apollos/dist/core/util/rock";
// import "/imports/server/methods";

// add support for Promise since meteor ships with node 10.41
fetch.Promise = Promise;

// register env variables to rock api
api.registerEndpoint(Meteor.settings.rock);

// setup collection observations
Give();
