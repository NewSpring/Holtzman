
// Do server-rendering only in proudction mode
// if (process.env.NODE_ENV === "production") {
//
//   // load the application
//   const run = require("apollos/lib/core/router/server").run;
//   const lib = require("/imports/lib");
//   const { routes, client, server } = lib;
//
//   run(routes, client, server);
//
//   // cdn party
//   // cdn is still not reliable enough :(
//   if (Meteor.settings.cdnPrefix && __meteor_runtime_config__.ROOT_URL.match("localhost") === null) {
//     Meteor.startup(() => {
//       WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix);
//     })
//   }
// }
