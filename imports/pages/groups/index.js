const Routes = [
  {
    path: "groups/finder",
    getComponents(nextState, cb) {
      // $FlowMeteor
      import("./finder/index")
        .then((x) => {
          cb(null, x.default);
        })
        .catch(console.error);
    },
  },
  {
    path: "groups/:id",
    getComponents(nextState, cb) {
      // $FlowMeteor
      import("./profile/index")
        .then((x) => {
          cb(null, x.default);
        })
        .catch(console.error);
    },
  },
];

export default {
  Routes,
};
