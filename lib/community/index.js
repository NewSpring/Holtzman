"use strict";

exports.__esModule = true;

var _global = require("../core/blocks/global");

var _global2 = _interopRequireDefault(_global);

var _pages = require("./pages");

require("./store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  path: "groups",
  // indexRoute: { component: Home },
  childRoutes: _pages.Routes
};

// export default {
//   path: "group",
//   getComponent(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require("./../core/blocks/global"))
//       }, "group");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("group");
//       cb(null, require("./../core/blocks/global"));
//     }
//   },
//
//   // getIndexRoute(location, cb) {
//   //   if (Meteor.isClient) {
//   //     // Split the code on a different file when on a client
//   //     require.ensure([], require => {
//   //       cb(null, {
//   //         component: require("./client/pages/home")
//   //       })
//   //     }, "profile");
//   //   } else {
//   //     // Save the chunk for server-rendering
//   //     global.__CHUNK_COLLECTOR__.push("profile");
//   //     cb(null, {
//   //       component: require("./client/pages/home")
//   //     });
//   //   }
//   // },
//
//   getChildRoutes(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require("./routes"))
//       }, "group");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("group");
//       cb(null, require("./routes"));
//     }
//   }
// }

module.exports = exports['default'];