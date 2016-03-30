"use strict";

exports.__esModule = true;

var _blocks = require("../core/blocks");

var _pages = require("./pages");

require("./store");

exports["default"] = {
  path: "give",
  onEnter: function onEnter(_, replaceState) {
    // @TODO turn offf once all of newspring.cc is moved over
    if (_.location.pathname === "/give") {
      var link = "" + _.location.pathname + _.location.search + _.location.hash;

      if (Meteor.isCordova) {
        window.open("//newspring.cc" + link);
        return;
      }

      if (Meteor.isClient) {
        // stay at current route while we wait on the browser
        var current = [].concat(_.location.previous).pop();

        if (current) {
          replaceState(null, current, _.location.search);
        }

        // leave when the browser will let you
        window.location = "https://newspring.cc" + link;
        return;
      }

      replaceState(null, "//newspring.cc" + link);
    }
  },
  indexRoute: { component: _pages.Home },
  childRoutes: _pages.Routes
};

// import "./store"
//
// export default {
//   path: "give",
//   onEnter: (_, replaceState) => {
//     // @TODO turn offf once all of newspring.cc is moved over
//     if (_.location.pathname === "/give") {
//       let link = `${_.location.pathname}${_.location.search}${_.location.hash}`
//
//       if (Meteor.isCordova) {
//         window.open(`//newspring.cc${link}`)
//         return
//       }
//
//       if (Meteor.isClient) {
//         // stay at current route while we wait on the browser
//         let current = [..._.location.previous].pop()
//
//         if (current) {
//           replaceState(null, current, _.location.search)
//         }
//
//
//         // leave when the browser will let you
//         window.location = `https://newspring.cc${link}`
//         return
//       }
//
//       replaceState(null, `//newspring.cc${link}`)
//     }
//   },
//   getComponent(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require("./../core/blocks/global"))
//       }, "give");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("give");
//       cb(null, require("./../core/blocks/global"));
//     }
//   },
//
//   // getIndexRoute(location, cb) {
//   //   if (Meteor.isClient) {
//   //     // Split the code on a different file when on a client
//   //     require.ensure([], require => {
//   //       cb(null, {
//   //         component: require("./pages/home")
//   //       })
//   //     }, "profile");
//   //   } else {
//   //     // Save the chunk for server-rendering
//   //     global.__CHUNK_COLLECTOR__.push("profile");
//   //     cb(null, {
//   //       component: require("./pages/home")
//   //     });
//   //   }
//   // },
//
//   getChildRoutes(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require("./routes"))
//       }, "give");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("give");
//       cb(null, require("./routes"));
//     }
//   }
// }

module.exports = exports['default'];