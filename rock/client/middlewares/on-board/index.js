
import { onBoard } from "../../../../core/client/actions"
import { auth } from "../../../client/methods"

import login from "./on-board.login"
import signup from "./on-board.signup"

const onboard = store => next => action => {

  const { dispatch, getState } = store

  // restrict middleware to onboard actions
  if (action.type.indexOf("ONBOARD") != 0) {
    return next(action)
  }

  switch (action.type) {
    case "ONBOARD.SET_STATE":
      const state = getState()

      if (action.state === "submit") {
        if (state.onBoard.account) {
          return login(store, next, action)
        }

        return signup(store, next, action)
      }

      return next(action)

      break;
    case "ONBOARD.SET_DATA":
      // don't hold everything up
      next(action)

      if (action.data.email){
        // set state based on is email is already in system
        auth.available(action.data.email, (err, isAvailable) => {
          dispatch(onBoard.setAccount(!isAvailable))
        })
      }
      break
    default:
      return next(action)
  }


}

export default onboard
