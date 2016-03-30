"use strict";

exports.__esModule = true;

var _blocks = require("../core/blocks");

var _pages = require("./pages");

var Root = function Root(_ref) {
  var children = _ref.children;
  return React.createElement(
    _blocks.Authorized,
    null,
    children
  );
};

exports["default"] = {
  path: "profile",
  onEnter: function onEnter(_, replaceState) {
    if (!Meteor.isCordova) {
      if (_.location.pathname === "/profile" || _.location.pathname === "/profile/") {
        replaceState(null, "/profile/settings");
      }
    }
  },
  component: Root,
  indexRoute: { component: _pages.Home },
  childRoutes: _pages.Routes
};

// export default {
//   path: "profile",
//   getComponent(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, Root)
//       }, "profile");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("profile");
//       cb(null, Root);
//     }
//   },
//
//   getIndexRoute(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, {
//           component: require("./pages/home")
//         })
//       }, "profile");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("profile");
//       cb(null, {
//         component: require("./pages/home")
//       });
//     }
//   },
//
//   getChildRoutes(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require("./routes"))
//       }, "profile");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("profile");
//       cb(null, require("./routes"));
//     }
//   }
// }

module.exports = exports['default'];