

import { Global, Authorized } from "../core/blocks"
import { Home, Routes } from "./pages"


const Root = ({ children }) => (
  <Authorized>
    {children}
  </Authorized>
)

export default {
  path: "profile",
  // onEnter: (_, replaceState) => {
  //   if (!Meteor.isCordova) {
  //     if (_.location.pathname === "/profile" || _.location.pathname === "/profile/") {
  //       replaceState(null, "/profile/settings")
  //     }
  //   }
  // },
  component: Root,
  indexRoute: { component: Home },
  childRoutes: Routes
}

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
