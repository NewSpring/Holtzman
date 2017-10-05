import "regenerator-runtime/runtime";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { takeLatest, takeEvery, fork, take, put, select, call } from "redux-saga/effects";
import gql from "graphql-tag";

import { GraphQL } from "../../../graphql";
import { addSaga } from "../../utilities";
import modalActions from "../../modal";

import types from "./../types";
import actions from "../actions";

import RecoverSchedule from "../../../../components/giving/recover-schedules";

import validate from "./validate";
import chargeTransaction from "./chargeTransaction";
import submitPaymentDetails from "./submitPaymentDetails";
import submitPersonDetails from "./submitPersonDetails";

export {
  validate,
  chargeTransaction,
  submitPaymentDetails,
  submitPersonDetails,
};


// transaction processing flow controller
function* createOrder() {
  /*

    steps to give

    Full Steps
    1. add person data
    2. submit person data to NMI
    3. get back transaction code
    4. submit payment details to NMI
    5. process transaction
    6. handle success / errors

    Saved Account
    1. submit person code to NMI
    2. get back transaction code
    3. process transaction
    4. handle success / errors

  */
  const { give } = yield select();
  if ((give.step - 1) === 2) {
    // set people data and store transaction id
    yield* submitPersonDetails(give, false);
  } else if ((give.step - 1) === 3) {
    yield* submitPaymentDetails(give.data, give.url);
  }
}


/*


  During the transition from F1 to Rock, we have schedules that need
  to be recovered from our imported data

  The criteria for a `recoverable schedule` is the following:
    IsActive (active: false on GQL query) === false
    GatewayCode (gateway on GQL) === null

  When the schedule is reactivated, the GatewayCode is set and it is set back
  to active.

  If the schedule is canceled permantly, and it doesn't have a GatewayCode,
  it is safe to delete it as no auditable information exists.

*/

let hasRecovered = false;
// recover transactions
function* recoverTransactions() {
  if (hasRecovered) return;

  let user = Meteor.userId();

  if (!user) yield take("ACCOUNTS.IS_AUTHORIZED");

  const query = gql`
    query GetInActiveSchedules($isActive: Boolean, $cache: Boolean) {
      schedules: scheduledTransactions(isActive: $isActive, cache: $cache) {
        id: entityId
        start
        next
        gateway
        date
        schedule { value, description }
        details {
          amount
          account { name, id, description }
        }
      }
    }
  `;

  const variables = { isActive: false, cache: false };

  const { data } = yield GraphQL.query({ query, variables });

  let { schedules } = data;
  if (!schedules) schedules = [];
  hasRecovered = true;
  const bulkUpdate = {};
  schedules = schedules.filter(x => !x.gateway);
  if (schedules.length) {
    for (const schedule of schedules) {
      // only recover schedules that are missing info (i.e. not turned off in Rock)
      if (schedule.gateway) continue; // eslint-disable-line

      if (schedule.schedule.value === "Twice a Month") {
        schedule.schedule.value = null;
      }
      bulkUpdate[schedule.id] = {
        ...{
          start: moment(schedule.start).format("YYYYMMDD"),
          frequency: schedule.schedule.value,
        },
        ...schedule,
      };
    }

    yield put(actions.saveSchedules(bulkUpdate));

    // delay to wait for published meteor user
    yield call(() => new Promise(r => setTimeout(r, 1000)));
    user = Meteor.user();
    if (user && user.profile && user.profile.reminderDate) {
      yield put(actions.setReminder(user.profile.reminderDate));
      const time = new Date(user.profile.reminderDate);
      const now = new Date();
      // only update the store if it is past the reminder date
      if (now < time) return;
    }

    const state = yield select();
    const { pathname } = state.routing.location;

    if (pathname.split("/").length === 4 && pathname.split("/")[3] === "recover") {
      return;
    }

    yield put(modalActions.render(RecoverSchedule));
  }
}

// ensure we are on a /give route
function* watchRoute({ payload }) {
  if (Meteor.isServer) return;

  function isGive(path) {
    return path.split("/")[1] === "give";
  }

  if (isGive(payload.pathname)) yield* recoverTransactions();
}


// clear out data on user change
export function* clearGiveData({ authorized }) {
  if (!authorized) yield put(actions.clearData());
}

addSaga(function* accountsSaga() {
  yield fork(takeEvery, types.SET_STATE, chargeTransaction);
  yield fork(takeEvery, types.SET_PROGRESS, createOrder);
  yield fork(takeEvery, "ACCOUNTS.IS_AUTHORIZED", clearGiveData);
  yield fork(takeLatest, "@@router/UPDATE_LOCATION", watchRoute);

  const state = yield select();
  const payload = state.routing.location;

  function isGive(path) {
    return path.split("/")[1] === "give";
  }

  if (isGive(payload.pathname)) yield* recoverTransactions();
});
