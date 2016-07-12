/*

  Live store

*/

import { createReducer } from "../utilities"

const initial = {
  show: true,
  float: false,
}

export default createReducer(initial, {

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
