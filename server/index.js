if (process.env.WEB && process.env.NODE_ENV === "production") {
  // cdn party
  if (Meteor.settings.cdnPrefix && __meteor_runtime_config__.ROOT_URL.match("localhost") === null) {
    Meteor.startup(() => {
      WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix);
    });
  }

  // load the application
  import { run } from "/imports/router/server";
  import { routes, client, server } from "/imports";

  run(routes, client, server);
}
