
import { storeRoutes } from "../core/lib/store"

export default storeRoutes({
  path: "give",
  getComponent(location, cb) {
    if (Meteor.isClient) {
      // Split the code on a different file when on a client
      require.ensure([], require => {
        cb(null, require("./client/layouts/global"))
      }, "give");
    } else {
      // Save the chunk for server-rendering
      global.__CHUNK_COLLECTOR__.push("give");
      cb(null, require("./client/layouts/global"));
    }
  },

  getIndexRoute(location, cb) {
    if (Meteor.isClient) {
      // Split the code on a different file when on a client
      require.ensure([], require => {
        cb(null, {
          component: require("./client/pages/home")
        })
      }, "give");
    } else {
      // Save the chunk for server-rendering
      global.__CHUNK_COLLECTOR__.push("give");
      cb(null, {
        component: require("./client/pages/home")
      });
    }
  },

  getChildRoutes(location, cb) {
    if (Meteor.isClient) {
      // Split the code on a different file when on a client
      require.ensure([], require => {
        cb(null, require("./client/routes"))
      }, "give");
    } else {
      // Save the chunk for server-rendering
      global.__CHUNK_COLLECTOR__.push("give");
      cb(null, require("./client/routes"));
    }
  }
})
