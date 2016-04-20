import { assign } from "lodash";

const progress = (state: any, action: any): any => {

  if (action.increment) {
    if (typeof action.increment != "number") {
      return state;
    }

    if (state.step + action.increment <= 0) {
      return state;
    }

    return assign(state, { step: state.step + action.increment });
  }

  return assign(state, { step: action.step });
};


export {
  progress
};
