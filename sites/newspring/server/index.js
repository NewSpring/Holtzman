
import React from "react";

if (process.env.NODE_ENV === "proudction") console.log("PROD");

if (process.env.WEB) {

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
