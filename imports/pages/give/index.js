// @flow
import Campaign from "./campaign";
import History from "./history";
import Now from "./now";
import Review from "./review";
import Schedules from "./schedules";

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
