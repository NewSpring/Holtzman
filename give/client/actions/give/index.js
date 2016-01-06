/*

  Give action types

*/

const types = {
  SET_PROGRESS: "GIVE.SET_PROGRESS",
  STEP_PROGRESS: "GIVE.STEP_PROGRESS",

  SET_SAVED_ACCOUNT: "GIVE.SET_SAVED_ACCOUNT",

  ADD_TRANSACTION: "GIVE.ADD_TRANSACTION",
  CLEAR_TRANSACTION: "GIVE.CLEAR_TRANSACTION",
  CLEAR_TRANSACTIONS: "GIVE.CLEAR_TRANSACTIONS",

  SAVE_DATA: "GIVE.SAVE_DATA",
  REMOVE_DATA: "GIVE.REMOVE_DATA",
  CLEAR_DATA: "GIVE.CLEAR_DATA",

  SAVE_SCHEDULE_DATA: "GIVE.SAVE_SCHEDULE_DATA",
  REMOVE_SCHEDULE_DATA: "GIVE.REMOVE_SCHEDULE_DATA",

  SET_STATE: "GIVE.SET_STATE",
  SET_ERROR: "GIVE.SET_ERROR",

  REMOVE_ERROR: "GIVE.REMOVE_ERROR",
  SET_ERRORS: "GIVE.SET_ERRORS",

  SET_SUCCESS: "GIVE.SET_SUCCESS",

  SET_ACCOUNTS: "GIVE.SET_ACCOUNTS",

  SET_TRANSACTION_TYPE: "GIVE.SET_TRANSACTION_TYPE"
}

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
