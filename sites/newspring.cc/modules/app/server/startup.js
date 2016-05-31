import "../../../../../apollos"
import "../../../../../apollos/give/methods"
import "../../../../../apollos/community/methods/join"
import Give from "../../../../../apollos/give/observers"
import { api } from "../../../../../apollos/core/util/rock"

// add support for Promise since meteor ships with node 10.41
fetch.Promise = Promise

// register env variables to rock api
api.registerEndpoint(Meteor.settings.rock)

// setup collection observations
Give()


if (Meteor.settings.raygun && typeof Raygun != "undefined") {
  Meteor.startup(function () {
    Raygun.init({
      key: Meteor.settings.raygun,
      console: true
    });
  });
}
