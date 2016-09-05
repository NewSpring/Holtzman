
import { Home, Routes } from "./pages"
import "./store"

export default {
  path: "give",
  onEnter: (_, replaceState) => {
    // @TODO turn offf once all of newspring.cc is moved over
    if (_.location.pathname === "/give") {
      let link = `${_.location.pathname}${_.location.search}${_.location.hash}`

      if (Meteor.isCordova) {
        window.open(`//newspring.cc${link}`)
        return
      }

      if (Meteor.isClient) {
        // stay at current route while we wait on the browser
        let current = [..._.location.previous].pop()

        if (current) {
          replaceState(null, current, _.location.search)
        }


        // leave when the browser will let you
        window.location = `https://newspring.cc${link}`
        return
      }

      replaceState(null, `//newspring.cc${link}`)
    }
  },
  indexRoute: { component: Home },
  childRoutes: Routes
}
