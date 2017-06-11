import scriptLoader from "react-async-script-loader";

import Template from "./Layout";

// XXX This is not a great long term solution, but it works for this iteration.
// We shouldn't have to import the ooyala scripts twice.
const scripts = [
  "//player.ooyala.com/static/v4/stable/4.6.9/core.min.js",
  "//player.ooyala.com/static/v4/stable/4.6.9/video-plugin/main_html5.min.js",
  "//player.ooyala.com/static/v4/stable/4.6.9/skin-plugin/html5-skin.js",
];

const Routes = [
  {
    path: "annualreport/message-from-shane",
    // component: ShaneTemplate.Template,
    getComponents(nextState, cb) {
      // $FlowMeteor
      import("./message-from-shane")
        .then((x) => {
          console.log(x);
          cb(null, x.default.Template);
        })
        .catch(console.error);
    },
  },
  {
    path: "annualreport",
    component: scriptLoader(...scripts)(Template),
    indexRoute: { onEnter: (nextState: Object, replace: Function) => replace("/annualreport/finances") },
    // childRoutes: [
    //   ...FinancesPage.Routes,
    //   ...NextStepsPage.Routes,
    //   ...MinistriesPage.Routes,
    // ],
    getChildRoutes(partialNextState, cb) {
      Promise.all([
        // $FlowMeteor
        import("./finances"),
        // $FlowMeteor
        import("./next-steps"),
        // $FlowMeteor
        import("./ministries"),
      ])
        .then((x) => x.map((y) => y.default.Routes))
        .then((routes) => cb(null, routes))
        .catch(console.error);
    },
  },
  {
    path: "celebrate",
    indexRoute: { onEnter: (nextState: Object, replace: Function) => replace("/annualreport") },
  },
  {
    path: "annual-report",
    indexRoute: { onEnter: (nextState: Object, replace: Function) => replace("/annualreport") },
  },
];

export default {
  Template,
  Routes,
};
