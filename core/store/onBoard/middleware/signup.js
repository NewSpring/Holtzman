/*global Meteor */

import onBoard from "../"
import { auth } from "../../../methods"

const signup = (store, next, action) => {
  const { dispatch, getState } = store

  const state = getState()
  const { data } = state.onBoard


  // submitting form
  if (
    state.onBoard.state === "default" &&
    action.state === "submit" &&
    data.email &&
    data.password &&
    data.firstName &&
    data.lastName &&
    data.terms
  ) {

    // trigger loading screen
    dispatch(onBoard.loading())

    const failure = () => {
      dispatch(onBoard.error({
        unauthorized: {
          message: "Incorrect email and password combination"
        }
      }))
      dispatch(onBoard.authorize(false))
      dispatch(onBoard.fail())
    }

    auth.signup(data, (err) => {

      if (err) { failure(err); return  }
      Meteor.loginWithPassword(data.email, data.password, () => {

        dispatch(onBoard.success())
        dispatch(onBoard.authorize(true))

        action.state = "default"
        return next(action)
      })


    })

    return function cancel() {

    }

  }

  return next(action)


}

export default signup
