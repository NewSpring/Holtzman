
import { storeRoutes } from "../core/lib/store"

import { User } from "../core/client/layouts/global"
import { Home, Routes } from "./client/pages"

export default storeRoutes({
  path: "give",
  component: User,
  indexRoute: { component: Home },
  childRoutes: Routes
})
// export default storeRoutes({
//   path: "give",
//   getComponent(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require("./../core/client/layouts/global/user"))
//       }, "give");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("give");
//       cb(null, require("./../core/client/layouts/global/user"));
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
//       }, "give");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("give");
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
//       }, "give");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("give");
//       cb(null, require("./client/routes"));
//     }
//   }
// })
