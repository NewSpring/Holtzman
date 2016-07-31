import Util from "./util";
import Signup from "./signup";
/*

  In order to coexist with newspring.cc while we migrate to
  Apollos driven sites, we take all unknown traffic and send
  it to newspring.cc as a just in case. This lets us share navigation,
  click links that are relative, and 404.

*/
// const NotFound = [
//   {
//     path: "*",
//     onEnter: function (nextState, replaceState) {
//       let link = `${nextState.location.pathname}${nextState.location.search}${nextState.location.hash}`
//
//       if (Meteor.isCordova) {
//         window.open(`//newspring.cc${link}`)
//         return
//       }
//
//       if (Meteor.isClient) {
//         // stay at current route while we wait on the browser
//         let current = [...nextState.location.previous].pop()
//         if (current) {
//           replaceState(null, current, nextState.location.search)
//         }
//
//         // leave when the browser will let you
//         window.location = `https://newspring.cc${link}`
//         return
//       }
//
//       // replaceState(null, `//newspring.cc${link}`)
//
//     }
//   }
// ]

const Routes = {
  childRoutes: [].concat(
    Util.Routes,
    Signup.Routes,
    // NotFound
  )
}

export {

  // combined export of app routes
  Routes

}
