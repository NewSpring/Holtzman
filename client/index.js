/* global Raven */
import { Meteor } from "meteor/meteor";
import run from "/imports/router/client";
import { routes, client } from "/imports";

if (Meteor.settings.public.sentry && typeof Raven !== "undefined") {
  Raven.config(Meteor.settings.public.sentry, {
    release: Meteor.settings.public.release,
  }).install();
}

run(routes, client);
