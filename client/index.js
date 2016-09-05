import { Meteor } from "meteor/meteor";

if (Meteor.settings.public.sentry && typeof Raven != "undefined") {
  Raven.config(Meteor.settings.public.sentry, {
    release: Meteor.settings.public.release,
  }).install()
}

import { GraphQL } from "/imports/graphql";
import { run } from "/imports/router/client";
// import { routes, client } from "/imports"
//
// run(routes, client);
