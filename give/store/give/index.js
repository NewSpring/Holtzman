/*

  Give action types

*/
import types from "./types"
import reducer from "./reducer"
import { addReducer } from "../../../core/store"

addReducer({
  give: reducer
})


export default {
  types,

  setProgress: (step) => ({ type: types.SET_PROGRESS, step }),
  next: () => ({ type: types.STEP_PROGRESS, increment: 1 }),
  previous: () => ({ type: types.STEP_PROGRESS, increment: -1 }),

  setAccount: (savedAccount) => ({ type: types.SET_SAVED_ACCOUNT, savedAccount }),
  clearAccount: () => ({ type: types.SET_SAVED_ACCOUNT, savedAccount: null }),

  setAccounts: (accounts) => ({ type: types.SET_ACCOUNTS, accounts }),

  setTransactionType: (transactionType) => ({ type: types.SET_TRANSACTION_TYPE, transactionType }),

  addTransactions: (transactions) => ({ type: types.ADD_TRANSACTION, transactions }),
  clearTransaction: (transactionId) => ({ type: types.CLEAR_TRANSACTION, transactionId }),
  clearTransactions: () => ({ type: types.CLEAR_TRANSACTIONS }),

  save: (data) => ({ type: types.SAVE_DATA, data }),
  clear: (level, field) => ({ type: types.REMOVE_DATA, level, field }),
  clearData: () => ({ type: types.CLEAR_DATA }),

  saveSchedule: (schedule) => ({ type: types.SAVE_SCHEDULE_DATA, schedule }),
  clearSchedule: (field) => ({ type: types.REMOVE_SCHEDULE_DATA, field }),

  setState: (state) => ({ type: types.SET_STATE, state }),
  submit: () => ({ type: types.SET_STATE, state: "submit" }),
  loading: () => ({ type: types.SET_STATE, state: "loading" }),

  error: (error) => ({ type: types.SET_ERROR, error }),
  fix: (error) => ({ type: types.REMOVE_ERROR, error }),

  reset: () => ({ type: types.SET_ERRORS, errors: {} }),
  setErrors: (errors) => ({ type: types.SET_ERRORS, errors }),

  success: () => ({ type: types.SET_SUCCESS, success: true }),
  fail: () => ({ type: types.SET_SUCCESS, success: false })


}
