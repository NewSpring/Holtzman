// XXX with flow this might need to be refactored
import Campaign from "./campaign";
import History from "./history";
import Now from "./now";
import Review from "./review";
import Schedules from "./schedules";

/* eslint-disable */
export default {
  path: "give",
  // indexRoute: { component: Home },
  childRoutes: [
    ...Campaign.Routes,
    ...History.Routes,
    ...Now.Routes,
    ...Review.Routes,
    ...Schedules.Routes,
  ],
};
