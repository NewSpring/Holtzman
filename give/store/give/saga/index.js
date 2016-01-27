import "regenerator/runtime"
import ReactDOM from "react-dom"
import { take, put, cps } from "redux-saga"

import { GraphQL } from "../../../../core/graphql"
import { addSaga } from "../../../../core/store/utilities"

import types from "./../types"
import actions from "../actions"

import { CreditCardForm, AchForm } from "./paymentForm"
import formatPersonDetails from "./formatPersonDetails"

import { order, schedule, charge } from "../../../methods/give/client"

// handle the transactions
addSaga(function* chargeTransaction(getStore) {

  while (true) {
    let { state } = yield take(types.SET_STATE)
    let { give } = getStore()

    if (state === "submit") {

      // set loading state
      yield put(actions.loading())

      // wait until we have the transaction url
      if (!give.url) {
        let { url } = yield take(types.SET_TRANSACTION_DETAILS)
        give.url = url
      }

      // get the token and name of the saved account
      let token = give.url.split("/").pop(),
          name = give.data.payment.name,
          action = charge,
          error = false;

      if (Object.keys(give.schedules).length) {
        action = schedule
      }

      // submit transaction
      try {
        yield cps(action, token, name)
      } catch (e) { error = e }

      // set error states
      if (error) {

        yield put(actions.error({ transaction: error }))

        // remove loading state
        yield put(actions.setState("error"))

      } else {

        // remove loading state
        yield put(actions.setState("success"))

        // if this was a named card (as in creating a saved account)
        // lets force and update of the payment cards and set it in the store
        if (name) {
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


function* submitPersonDetails(give, autoSubmit) {
  // personal info is ready to be submitted
  const formattedData = formatPersonDetails(give)

  // call the Meteor method to submit data to NMI
  const { url } = yield cps(order, formattedData)

  if (autoSubmit) {
    const response = yield fetch(give.url, {
      method: "POST",
      body: new FormData(),
      mode: "no-cors"
    })

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
    let { give } = getStore()


    if (step === 4 || (give.step - 1) === 2) {

      // set people data and store transaction id
      yield* submitPersonDetails(give, step === 4)


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
addSaga(function* recoverTransactions(){

  console.log("here", Meteor.userId())
  while (true) {
    const { authorized } = yield take("ONBOARD.IS_AUTHORIZED")
    console.log(authorized, "here again")

  }

})
