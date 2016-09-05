/*

  Live store

*/

import { createReducer } from "../utilities"

const initial = {
  live: false,
  embedCode: null,
  show: true,
  float: false,
}

export default createReducer(initial, {

  ["LIVE.SET"](state, action) {
    return {...state, ...{
      live: action.isLive,
      embedCode: action.embedCode,
    } };
  },

  ["LIVE.RESET"](state, action) {
    return {...state, ...{
      live: initial.live,
      embedCode: initial.embedCode,
    } };
  },

  ["LIVE.SHOW"](state, action) {
    return {...state, ...{
      show: true,
    } };
  },

  ["LIVE.HIDE"](state, action) {
    return {...state, ...{
      show: false,
    } };
  },

  ["LIVE.FLOAT"](state, action) {
    return {...state, ...{
      float: true,
    } };
  },

  ["LIVE.UNFLOAT"](state, action) {
    return {...state, ...{
      float: false,
    } };
  },

});
