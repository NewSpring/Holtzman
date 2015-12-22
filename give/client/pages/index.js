
import Home from "./home"
import Campaign from "./campaign"
import History from "./history"

Meteor.subscribe("accounts")

const Routes = [].concat(
  Campaign.Routes,
  History.Routes
)

export default {
  Home,
  Campaign,
  History,
  
  // combined export of app routes
  Routes

}
