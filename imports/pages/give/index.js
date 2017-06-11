// @flow
// import Campaign from "./campaign";
// import EditSavedPayment from "./saved-payments/";
// import EditSchedule from "./schedules/Edit";
// import History from "./history";
// import HistoryDetail from "./history/Details";
// import Home from "./home";
import Now from "./now";
// import Review from "./review";
// import Schedules from "./schedules";
// import ScheduleDetails from "./schedules/Details";
// import TransferSchedules from "./schedules/Recover";
import Layout from "./Layout";
import { flatten } from "ramda";

const Routes = [
  {
    path: "give/saved-payments/edit/:id",
    getComponents(nextState, cb) {
      import("./saved-payments/")
        .then((x) => {
          cb(null, x.default.EditSavedPayment);
          // preload home
          import("./home");
        })
        .catch(console.error);
    },
  },
  {
    path: "give/schedules/edit/:id",
    getComponents(nextState, cb) {
      import("./schedules/Edit")
        .then((x) => {
          cb(null, x.default.EditSchedule);
          // preload schedules
          import("./schedules");
        })
        .catch(console.error);
    },
  },
  {
    path: "give/schedules/transfer",
    getComponents(nextState, cb) {
      import("./schedules/Recover")
        .then((x) => {
          cb(null, x.default.Template);
          // preload schedules
          import("./schedules");
        })
        .catch(console.error);
    },
  },
  {
    path: "give/schedules/:id",
    getComponents(nextState, cb) {
      import("./schedules/Details")
        .then((x) => {
          cb(null, x.default.Details);
        })
        .catch(console.error);
    },
  },
  {
    path: "give/campaign/:name",
    getComponents(nextState, cb) {
      import("./campaign")
        .then((x) => {
          cb(null, x.default.Template);
        })
        .catch(console.error);
    },
  },
  {
    path: "give/history/:id",
    getComponents(nextState, cb) {
      import("./history/Details")
        .then((x) => {
          cb(null, x.default.Details);
          // preload history
          import("./history");
        })
        .catch(console.error);
    },
  },
  {
    path: "give",
    component: Layout,
    indexRoute: { onEnter: (nextState: Object, replace: Function) => replace("/give/home") },
    getChildRoutes(partialNextState, cb) {
      Promise.all([
        import("./history"),
        import("./home"),
        // now is critical enough to not async load
        Promise.resolve({ default: Now }),
        import("./review"),
        import("./schedules"),
      ])
        .then((x) => x.map((y) => y.default.Routes))
        .then(flatten)
        .then((routes) => cb(null, routes))
        .catch(console.error);
    },
  },
];

export default Routes;
