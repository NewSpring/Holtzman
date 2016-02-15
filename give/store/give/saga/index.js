import "regenerator/runtime"
import ReactDOM from "react-dom"
import Moment from "moment"
import { take, put, cps } from "redux-saga/effects"

import { GraphQL } from "../../../../core/graphql"
import { addSaga } from "../../../../core/store/utilities"
import modalActions from "../../../../core/store/modal"
import { api } from "../../../../core/util/rock"

import types from "./../types"
import actions from "../actions"

import { CreditCardForm, AchForm } from "./paymentForm"
import formatPersonDetails from "./formatPersonDetails"

import { order, schedule, charge } from "../../../methods/give/client"
import RecoverSchedules from "../../../blocks/RecoverSchedules"

// handle the transactions
addSaga(function* chargeTransaction(getStore) {

  while (true) {
    let { state } = yield take(types.SET_STATE)
    let { give, campuses } = getStore(),
        name = give.data.payment.name,
        action = charge,
        error = false,
        id;

    if (state === "submit") {

      // set loading state
      yield put(actions.loading())

      // personal info is ready to be submitted
      const formattedData = formatPersonDetails(give, campuses)

      if (formattedData.savedAccount && Object.keys(give.schedules).length) {
        // wrap the function for the same api
        action = (token, name, id, callback) => {
          Meteor.call("give/order", formattedData, true, callback)
        }

      } else {
        // wait until we have the transaction url
        if (!give.url) {
          let { url } = yield take(types.SET_TRANSACTION_DETAILS)
          give.url = url
        }
      }

      // get the token and name of the saved account
      let token = give.url.split("/").pop();

      if (Object.keys(give.schedules).length && !formattedData.savedAccount) {
        action = schedule
        for (let schedule in give.schedules) {
          id = schedule
          break
        }
      }

      let transactionResponse = {}
      // submit transaction
      try {
        transactionResponse = yield cps(action, token, name, id)
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
        for (let schedule in give.schedules) {
          if (give.recoverableSchedules[schedule]) {
            yield put(actions.deleteSchedule(schedule))
          }
        }

        // if this was a named card (as in creating a saved account)
        // lets force and update of the payment cards and set it in the store
        if (name && transactionResponse["cvv-match"] === "M") {
          let query = `
            {
              paymentDetails: allSavedPaymentAccounts(cache: false, mongoId: "${Meteor.userId()}") {
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

          let details = yield GraphQL.query(query)

          if (details && details[0]) {
            yield put(actions.setAccount(details[0]))
          }
        }

      }

    }
  }

})


function* submitPersonDetails(give, campuses, autoSubmit) {


  // personal info is ready to be submitted
  const formattedData = formatPersonDetails(give, campuses)

  /*

    Oddity with NMI, when using a saved account for a subscription,
    you only submit the order, not the charge, etc

  */
  if (formattedData.savedAccount && Object.keys(give.schedules).length) {
    return
  }


  // call the Meteor method to submit data to NMI
  const { url } = yield cps(order, formattedData)

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
addSaga(function* createOrder(getStore) {

  // setup this saga to always be listening for actions
  while (true) {

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
    const { step } = yield take(types.SET_PROGRESS)
    let { give, campuses } = getStore()


    if (step === 4 || (give.step - 1) === 2) {

      // set people data and store transaction id
      yield* submitPersonDetails(give, campuses, step === 4)


    } else if ((give.step - 1) === 3) {

      const form = document.createElement("FORM")

      let Component,
          obj;

      const { payment } = give.data

      // format data and select component
      if (payment.type === "ach") {
        obj = {
          name: payment.name,
          account: payment.account,
          routing: payment.routing,
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
      fetch(give.url, {
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



  }

})

// recover transactions
function* recoverTransactions(getStore) {
  let user = Meteor.userId()

  if (!user) {
    const { authorized } = yield take("ONBOARD.IS_AUTHORIZED")
  }

  user = Meteor.user()

  if (user && user.profile && user.profile.reminderDate) {
    yield put(actions.setReminder(user.profile.reminderDate))
  }

  let query = `
    query ScheduledTransactions($mongoId: String) {
      schedules: allScheduledFinanicalTransactions(mongoId: $mongoId, active: false, cache: false) {
        id
        gateway
        start
        details {
          amount
          account {
            name
            id
            description
          }
        }
        schedule {
          value
          description
        }
      }
    }
  `

  const { schedules } = yield GraphQL.query(query)

  let bulkUpdate = {}
  if (schedules.length) {
    for (let schedule of schedules) {
     bulkUpdate[schedule.id] = {...{
       start: Moment(schedule.start).format("YYYYMMDD"),
       frequency: schedule.schedule.value
     }, ...schedule }

    }

    let store = getStore()
    let time = new Date()
    if (user && user.profile && user.profile.reminderDate) {
      time = user.profile.reminderDate
    }
    let now = new Date()

    yield put(actions.saveSchedules(bulkUpdate))

    // only update the store if it is past the reminder date
    if (now < time) {
      return
    }

    yield put(modalActions.render(RecoverSchedules))

  }

}

// ensure we are on a /give route
addSaga(function* watchRoute(getStore){

  while (true) {

    let state = getStore();
    let { pathname } = state.routing.location,
        recovered;

    function isGive(path) {
      return path.split("/")[1] === "give"
    }

    if (!isGive(pathname)) {
      const { payload } = yield take("@@router/UPDATE_LOCATION")

      if (isGive(payload.pathname)) {

        recovered = yield* recoverTransactions(getStore)
        break
      }

    } else {
      recovered = yield* recoverTransactions(getStore)
      break
    }



  }

})


// clear out data on user change
addSaga(function* bindGiveAuth(geStore){

  while (true) {

    const { authorized } = yield take("ONBOARD.IS_AUTHORIZED")

    if (!authorized) {
      yield put(actions.clearData())
    }

  }

})
