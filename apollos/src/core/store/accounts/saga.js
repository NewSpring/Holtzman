import "regenerator-runtime/runtime"
import { takeLatest, takeEvery } from "redux-saga";
import { fork, put, cps, call, select } from "redux-saga/effects"
import gql from "graphql-tag";

import { GraphQL } from "../../graphql"
import accounts from "../../methods/accounts/client"
import { addSaga } from "../utilities"

import actions from "./actions"

let inFlight = false;
// Check for availibilty of account
function* checkAccount({ data }) {
  const { email } = data
  // if the event was triggered by email check to see if it available
  if (!email || inFlight) return;

  // only make one request at a time
  inFlight = true;
  // make call to Rock to check if account is open
  let {
    isAvailable,
    alternateAccounts,
    peopleWithoutAccountEmails,
  } = yield cps(accounts.available, email);

  inFlight = false;
  // end the run of this saga iteration by setting account
  yield put(actions.setAccount(!isAvailable))
  yield put(actions.setAlternateAccounts(alternateAccounts))
  yield put(actions.peopleWithoutAccountEmails(peopleWithoutAccountEmails))

}

function* completeAccount() {
  const state = yield select();
  const { email, personId } = state.accounts.data
  let created = false, error;

  // XXX dead code removal broke this
  function canComplete() {
    return state.accounts.data.email && state.accounts.data.personId
  }
  if (canComplete()) {

    // set the UI to show the loading screen
    yield put(actions.loading())

    try {
      created = yield cps(accounts.recover, email, personId)
    } catch (e) {
      error = e
    }

    if (created) {
      // reset the UI
      yield put(actions.setState("default"))

    } else {

      // add error to store
      yield put(actions.error({ "password": error }))

      // remove the recover account settings
      yield put(actions.resetAccount())

      // set not logged in status
      yield put(actions.authorize(false))

      // fail the form
      yield put(actions.fail())

      // reset the UI
      yield put(actions.setState("default"))

    }
  }
}

function* login() {
  const currentState = yield select()
  const { data, state } = currentState.accounts

  if (data.email && data.password) {
    let { email, password } = data

    // set the UI to show the loading screen
    yield put(actions.loading())

    try {
      // make the call to try and login
      let isAuthorized = yield cps(accounts.login, email, password)

      // this should always be true shouldn't it?
      if (isAuthorized) {
        // return Meteor login to parent saga
        const result = yield cps(Meteor.loginWithPassword, email, password)
        if (isAuthorized) {
          return { result: isAuthorized }
        } else {
          return { error: new Meteor.Error("An unkown error occured") }
        }
      }

    } catch (error) {
      return { error }
    }

  }

}

function* signup() {
  const currentState = yield select()
  const { data, state } = currentState.accounts

  // shorthand for 80 ch limit
  let d = data
  if (d.email && d.password && d.firstName && d.lastName && d.terms) {
    let { email, password } = data

    // set the UI to show the loading screen
    yield put(actions.loading())

    try {

      // make the call to try and signup
      let isAuthorized = yield cps(accounts.signup, data)

      // this should always be true shouldn't it?
      if (isAuthorized) {
        // return Meteor login to parent saga
        const result = yield cps(Meteor.loginWithPassword, email, password)

        if (isAuthorized) {
          return { result: isAuthorized }
        } else {
          return { error: new Meteor.Error("An unkown error occured") }
        }
      }

    } catch (error) {
      return { error }
    }

  }
}

// handle accounts wordflow
function* onboard({ state }) {
  if (state !== "submit") return;

  let currentState = yield select(),
      returnValue = false;

  if (currentState.accounts.account) {
    returnValue = yield* login()
  } else {
    returnValue = yield* signup()
  }

  if (returnValue) {
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

      const query = gql`
        query GetPersonData {
          person: currentPerson {
            id
            age
            birthDate
            birthDay
            birthMonth
            birthYear
            campus {
              name
              shortCode
              id
            }
            home {
              city
              country
              id
              zip
              state
              street1
              street2
            }
            firstName
            lastName
            nickName
            email
            photo
          }
        }
      `;

      // forceFetch for someone signs out and signs back in again
      const { data } = yield GraphQL.query({ query, forceFetch: true });
      const { person } = data;

      if (person) yield put(actions.person(person))

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
        $set: { "profile.lastLogin": new Date() }
      });
    }
  }
}

addSaga(function* accountsSaga(){
  yield fork(takeEvery, "ACCOUNTS.SET_DATA", checkAccount);
  yield fork(takeLatest, "ACCOUNTS.COMPLETE_ACCOUNT", completeAccount);
  yield fork(takeEvery, "ACCOUNTS.SET_STATE", onboard);
})
