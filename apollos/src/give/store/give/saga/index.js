import "regenerator-runtime/runtime"
import React from "react";
import ReactDOM from "react-dom"
import Moment from "moment"
import { takeLatest, takeEvery } from "redux-saga";
import { fork, take, put, cps, call, select } from "redux-saga/effects"
import gql from "graphql-tag";

import { GraphQL } from "../../../../core/graphql"
import { addSaga } from "../../../../core/store/utilities"
import modalActions from "../../../../core/store/modal"

import types from "./../types"
import actions from "../actions"

import { CreditCardForm, AchForm } from "./paymentForm"
import formatPersonDetails from "./formatPersonDetails"

import { order, schedule, charge } from "../../../methods/give/client"
import RecoverSchedules from "../../../blocks/RecoverSchedules"

// XXX break this file up into smaller files

// at this point in time we have to do steps 1 - 3 of the
// three step process to create a validation response
// this validation process is required to ensure that the account
// that is being used to make payments, is actually valid
// see https://github.com/NewSpring/Apollos/issues/439 for discussion
function* validate() {

  const { give } = yield select(),
    name = give.data.payment.name;

  let success = true,
    validationError = false,
    transactionResponse;

  // we strip all product and schedule data so the validation is
  // just of the personal details + billing address
  const modifiedGive = {...give}
  delete modifiedGive.transactions
  delete modifiedGive.schedules



  // step 1 (sumbit personal details)
  // personal info is ready to be submitted
  const formattedData = formatPersonDetails(modifiedGive)

  // in order to make this a validation call, we need to set the amount
  // to be 9
  formattedData.amount = 0

  let error, url;
  try {
    // call the Meteor method to submit data to NMI
    const response = yield cps(order, formattedData)
    url = response.url

  } catch (e) { error = e }

  // step 2 (sumbit payment details)
  yield submitPaymentDetails(modifiedGive.data, url)

  if (url) {
    // step 3 (trigger validation)
    let token = url.split("/").pop();
    try {
      transactionResponse = yield cps(charge, token, name, null)
    } catch (e) {
      validationError = e
      success = false
    }
  } else {
    success = false
    validationError = error
  }

  return {
    success,
    validationError,
  }


}

// handle the transactions
function* chargeTransaction({ state }) {

  if (state !== "submit") return;

  let { give } = yield select(),
      name = give.data.payment.name,
      action = charge,
      error = false,
      id;

  // set loading state
  yield put(actions.loading())

  // personal info is ready to be submitted
  const formattedData = formatPersonDetails(give)

  // if you have a saved account, NMI lets you "order" a schedule
  // instead of order + charge
  if (formattedData.savedAccount && Object.keys(give.schedules).length) {
    // wrap the function for the same api
    action = (token, name, id, callback) => {
      Meteor.call("give/order", formattedData, true, id, callback)
    }

  } else {

    let store = yield select()
    give = store.give

    if (formattedData.savedAccount) {
      // set people data and store transaction id
      yield* submitPersonDetails(give, true)
    }

    store = yield select()
    give = store.give

    // wait until we have the transaction url
    if (!give.url) {
      let { url } = yield take(types.SET_TRANSACTION_DETAILS)
      give.url = url
    }
  }

  // get the token and name of the saved account
  let token = give.url.split("/").pop();

  if (Object.keys(give.schedules).length) {
    // if there is not a saved account, charge the order
    if (!formattedData.savedAccount) {
      action = schedule

      if (give.data.payment.type === "cc") {
        // saved accounts don't validate the payment by default
        // so we make 3 blocking requests to validate the card :(
        let { success, validationError } = yield* validate()

        if (validationError) {
          error = validationError
        }
      }
    }
  }


  if (give.scheduleToRecover && Object.keys(give.schedules).length) {
    id = give.scheduleToRecover
  }

  let transactionResponse = {}
  // submit transaction
  try {
    if (!error) {
      transactionResponse = yield cps(action, token, name, id)
    }
  } catch (e) { error = e }

  // set error states
  if (error) {

    yield put(actions.error({ transaction: error }))

    // remove loading state
    yield put(actions.setState("error"))

  } else {

    // remove loading state
    yield put(actions.setState("success"))

    // if we activated an inactive schedule, remove it
    if (give.scheduleToRecover && give.recoverableSchedules[give.scheduleToRecover]) {
      yield put(actions.deleteSchedule(give.scheduleToRecover))
      yield put(actions.deleteRecoverableSchedules(give.scheduleToRecover))
    }

    // if this was a named card (as in creating a saved account)
    // lets force and update of the payment cards and set it in the store
    // @TODO this is a race condition against updates in Rock
    // we don't have a way to optimistcally update this without it being a
    // hacky work around. I think this can wait until Apollo is closer
    // to revist
    if (name) {
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
      let query = gql`
        query GetSavedPayments {
          savedPayments {
            name
            id
            date
            payment {
              accountNumber
              paymentType
            }
          }
        }
      `

      // wait one second before calling this
      yield call(delay, 1000)
      yield GraphQL.query({ query })
    }
  }
}


function* submitPaymentDetails(data, url) {

  /*

    Oddity with NMI, when using a saved account for a subscription,
    you only submit the order, not the charge, etc

  */
  if (data.payment.type === "cc" && !data.payment.cardNumber) return;
  if (data.payment.type === "ach" && !data.payment.accountNumber) return;

  const form = document.createElement("FORM")

  let Component,
      obj;

  const { payment, personal } = data

  // format data and select component
  if (payment.type === "ach") {
    obj = {
      name: `${personal.firstName} ${personal.lastName}`,
      account: payment.accountNumber,
      routing: payment.routingNumber,
      type: payment.accountType
    }

    Component = AchForm
  } else {
    obj = {
      number: payment.cardNumber,
      exp: payment.expiration,
      ccv: payment.ccv,
    }

    Component = CreditCardForm
  }

  // create the fieldset
  const FieldSet = React.createElement(Component, {...obj});
  // add fieldset to non rendered form
  ReactDOM.render(FieldSet, form)

  // @TODO test on older browsers
  // store data in NMI's system
  return yield fetch(url, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors"
    })
    .then((response) => {
      // next()

    })
    .catch((e) => {
      // @TODO error handling
    })

}

function* submitPersonDetails(give, autoSubmit) {

  // personal info is ready to be submitted
  const formattedData = formatPersonDetails(give)

  /*

    Oddity with NMI, when using a saved account for a subscription,
    you only submit the order, not the charge, etc

  */
  if (formattedData.savedAccount && Object.keys(give.schedules).length) {
    return;
  }

  let error, url;
  try {
    // call the Meteor method to submit data to NMI
    const response = yield cps(order, formattedData)
    url = response.url

  } catch (e) { error = e }

  if (autoSubmit) {

    /*

      @NOTE
        This is a hacky way to get around the submission required
        by transnational gateway. We do a POST into the dark web of
        NMI servers

      @NOTE
        This will always throw an error but we just catch it and ignore

      @NOTE
        DO NOT REMOVE THIS

    */
    const response = yield fetch(url, {
      method: "POST",
      body: new FormData(),
      mode: "no-cors"
    })
      .then((response) => {})
      .catch((e) => {})

  }

  // update the store with the url
  return yield put(actions.setDetails(url))

}

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
  let { give } = yield select()
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

  let user = Meteor.userId()

  if (!user) {
    const { authorized } = yield take("ACCOUNTS.IS_AUTHORIZED")
  }

  user = Meteor.user()

  if (user && user.profile && user.profile.reminderDate) {
    yield put(actions.setReminder(user.profile.reminderDate))
  }

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

  let { data } = yield GraphQL.query({ query, variables })

  let { schedules } = data;
  hasRecovered = true;
  let bulkUpdate = {}
  // schedules = schedules.filter(x => !x.gateway)
  if (schedules.length) {
    for (let schedule of schedules) {
      // only recover schedules that are missing info (i.e. not turned off in Rock)
      // if (schedule.gateway) continue;

      if (schedule.schedule.value === "Twice a Month") {
        schedule.schedule.value = null
      }
      bulkUpdate[schedule.id] = {...{
        start: Moment(schedule.start).format("YYYYMMDD"),
        frequency: schedule.schedule.value
      }, ...schedule }

    }

    let time = new Date()
    if (user && user.profile && user.profile.reminderDate) {
      time = user.profile.reminderDate
    }
    let now = new Date()

    yield put(actions.saveSchedules(bulkUpdate))

    // only update the store if it is past the reminder date
    if (now < time) return

    let state = yield select();
    let { pathname } = state.routing.location

    if (pathname.split("/").length === 4 && pathname.split("/")[3] === "recover" ) {
      return
    }

    yield put(modalActions.render(RecoverSchedules))
  }

}

// ensure we are on a /give route
function* watchRoute({ payload }){

  if (Meteor.isServer) return;

  function isGive(path) {
    return path.split("/")[1] === "give"
  }

  if (isGive(payload.pathname)) yield* recoverTransactions();

}



// clear out data on user change
function* clearGiveData({ authorized }){
  if (!authorized) yield put(actions.clearData())
}

addSaga(function* accountsSaga(){
  yield fork(takeEvery, types.SET_STATE, chargeTransaction);
  yield fork(takeEvery, types.SET_PROGRESS, createOrder);
  yield fork(takeEvery, "ACCOUNTS.IS_AUTHORIZED", clearGiveData);
  yield fork(takeLatest, "@@router/UPDATE_LOCATION", watchRoute)

  const state = yield select();
  const payload = state.routing.location;

  function isGive(path) {
    return path.split("/")[1] === "give"
  }

  if (isGive(payload.pathname)) yield* recoverTransactions();
})
