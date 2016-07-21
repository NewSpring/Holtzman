
import React from "react";
// Do server-rendering only in proudction mode
if (process.env.WEB && process.env.NODE_ENV === "proudction") {

  // load the application
  import { run } from "apollos/dist/core/router/server";
  import { routes, client, server } from "/imports";

  run(routes, client, server);

  // cdn party
  if (Meteor.settings.cdnPrefix && __meteor_runtime_config__.ROOT_URL.match("localhost") === null) {
    Meteor.startup(() => {
      WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix);
    })
  }
}
