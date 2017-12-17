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

  "LIVE.SET": (state, action) => (
    {
      ...state,
      ...{
        live: action.isLive,
        embedCode: action.embedCode,
      },
    }
  ),

  "LIVE.RESET": state => (
    {
      ...state,
      ...{
        live: initial.live,
        embedCode: initial.embedCode,
      },
    }
  ),

  "LIVE.SHOW": state => (
    {
      ...state,
      ...{
        show: true,
      },
    }
  ),

  "LIVE.HIDE": state => (
    {
      ...state,
      ...{
        show: false,
      },
    }
  ),

  "LIVE.FLOAT": state => (
    {
      ...state,
      ...{
        float: true,
      },
    }
  ),

  "LIVE.FLOAT_DOUBLE": state => (
    {
      ...state,
      ...{
        floatDouble: true,
      },
    }
  ),

  "LIVE.UNFLOAT": state => (
    {
      ...state,
      ...{
        float: false,
        floatDouble: false,
      },
    }
  ),

});
