import { onBoard } from "../../../../core/client/actions"
import { auth } from "../../../client/methods"

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
    data.terms
  ) {

    // trigger loading screen
    dispatch(onBoard.loading())

    const failure = (err) => {
      dispatch(onBoard.error({
        unauthorized: {
          message: "Incorrect email and password combination"
        }
      }))
      dispatch(onBoard.authorize(false))
      dispatch(onBoard.fail())
    }

    const loggedIn = (err, account) => {
      if (err.error === 403) {
        // we need to do something if they are already in mongo?
      }
      dispatch(onBoard.success())
      dispatch(onBoard.authorize(true))
    }

    auth.signup(data.email, data.password, (err, success) => {

      if (!err && success) {
        Accounts.createUser({
          email: data.email,
          password: data.password
        }, loggedIn)
      } else {
        failure(err)
      }

      action.state = "default"
      return next(action)
    })

    return function cancel() {

    }

  }

  return next(action)


}

export default signup
