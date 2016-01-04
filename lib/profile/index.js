"use strict";

exports.__esModule = true;

var _coreLibStore = require("../core/lib/store");

var _coreClientLayoutsGlobal = require("../core/client/layouts/global");

var _clientPages = require("./client/pages");

exports["default"] = _coreLibStore.storeRoutes({
  path: "profile",
  component: _coreClientLayoutsGlobal.Auth,
  indexRoute: { component: _clientPages.Home },
  childRoutes: _clientPages.Routes
});

// export default storeRoutes({
//   path: "profile",
//   getComponent(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require("./../core/client/layouts/global/auth"))
//       }, "profile");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("profile");
//       cb(null, require("./../core/client/layouts/global/auth"));
//     }
//   },
//
//   getIndexRoute(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, {
//           component: require("./client/pages/home")
//         })
//       }, "profile");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("profile");
//       cb(null, {
//         component: require("./client/pages/home")
//       });
//     }
//   },
//
//   getChildRoutes(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require("./client/routes"))
//       }, "profile");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("profile");
//       cb(null, require("./client/routes"));
//     }
//   }
// })
module.exports = exports["default"];