// @flow
import Campaign from "./campaign";
import History from "./history";
import Home from "./home";
import Now from "./now";
import Review from "./review";
import Schedules from "./schedules";
import Layout from "./Layout";

const Routes = [
  {
    path: "give",
    component: Layout,
    indexRoute: { onEnter: (nextState: Object, replace: Function) => replace("/give/home") },
    childRoutes: [
      ...History.Routes,
      ...Home.Routes,
      ...Now.Routes,
      ...Review.Routes,
      ...Schedules.Routes,
    ],
  },
  { path: "give/campaign/:name", component: Campaign.Template },
];

export default Routes;
