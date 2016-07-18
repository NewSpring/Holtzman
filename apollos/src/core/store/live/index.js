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
import reducer from "./reducer"
import { addReducer } from "../utilities"

addReducer({
  live: reducer
})

export default {
  set: ({ isLive, embedCode }) => ({ type: "LIVE.SET", isLive, embedCode }),
  reset: () => ({ type: "LIVE.RESET" }),
  show: () => ({ type: "LIVE.SHOW" }),
  hide: () => ({ type: "LIVE.HIDE" }),
  float: () => ({ type: "LIVE.FLOAT" }),
  unfloat: () => ({ type: "LIVE.UNFLOAT" }),
}
