
import { addReducer, addMiddleware } from "../utilities"

import actions from "./actions"
import reducer from "./reducer"
import "./saga"

addReducer({
  accounts: reducer
})

export default actions
