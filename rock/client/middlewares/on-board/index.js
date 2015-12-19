
import { onBoard } from "../../../../core/client/actions"

// const initial = {
//
//   account: true,
//   forgot: false,
//
//   data: {
//     email: null, // String
//     password: null, // String (encrypted before launch)
//     terms: true, // String
//   },
//
//   state: "default", // "submit", "loading"
//
//   attempts: 0,
//   errors: {
//     // <id>: {
//     //   message: "Email is required"
//     // }
//   },
//
//   success: false
//
// }

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
    default:
      return next(action)
  }


}

export default onboard
