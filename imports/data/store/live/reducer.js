/*

  Live store

*/

import { createReducer } from "../utilities";

const initial = {
  live: false,
  fuse: false,
  show: true,
  float: false,
};

export default createReducer(initial, {
  "LIVE.SET": (state, action) => ({
    ...state,
    ...{
      live: action.isLive,
      fuse: action.isFuse,
    },
  }),

  "LIVE.RESET": state => ({
    ...state,
    ...{
      live: initial.live,
      fuse: initial.fuse,
    },
  }),

  "LIVE.SHOW": state => ({
    ...state,
    ...{
      show: true,
    },
  }),

  "LIVE.HIDE": state => ({
    ...state,
    ...{
      show: false,
    },
  }),

  "LIVE.FLOAT": state => ({
    ...state,
    ...{
      float: true,
    },
  }),

  "LIVE.FLOAT_DOUBLE": state => ({
    ...state,
    ...{
      floatDouble: true,
    },
  }),

  "LIVE.UNFLOAT": state => ({
    ...state,
    ...{
      float: false,
      floatDouble: false,
    },
  }),
});
