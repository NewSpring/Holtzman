import "apollos/core"
import "apollos/give/methods"
import Give from "apollos/give/observers"
import { api } from "apollos/core/util/rock"

// add support for Promise since meteor ships with node 10.41
fetch.Promise = Promise

// register env variables to rock api
api.registerEndpoint(Meteor.settings.rock)

// setup collection observations
Give()

if (Meteor.isServer) {
  require("./methods")
}
