// @flow
import Campaign from "./campaign";
import History from "./history";
import Now from "./now";
import Review from "./review";
import Schedules from "./schedules";
import Layout from "./Layout";

export default {
  path: "give",
  component: Layout,
  childRoutes: [
    ...Campaign.Routes,
    ...History.Routes,
    ...Now.Routes,
    ...Review.Routes,
    ...Schedules.Routes,
  ],
};
