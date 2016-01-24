

import Home from "./home"
import Campaign from "./campaign"
import History from "./history"
import Schedules from "./schedules"

import { GraphQL } from "../../core/graphql"

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
        let smallname = account.name
          .replace(/\s+/g, "")
          .toLowerCase()

        let dest = `/give/campaign/${account.name}`

        if (amount) {
          dest += `?${account.name}=${amount}`
        }

        if (smallname === fund) {
          replaceState(null, dest)
          callback()
        }
      }
    }

    GraphQL.query(`
      {
        accounts: allFinancialAccounts(limit: 100, ttl: 8640) {
          description
          name
          id
          summary
          image
          order
        }
      }`).then(({ accounts }) => {
        if (accounts.length) {
          compare(accounts)
        }
      })

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
