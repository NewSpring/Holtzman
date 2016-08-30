

import Now from "./now";
import Campaign from "./campaign";
import History from "./history";
import Schedules from "./schedules";
import Review from "./review";

const Routes = [].concat(
  Now.Routes,
  Campaign.Routes,
  History.Routes,
  Schedules.Routes,
  Review.Routes
);


export default {
  Now,
  Campaign,
  History,
  Schedules,
  Review,

  // combined export of app routes
  Routes,

};
