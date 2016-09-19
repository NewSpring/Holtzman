/*

  Live store

*/

import { createReducer } from "../utilities";

const initial = {
  live: false,
  embedCode: null,
  show: true,
  float: false,
};

export default createReducer(initial, {

  ["LIVE.SET"]: function (state, action) {
    return { ...state, ...{
      live: action.isLive,
      embedCode: action.embedCode,
    } };
  },

  ["LIVE.RESET"]: function (state, action) {
    return { ...state, ...{
      live: initial.live,
      embedCode: initial.embedCode,
    } };
  },

  ["LIVE.SHOW"]: function (state, action) {
    return { ...state, ...{
      show: true,
    } };
  },

  ["LIVE.HIDE"]: function (state, action) {
    return { ...state, ...{
      show: false,
    } };
  },

  ["LIVE.FLOAT"]: function (state, action) {
    return { ...state, ...{
      float: true,
    } };
  },

  ["LIVE.UNFLOAT"]: function (state, action) {
    return { ...state, ...{
      float: false,
    } };
  },

});
