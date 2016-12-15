// @flow
import { Meteor } from "meteor/meteor";
import Campaign from "./campaign";
import EditSavedPayment from "./saved-payments/";
import EditSchedule from "./schedules/Edit";
import History from "./history";
import HistoryDetail from "./history/Details";
import Home from "./home";
import Now from "./now";
import Review from "./review";
import Schedules from "./schedules";
import ScheduleDetails from "./schedules/Details";
import TransferSchedules from "./schedules/Recover";
import Layout from "./Layout";

const authorized = Meteor.userId();

const defaultRoute = () => {
  if (authorized) {
    return "/give/home";
  }

  return "/give/now";
};

const Routes = [
  { path: "give/saved-payments/edit/:id", component: EditSavedPayment.EditSavedPayment },
  { path: "give/schedules/edit/:id", component: EditSchedule.EditSchedule },
  { path: "give/schedules/transfer", component: TransferSchedules.Template },
  { path: "give/schedules/:id", component: ScheduleDetails.Details },
  { path: "give/campaign/:name", component: Campaign.Template },
  { path: "give/history/:id", component: HistoryDetail.Details },
  {
    path: "give",
    component: Layout,
    indexRoute: { onEnter: (nextState: Object, replace: Function) => replace(defaultRoute()) },
    childRoutes: [
      ...History.Routes,
      ...Home.Routes,
      ...Now.Routes,
      ...Review.Routes,
      ...Schedules.Routes,
    ],
  },
];

export default Routes;
