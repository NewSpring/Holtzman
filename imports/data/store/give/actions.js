import types from "./types";

export default {
  types,

  setProgress: step => ({ type: types.SET_PROGRESS, step }),
  next: () => ({ type: types.SET_PROGRESS, increment: 1 }),
  previous: () => ({ type: types.SET_PROGRESS, increment: -1 }),

  setAccount: savedAccount => ({ type: types.SET_SAVED_ACCOUNT, savedAccount }),
  clearAccount: () => ({ type: types.SET_SAVED_ACCOUNT, savedAccount: "clear" }),

  setAccounts: accounts => ({ type: types.SET_ACCOUNTS, accounts }),

  setTransactionType: transactionType => ({ type: types.SET_TRANSACTION_TYPE, transactionType }),

  addTransactions: transactions => ({ type: types.ADD_TRANSACTION, transactions }),
  clearTransaction: transactionId => ({ type: types.CLEAR_TRANSACTION, transactionId }),
  clearTransactions: () => ({ type: types.CLEAR_TRANSACTIONS }),

  save: data => ({ type: types.SAVE_DATA, data }),
  clear: (level, field) => ({ type: types.REMOVE_DATA, level, field }),
  clearData: () => ({ type: types.CLEAR_DATA }),

  setRecoverableSchedule: recoverableSchedule => ({
    type: types.SET_RECOVERABLE_SCHEDULE,
    recoverableSchedule,
  }),

  saveSchedules: recoverableSchedules => ({
    type: types.SET_RECOVERABLE_SCHEDULES,
    recoverableSchedules,
  }),
  deleteSchedule: id => ({ type: types.DELETE_RECOVERABLE_SCHEDULE, id }),
  deleteRecoverableSchedules: id => ({ type: types.DELETE_RECOVERABLE_SCHEDULES, id }),


  saveSchedule: schedule => ({ type: types.SAVE_SCHEDULE_DATA, schedule }),
  removeSchedule: id => ({ type: types.REMOVE_SCHEDULE, id }),
  clearSchedule: field => ({ type: types.REMOVE_SCHEDULE_DATA, field }),
  clearSchedules: () => ({ type: types.CLEAR_SCHEDULES }),
  clearAllSchedulesExcept: id => ({ type: types.CLEAR_SCHEDULES_EXCEPT, id }),


  setState: state => ({ type: types.SET_STATE, state }),
  submit: () => ({ type: types.SET_STATE, state: "submit" }),
  loading: () => ({ type: types.SET_STATE, state: "loading" }),

  error: error => ({ type: types.SET_ERROR, error }),
  fix: error => ({ type: types.REMOVE_ERROR, error }),

  reset: () => ({ type: types.SET_ERRORS, errors: {} }),
  setErrors: errors => ({ type: types.SET_ERRORS, errors }),

  setDetails: url => ({ type: types.SET_TRANSACTION_DETAILS, url }),

  setReminder: reminderDate => ({ type: types.SET_REMINDER_DATE, reminderDate }),
  setUserId: userId => ({ type: types.SET_USERID, userId }),

};
