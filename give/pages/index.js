
import Home from "./home"
import Campaign from "./campaign"
import History from "./history"
import Schedules from "./schedules"

import { Accounts } from "../collections"
import { api, endpoints } from "../../core/util/rock"

/*global Meteor*/
if (Meteor.isClient) {
  Meteor.subscribe("accounts")
}

const Routes = [].concat(
  Campaign.Routes,
  History.Routes,
  Schedules.Routes
)


// api.get(endpoints.accounts, (err, accounts) => {
//   console.log(accounts)
// })

Routes.push({
  path: "/$*",
  onEnter: (location, replaceState, callback) => {

    let url = location.params.splat
      .replace(/\s+/g, "")
      .toLowerCase()

    let [fund, amount] = url.split("/")

    let compare = (accounts) => {
      for (let account of accounts) {
        let smallname = account.Name
          .replace(/\s+/g, "")
          .toLowerCase()

        let dest = `/give/campaign/${account.Name}`

        if (amount) {
          dest += `?${account.Name}=${amount}`
        }

        if (smallname === fund) {
          replaceState(null, dest)
          callback()
        }
      }
    }

    if (Meteor.isClient) {
      Tracker.autorun((computation) => {
        let accounts = Accounts.find().fetch()
        if (accounts.length) {
          compare(accounts)
          computation.stop()
        }
      })
    }

    if (Meteor.isServer) {
      let accounts = api.get.sync(endpoints.accounts)
      compare(accounts)
    }

  }
})

export default {
  Home,
  Campaign,
  History,
  Schedules,

  // combined export of app routes
  Routes

}
