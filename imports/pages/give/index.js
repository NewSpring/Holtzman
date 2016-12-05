// @flow
import Campaign from "./campaign";
import History from "./history";
import Home from "./home";
import Now from "./now";
import Review from "./review";
import Schedules from "./schedules";
import Layout from "./Layout";

export default {
  path: "give",
  component: Layout,
  indexRoute: { onEnter: (nextState: Object, replace: Function) => replace("/give/home") },
  childRoutes: [
    ...Campaign.Routes,
    ...History.Routes,
    ...Home.Routes,
    ...Now.Routes,
    ...Review.Routes,
    ...Schedules.Routes,
  ],
};
