/*


  Live action types

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
  show: () => ({ type: "LIVE.SHOW" }),
  hide: () => ({ type: "LIVE.HIDE" }),
  float: () => ({ type: "LIVE.FLOAT" }),
  unfloat: () => ({ type: "LIVE.UNFLOAT" }),
}
