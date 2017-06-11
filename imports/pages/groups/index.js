const Routes = [
  {
    path: "groups/finder",
    getComponents(nextState, cb) {
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
