import 'app/server'
import './seeds'

// Do server-rendering only in production mode or the CI
if (process.env.NODE_ENV === "production" || process.env.CI) {
  // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(WebpackStats);

  // require("../client/routes");

  // cdn party
  if (Meteor.settings.cdnPrefix && __meteor_runtime_config__.ROOT_URL.match("localhost") === null) {
    Meteor.startup(() => {
      WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix);
    })
  }
}
