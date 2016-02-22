
// import { Global } from "../core/blocks"
// import { Home, Routes } from "./pages"
//
// export default {
//   path: "give",
//   component: Global,
//   indexRoute: { component: Home },
//   childRoutes: Routes
// }

import "./store"

export default {
  path: "give",
  // getComponent(location, cb) {
  //   if (Meteor.isClient) {
  //     // Split the code on a different file when on a client
  //     require.ensure([], require => {
  //       cb(null, require("./../core/blocks/global"))
  //     }, "give");
  //   } else {
  //     // Save the chunk for server-rendering
  //     global.__CHUNK_COLLECTOR__.push("give");
  //     cb(null, require("./../core/blocks/global"));
  //   }
  // },

  getIndexRoute(location, cb) {
    if (Meteor.isClient) {
      // Split the code on a different file when on a client
      require.ensure([], require => {
        cb(null, {
          component: require("./pages/home")
        })
      }, "profile");
    } else {
      // Save the chunk for server-rendering
      global.__CHUNK_COLLECTOR__.push("profile");
      cb(null, {
        component: require("./pages/home")
      });
    }
  },

  getChildRoutes(location, cb) {
    if (Meteor.isClient) {
      // Split the code on a different file when on a client
      require.ensure([], require => {
        cb(null, require("./routes"))
      }, "give");
    } else {
      // Save the chunk for server-rendering
      global.__CHUNK_COLLECTOR__.push("give");
      cb(null, require("./routes"));
    }
  }
}
