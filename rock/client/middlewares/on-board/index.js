
import { onBoard } from "../../../../core/client/actions"
import { auth } from "../../../client/methods"


const onboard = store => next => action => {

  const { dispatch, getState } = store
  // restrict middleware to onboard actions
  if (action.type.indexOf("ONBOARD") != 0) {
    return next(action)
  }

  switch (action.type) {
    case "ONBOARD.SET_STATE":
      const state = getState()
      // submitting form
      if (state.onBoard.state === "default" && action.state === "submit") {
        dispatch(onBoard.loading())

        // const fetch = api.get()
        let timeoutId = setTimeout(() => {
          dispatch(onBoard.success())
          action.state = "default"
          next(action)
        }, 10000)

        return function cancel() {
          clearTimeout(timeoutId)
        }

      }

      return next(action)


      break;
    case "ONBOARD.SET_DATA":

      // don't hold everything up
      next(action)

      // set state based on is email is already in system
      auth.available(action.data.email, (err, isAvailable) => {
        dispatch(onBoard.setAccount(!isAvailable))
      })

      return

    default:
      return next(action)
  }


}

export default onboard
