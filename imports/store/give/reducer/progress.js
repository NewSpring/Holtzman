
const progress = (state, action) => {

  if (action.increment) {
    if (typeof action.increment != "number") {
      return state
    }

    if (state.step + action.increment <= 0) {
      return state
    }
    
    return { ...state, ...{
      step: state.step + action.increment
    } }

  }


  return { ...state, ...{
    step: action.step
  } }

}


export default {
  progress}
