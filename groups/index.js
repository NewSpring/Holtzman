

// import { Routes } from "./pages"

// export default {
//   path: "groups",
//   component: Global,
//   // indexRoute: { component: Home },
//   childRoutes: Routes,
//   onEnter: (_, replaceState) => {
//     console.log(_)
//   }
// }

import "./store"

export default {
  path: "groups",
  getComponent(location, cb) {
    if (Meteor.isClient) {
      // Split the code on a different file when on a client
      require.ensure([], require => {
        cb(null, require("./../core/blocks/global"))
      }, "groups");
    } else {
      // Save the chunk for server-rendering
      global.__CHUNK_COLLECTOR__.push("groups");
      cb(null, require("./../core/blocks/global"));
    }
  },

  // getIndexRoute(location, cb) {
  //   if (Meteor.isClient) {
  //     // Split the code on a different file when on a client
  //     require.ensure([], require => {
  //       cb(null, {
  //         component: require("./client/pages/home")
  //       })
  //     }, "profile");
  //   } else {
  //     // Save the chunk for server-rendering
  //     global.__CHUNK_COLLECTOR__.push("profile");
  //     cb(null, {
  //       component: require("./client/pages/home")
  //     });
  //   }
  // },

  getChildRoutes(location, cb) {
    if (Meteor.isClient) {
      // Split the code on a different file when on a client
      require.ensure([], require => {
        cb(null, require("./routes"))
      }, "groups");
    } else {
      // Save the chunk for server-rendering
      global.__CHUNK_COLLECTOR__.push("groups");
      cb(null, require("./routes"));
    }
  }
}
