
import { types } from "../../actions/give"

const savedAccount = (state, action) => {

  if (typeof action.savedAccount != "number" || action.savedAccount != null) {
    return state
  }

  return {...state, ...{
    savedAccount: action.savedAccount
  }}
}

export default {
  savedAccount
}
