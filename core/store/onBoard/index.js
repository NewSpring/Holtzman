
import { addReducer, addMiddleware } from "../utilities"

import actions from "./actions"
import reducer from "./reducer"
import "./saga"

addReducer({
  onBoard: reducer
})

export default actions
