

import Now from "./now"
import Campaign from "./campaign"
import History from "./history"
import Schedules from "./schedules"

const Routes = [].concat(
  Now.Routes,
  Campaign.Routes,
  History.Routes,
  Schedules.Routes
)


export default {
  Now,
  Campaign,
  History,
  Schedules,

  // combined export of app routes
  Routes

}
