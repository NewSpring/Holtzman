
import Home from "./home"
import Campaign from "./campaign"
import History from "./history"
import Schedules from "./schedules"

Meteor.subscribe("accounts")

const Routes = [].concat(
  Campaign.Routes,
  History.Routes,
  Schedules.Routes
)

export default {
  Home,
  Campaign,
  History,
  Schedules,

  // combined export of app routes
  Routes

}
