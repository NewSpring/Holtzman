if (process.env.WEB) {
  // cdn party
  if (
    Meteor.settings.cdnPrefix &&
    __meteor_runtime_config__.ROOT_URL.match("localhost") === null
  ) {
    Meteor.startup(() => {
      WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix);
    });
  }

  // load the application
  import run from "../imports/util/router/server";
  import { routes, client, server } from "../imports";

  run(routes, client, server);
}
