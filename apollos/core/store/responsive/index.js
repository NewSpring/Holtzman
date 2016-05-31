import reducer from "./reducer"
import middleware from "./middleware"
import { addReducer } from "../utilities"
import actions from "./actions"

addReducer({
  responsive: reducer
})

export default {
  reducer,
  actions,
}
