/*


  Live action types

  LIVE.SET
    set live status and embed code

  LIVE.RESET
    reset live status and embed code

  LIVE.SHOW
    show live bar

  LIVE.HIDE
    hide live bar

  LIVE.FLOAT
    float live bar for special cases

*/
import reducer from "./reducer";
import { addReducer } from "../utilities";

addReducer({
  live: reducer,
});

export default {
  set: ({ isLive, isFuse }) => ({ type: "LIVE.SET", isLive, isFuse }),
  reset: () => ({ type: "LIVE.RESET" }),
  show: () => ({ type: "LIVE.SHOW" }),
  hide: () => ({ type: "LIVE.HIDE" }),
  float: () => ({ type: "LIVE.FLOAT" }),
  floatDouble: () => ({ type: "LIVE.FLOAT_DOUBLE" }),
  unfloat: () => ({ type: "LIVE.UNFLOAT" }),
};
