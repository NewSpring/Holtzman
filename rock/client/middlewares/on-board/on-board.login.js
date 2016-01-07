/*global Meteor */

import { onBoard } from "../../../../core/client/actions"
import { auth } from "../../../client/methods"


const login = (store, next, action) => {
  const { dispatch, getState } = store

  const state = getState()
  const { data } = state.onBoard

  // submitting form
  if (state.onBoard.state === "default" && action.state === "submit" && data.email && data.password) {

    // trigger loading screen
    dispatch(onBoard.loading())

    auth.login(data.email, data.password, (err, authorized) => {
      const failure = () => {
        dispatch(onBoard.error({
          unauthorized: {
            message: "Incorrect email and password combination"
          }
        }))
        dispatch(onBoard.authorize(false))
        dispatch(onBoard.fail())
      }

      if (authorized) {
        Meteor.loginWithPassword(data.email, data.password, (err, response) => {
          console.log(err, response)

          dispatch(onBoard.success())
          dispatch(onBoard.authorize(true))

          action.state = "default"
          return next(action)

        })

      } else {
        failure(err)
        return next(action)
      }

    })

    return function cancel() {
      // clearTimeout(timeoutId)
    }

  }

  return next(action)
}

export default login
