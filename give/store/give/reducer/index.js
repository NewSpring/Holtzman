/*


  Onboarding workflow state managment


*/
import { createReducer } from "../../../../core/store"
import types from "../types"

import { progress, step } from "./progress"
import { savedAccount } from "./savedAccounts"
import { addTransaction, clearTransactions } from "./transactions"

const initial = {

  step: 1, // Number (step along in progress bar to show)
  savedAccount: null, // Id of saved account to charge
  transactionType: "default", // "default", "guest", "recurring"

  total: 0, // Number > 0 for allowing to move forward (calculated)

  accounts: {
    // <accountId>: Name
  },

  // transaction data
  transactions: {
    // <accountId>: Number // <accountId>: $ of gift
  },

  // schedule data
  schedule: {
    start: null, // Date (YYYYMMDD),
    payments: null, // future feature for pledges
    frequency: null // String of value from Rock
  },

  // form data
  data: {
    personal: {
      firstName: null, // String
      lastName: null, // String
      email: null, // String
      campus: null // String
    },
    billing: {
      streetAddress: null, // String
      streetAddress2: null, // String
      city: null, // String
      state: null, // String
      zip: null // Number
    },
    payment: {
      name: null,
      type: "ach", // String ach or cc
      cardNumber: null, // Number
      expiration: null, // String
      ccv: null, // Number
      account: null, // String (for safety with international numbers)
      routing: null // String (for safety with international numbers)
    }
  },

  // action data
  success: false,
  state: "default", // "submit", "loading"
  attempts: 0,
  errors: {
    // <id>: {
    //   message: "Card is declined"
    // }
  }

}

export default createReducer(initial, {

  [types.SET_PROGRESS]: progress,
  [types.STEP_PROGRESS]: step,

  [types.SET_SAVED_ACCOUNT]: savedAccount,

  [types.ADD_TRANSACTION]: addTransaction,
  [types.CLEAR_TRANSACTIONS]: clearTransactions,

  [types.SAVE_DATA](state, action) {

    // @TODO validation on new data
    return { ...state, ...{
      data: {
        personal: { ...state.data.personal, ...action.data.personal },
        billing: { ...state.data.billing, ...action.data.billing },
        payment: { ...state.data.payment, ...action.data.payment }
      }
    } }
  },

  [types.REMOVE_DATA](state, action) {

    if (!action.field || !state.data[action.level] || !state.data[action.level][action.field]) {
      return state
    }

    return { ...state, ...{
      data: { ...state.data, ...{
        [state.data[action.level]]: { ...state.data[action.level], ...{
          [state.data[action.level][action.feild]]: null
        } }
      } }
    } }
  },

  [types.CLEAR_DATA](state) {

    return {...state, ...{
      step: initial.step,
      total: initial.total,
      transactions: initial.transactions,
      schedule: initial.schedule,
      data: initial.data,
      success: initial.success,
      state: initial.state,
      errors: initial.errors
    } }
  },

  [types.SAVE_SCHEDULE_DATA](state, action) {

    // @TODO validation on new data
    return { ...state, ...{
      schedule: { ...state.schedule, ...action.schedule }
    } }
  },

  [types.REMOVE_SCHEDULE_DATA](state, action) {

    if (!action.field) {
      return state
    }

    return { ...state, ...{
      schedule: { ...state.schedule, ...{
        [state.schedule[action.field]]: initial.schedule[action.field]
      } }
    } }
  },

  [types.SET_STATE](state, action) {

    const stateName = action.state.trim()
    const stateTypes = [ "default", "loading", "submit" ]

    if (stateTypes.indexOf(stateName) === -1) {
      return state
    }

    return { ...state, ...{
      state: stateName
    } }

  },

  [types.SET_ERROR](state, action) {

    if (!action.error) {
      return state
    }

    return { ...state, ...{
      errors: { ...state.errors, ...action.error }
    } }

  },

  [types.REMOVE_ERROR](state, action) {

    if (!action.error || !state.errors[action.error]) {
      return state
    }

    const errors = { ...state.errors }

    delete errors[action.error]

    // update the state
    return { ...state, ...{
      errors: errors
    } }

  },

  [types.SET_ERRORS](state, action) {

    return { ...state, ...{
      errors: { ...state.errors, ...action.errors }
    } }

  },

  [types.SET_SUCCESS](state, action) {

    if (typeof action.success != "boolean") {
      return state
    }

    return { ...state, ...{
      success: action.success
    } }

  },

  [types.SET_ACCOUNTS](state, action) {

    return { ...state, ... {
      accounts: {...state.accounts, ...action.accounts}
    }}
  },

  [types.SET_TRANSACTION_TYPE](state, action) {

    return { ...state, ... {
      transactionType: action.transactionType
    }}
  }


})
