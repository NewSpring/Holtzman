import "apollos-core/dist/core/publications";
import "apollos-core/dist/core/methods/server";
import "apollos-core/dist/give/methods/server";
import Give from "apollos-core/dist/give/observers";
import { api } from "apollos-core/dist/core/util/rock";
import "/imports/methods";

// add support for Promise since meteor ships with node 10.41
fetch.Promise = Promise;

// register env variables to rock api
api.registerEndpoint(Meteor.settings.rock);

// setup collection observations
Give();
