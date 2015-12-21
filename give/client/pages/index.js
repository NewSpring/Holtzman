
import Home from "./home"
import Campaign from "./campaign"

Meteor.subscribe("accounts")

const Routes = [].concat(
  Campaign.Routes
)

export default {
  Home,
  Campaign,

  // combined export of app routes
  Routes

}
