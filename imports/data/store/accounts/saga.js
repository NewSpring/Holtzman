/* eslint-disable import/no-named-as-default-member */
import "regenerator-runtime/runtime";
import { takeLatest, takeEvery } from "redux-saga";
import { fork, put, cps, select } from "redux-saga/effects";
import gql from "graphql-tag";

import { GraphQL } from "../../graphql";
import accounts from "../../../deprecated/methods/accounts/browser";
import { addSaga } from "../utilities";

import actions from "./actions";

// eslint-disable-next-line
export const PRELOAD_PERSON = gql`
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
      impersonationParameter
      groups(groupTypeIds: [25, 60]) {
        id
        groupType
        name
        photo
        members {
          person {
            id
          }
          role
        }
      }
    }
  }
`;

let inFlight = false;
// Check for availibilty of account
function* checkAccount({ data }) {
  const { email } = data;
  // if the event was triggered by email check to see if it available
  if (!email || inFlight) return;

  // only make one request at a time
  inFlight = true;
  try {
    // make call to Rock to check if account is open
    const { isAvailable, alternateAccounts, peopleWithoutAccountEmails } = yield cps(
      accounts.available,
      email,
    );

    inFlight = false;
    // end the run of this saga iteration by setting account
    yield put(actions.setAccount(!isAvailable));
    yield put(actions.setAlternateAccounts(alternateAccounts));
    yield put(actions.peopleWithoutAccountEmails(peopleWithoutAccountEmails));
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
}

function* completeAccount() {
  const state = yield select();
  const { email, personId } = state.accounts.data;
  // eslint-disable-next-line
  let created = false,
    error;

  // XXX dead code removal broke this
  function canComplete() {
    return state.accounts.data.email && state.accounts.data.personId;
  }
  if (canComplete()) {
    // set the UI to show the loading screen
    yield put(actions.loading());

    try {
      created = yield cps(accounts.recover, email, personId);
    } catch (e) {
      error = e;
    }

    if (created) {
      // reset the UI
      yield put(actions.setState("default"));
    } else {
      // add error to store
      yield put(actions.error({ password: error }));

      // remove the recover account settings
      yield put(actions.resetAccount());

      // set not logged in status
      yield put(actions.authorize(false));

      // fail the form
      yield put(actions.fail());

      // reset the UI
      yield put(actions.setState("default"));
    }
  }
}

function* login() {
  const currentState = yield select();
  const { data } = currentState.accounts;

  if (data.email && data.password) {
    const { email, password } = data;

    // set the UI to show the loading screen
    yield put(actions.loading());

    try {
      // make the call to try and login
      const isAuthorized = yield cps(accounts.login, email, password);

      // this should always be true shouldn't it?
      if (isAuthorized) {
        // return Meteor login to parent saga
        // eslint-disable-next-line
        const result = yield cps(Meteor.loginWithPassword, email, password);
        if (isAuthorized) {
          return { result: isAuthorized };
        }
        return { error: new Meteor.Error("An unkown error occured") };
      }
    } catch (error) {
      return { error };
    }
  }
  return false;
}

function* signup() {
  const currentState = yield select();
  const { data } = currentState.accounts;

  // shorthand for 80 ch limit
  const d = data;
  if (d.email && d.password && d.firstName && d.lastName && d.terms) {
    const { email, password } = data;

    // set the UI to show the loading screen
    yield put(actions.loading());

    try {
      // make the call to try and signup
      const isAuthorized = yield cps(accounts.signup, data);

      // this should always be true shouldn't it?
      if (isAuthorized) {
        // return Meteor login to parent saga
        // eslint-disable-next-line
        const result = yield cps(Meteor.loginWithPassword, email, password);

        if (isAuthorized) {
          return { result: isAuthorized };
          // eslint-disable-next-line
        } else {
          return { error: new Meteor.Error("An unkown error occured") };
        }
      }
    } catch (error) {
      return { error };
    }
  }
  return false;
}

// handle accounts wordflow
function* onboard({ state }) {
  if (state !== "submit") return;

  const currentState = yield select();
  let returnValue = false;

  if (currentState.accounts.account) {
    returnValue = yield* login();
  } else {
    returnValue = yield* signup();
  }

  if (returnValue) {
    const { error } = returnValue;

    if (error) {
      // add error to store
      yield put(actions.error({ password: error.error }));

      // set not logged in status
      yield put(actions.authorize(false));

      // fail the form
      yield put(actions.fail());

      // reset the UI
      yield put(actions.setState("default"));
    } else {
      // forceFetch for someone signs out and signs back in again
      const { data } = yield GraphQL.query({ query: PRELOAD_PERSON, forceFetch: true });
      const { person } = data;

      if (person) yield put(actions.person(person));

      // set the logged in status
      yield put(actions.authorize(true));

      // succeed the form
      yield put(actions.success());

      const user = Meteor.user();

      // if this is the first login, show welcome
      if (!user || !user.profile || !user.profile.lastLogin) {
        yield put(actions.showWelcome());
      }

      // reset the UI
      yield put(actions.setState("default"));

      // update login time
      Meteor.users.update(Meteor.userId(), {
        $set: { "profile.lastLogin": new Date() },
      });
    }
  }
}

addSaga(function* accountsSaga() {
  yield fork(takeEvery, "ACCOUNTS.SET_DATA", checkAccount);
  yield fork(takeLatest, "ACCOUNTS.COMPLETE_ACCOUNT", completeAccount);
  yield fork(takeEvery, "ACCOUNTS.SET_STATE", onboard);
});
