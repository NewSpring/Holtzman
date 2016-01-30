import "regenerator/runtime"
import { take, put, cps } from "redux-saga"

import { GraphQL } from "../../graphql"
import { auth } from "../../methods"
import { addSaga } from "../utilities"

import actions from "./actions"

// Check for availibilty of account
addSaga(function* checkAccount(getState) {

  // setup this saga to always be listening for actions
  while (true) {

    // wait for the email field to be blurred
    const { data } = yield take("ONBOARD.SET_DATA")
    const { email } = data

    // if the event was triggered by email check to see if it available
    if (email) {
      // make call to Rock to check if account is open
      let isAvailable = yield cps(auth.available, email)

      // end the run of this saga iteration by setting account
      yield put(actions.setAccount(!isAvailable))
    }

  }

})


function* login(getState) {
  const currentState = getState()
  const { data, state } = currentState.onBoard

  if (data.email && data.password) {
    let { email, password } = data

    // set the UI to show the loading screen
    yield put(actions.loading())

    try {
      // make the call to try and login
      let isAuthorized = yield cps(auth.login, email, password)

      // this should always be true shouldn't it?
      if (isAuthorized) {
        // return Meteor login to parent saga
        const result = yield cps(Meteor.loginWithPassword, email, password)

        return { result }
      }

    } catch (error) {
      return { error }
    }

  }

}

function* signup(getState) {
  const currentState = getState()
  const { data, state } = currentState.onBoard

  // shorthand for 80 ch limit
  let d = data
  if (d.email && d.password && d.firstName && d.lastName && d.terms) {
    let { email, password } = data

    // set the UI to show the loading screen
    yield put(actions.loading())

    try {

      // make the call to try and signup
      let isAuthorized = yield cps(auth.signup, data)

      // this should always be true shouldn't it?
      if (isAuthorized) {
        // return Meteor login to parent saga
        const result = yield cps(Meteor.loginWithPassword, email, password)

        return { result }
      }

    } catch (error) {
      return { error }
    }

  }
}

// handle onboard wordflow
addSaga(function* onBoard(getState) {

  // setup this saga to always be listening for actions
  while (true) {

    const { state } = yield take("ONBOARD.SET_STATE")

    if (state === "submit") {
      let currentState = getState(),
          returnValue;

      if (currentState.onBoard.account) {
        returnValue = yield* login(getState)
      } else {
        returnValue = yield* signup(getState)
      }

      let { result, error } = returnValue

      if (error) {
        // add error to store
        yield put(actions.error({ "password": error.error }))

        // set not logged in status
        yield put(actions.authorize(false))

        // fail the form
        yield put(actions.fail())

        // reset the UI
        yield put(actions.setState("default"))

      } else {

        // set the logged in status
        yield put(actions.authorize(true))

        // succeed the form
        yield put(actions.success())

        let user = Meteor.user()

        // if this is the first login, show welcome
        if (!user || !user.profile || !user.profile.lastLogin) {
          yield put(actions.showWelcome())
        }

        // reset the UI
        yield put(actions.setState("default"))

        // update login time
        Meteor.users.update(Meteor.userId(), {
          $set: {
            "profile.lastLogin": new Date()
          }
        })

      }

    }

  }

})
