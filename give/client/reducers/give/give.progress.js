
import { types } from "../../actions/give"


const progress = (state, action) => {

  return {...state, ...{
    step: action.step
  }}
}

const step = (state, action) => {

  if (typeof action.increment != "number") {
    return state
  }

  return {...state, ...{
    step: state.step + action.increment
  }}
}

export default {
  progress,
  step
}
