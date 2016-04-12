/*


  Giving workflows state


*/
import { assign } from "lodash";

import { State, createReducer } from "../../../../core/store";
import types from "../types";

import { progress } from "./progress";
import { savedAccount } from "./savedAccounts";

import { addTransaction, clearTransaction, clearTransactions } from "./transactions";

import {
  setRecoverableSchedule,
  deleteRecoverableSchedule,
  setRecoverableSchedules,
  deleteRecoverableSchedules,
} from "./scheduledTransactions";

export interface GiveState {
  step: number;
  transactionType: string;
  url: string;
  total: number;
  state: string;
  attempts: number;
  reminderDate: string;
  accounts: { [key: number]: Account }
  savedAccount: SavedAccount;
  transactions: { [key: number]: Transaction }
  schedules: { [key: number]: Schedule }
  scheduleToRecover: boolean;
  recoverableSchedules: any; //XXX Fix this
  data: PersonalInformation;
  errors: { [key: number]: Notification }
  success: { [key: number]: Notification }
}

export interface SavedAccount {
  id: number;
  payment: PaymentInfo;
  name: string;
}

export interface Notification {
  message: string
}

export interface PaymentInfo {
  accountNumber: number;
  paymentType: string;
}

export interface Transaction {
  id: number;
  accountId: number;
  amount: number;
}

export interface Account {
  id: number;
  name: string;
}

export interface Schedule {
  id: number;
  start: string;
  payments: string;
  frequency: string;
}

export interface PersonalInformation {
  personal: {
    firstName: string; // String
    lastName: string;
    email: string; // String
    campus: string; // String
  },
  billing: {
    streetAddress: string; // String
    streetAddress2: string; // String
    city: string;
    state: string; // String
    zip: number; // Number
    country: string; // String
  },
  payment: {
    name: string;
    type: string;
    cardNumber: number;
    expiration: string;
    ccv: number;
    account: string;
    routing: string;
  }
};

const initial: GiveState = {
  step: 1, // Number (step along in progress bar to show)
  transactionType: "default", // "default", "guest", "recurring"
  url: "", // String representing the endpoint with NMI to submit to
  total: 0, // Number > 0 for allowing to move forward (calculated)
  state: "default", // "default", "loading", "submit", "error", "success"
  attempts: 0, // spam protection (auto calculated)
  reminderDate: null, // Date string for the next reminder

  savedAccount: {
    id: null, // Id of saved account to charge
    payment: {
      accountNumber: null, // accountNumber to be shown (full, not just last four)
      paymentType: null, // type of card
    },
    name: null, // name of card
  },

  errors: {
    // <id>: {
    //  message
    //  }
  },
  success: {
    // <id>: {
    //  message
    //  }
  },

  accounts: {
    // <id> : { (in Rock if it exists), otherwise fund id
    //   name: string,  Date (YYYYMMDD),
    //   id: number
    // }
  },

  // transaction data
  transactions: {
    // <accountId>: Number
    // <amount>: $ of gift
  },

  // schedules to create
  schedules: {
    // <id> : { (in Rock if it exists), otherwise fund id
    //   start: null,  Date (YYYYMMDD),
    //   payments: null,  future feature for pledges
    //   frequency: null  String of value from Rock
    // }
  },

  scheduleToRecover: null,
  recoverableSchedules: {

  },

  // form data
  data: {
    personal: {
      firstName: null, // String
      lastName: null, // String
      email: null, // String
      campus: null, // String
    },
    billing: {
      streetAddress: null, // String
      streetAddress2: null, // String
      city: null, // String
      state: null, // String
      zip: null, // Number
      country: null, // String
    },
    payment: {
      name: null,
      type: "cc", // String ach or cc
      cardNumber: null, // Number
      expiration: null, // String
      ccv: null, // Number
      account: null, // String (for safety with international numbers)
      routing: null // String (for safety with international numbers)
    }
  },
}

export default createReducer(initial, {

  [types.SET_PROGRESS]: progress,

  [types.SET_SAVED_ACCOUNT]: savedAccount,

  [types.ADD_TRANSACTION]: addTransaction,
  [types.CLEAR_TRANSACTION]: clearTransaction,
  [types.CLEAR_TRANSACTIONS]: clearTransactions,

  [types.SET_RECOVERABLE_SCHEDULE]: setRecoverableSchedule,
  [types.DELETE_RECOVERABLE_SCHEDULE]: deleteRecoverableSchedule,

  [types.SET_RECOVERABLE_SCHEDULES]: setRecoverableSchedules,
  [types.DELETE_RECOVERABLE_SCHEDULES]: deleteRecoverableSchedules,

  [types.SAVE_DATA]: (state: GiveState, action: any): GiveState => {
    return assign( state, {
    data: {
      personal: assign( state.data.personal, action.data.personal),
      billings: assign( state.data.billing, action.data.billing ),
      payment: assign( state.data.payment, action.data.payment )
      }
    }) as GiveState;
  },

  [types.REMOVE_DATA]: (state: GiveState, action: any): GiveState => {

    if (!action.field || !state.data[action.level] || !state.data[action.level][action.field]) {
      return state
    }

    return assign( state, { data: assign( state.data, { [action.level]: assign (state.data[action.level], { [action.field]: null })})}) as GiveState;
  },

  [types.CLEAR_DATA]: (state: GiveState): GiveState => {
    return assign(state, {
      step: initial.step,
      total: initial.total,
      transactions: initial.transactions,
      schedules: initial.schedules,
      url: initial.url,
      data: initial.data,
      success: initial.success,
      state: initial.state,
      errors: initial.errors
    }) as GiveState;
  },
  [types.SAVE_SCHEDULE_DATA]: (state: GiveState, action: any): GiveState => {

    if (!action.id) {
      return state
    }

    let newState = assign(state);

    if (newState.schedules[action.id]) {
      newState.schedules[action.id] = assign(newState.schedules[action.id], action.schedule) as Schedule;
    } else {
      newState.schedules[action.id] = action.schedule
    }

    // @TODO validation on new data
    return newState as GiveState;
  },
  [types.REMOVE_SCHEDULE]: (state: GiveState, action: any): GiveState => {

    if (!action.id) {
      return state
    }

    let newState = assign(state);

    delete newState.schedules[action.id]

    // @TODO validation on new data
    return assign(state, newState) as GiveState;
  },
  // XXX Fix and uncomment
  // [types.REMOVE_SCHEDULE_DATA]: (state: GiveState, action: any): GiveState => {

  //   if (!action.field || !action.id) {
  //     return state
  //   }

  //   console.log("schedule", state.schedules[action.field]);

  //   return assign(state, { schedules: assign( state.schedules, { [action.id]: assign(state.schedules[action.id], { [state.schedules[action.field]]: null })})}) as GiveState;
  // },

  [types.CLEAR_SCHEDULES]: (state: GiveState, action: any): GiveState => {
    return assign(state, { schedules: {} }) as GiveState;
  },

  [types.CLEAR_SCHEDULES_EXCEPT]: (state: GiveState, action: any): GiveState => {
    let newState = assign(state);

    if (newState.schedules[action.id]) {
      for (let schedule in newState.schedules){
        if (Number(newState.schedules[schedule].id) === Number(action.id)) {
          continue
        }

        delete newState.schedules[schedule]
      }
    }

    return newState as GiveState;
  },

  [types.SET_STATE]: (state: GiveState, action: any): GiveState => {

    const stateName = action.state.trim()
    const stateTypes = [ "default", "loading", "submit", "error", "success"]

    if (stateTypes.indexOf(stateName) === -1) {
      return state
    }

    return assign(state, { state: stateName }) as GiveState;
  },

  [types.SET_ERROR]: (state: GiveState, action: any): GiveState => {

    if (!action.error) {
      return state;
    }

    return assign(state, { errors: assign( state.errors, action.errors ) }) as GiveState;
  },

  [types.REMOVE_ERROR]: (state: GiveState, action: any): GiveState => {

    if (!action.error || !state.errors[action.error]) {
      return state;
    }

    const errors = assign(state.errors);
    delete errors[action.error];

    // update the state
    return assign(state, { errors: errors }) as GiveState;
  },

  [types.SET_ERRORS]: (state: GiveState, action: any): GiveState => {

    return assign( state, { errors: assign( state.errors, action.errors )}) as GiveState;
  },

  [types.SET_ACCOUNTS]: (state: GiveState, action: any): GiveState => {

    return assign( state, { accounts: assign( state.accounts, action.accounts )}) as GiveState;
  },

  [types.SET_TRANSACTION_TYPE]: (state: GiveState, action: any): GiveState => {

    return assign( state, { transactionTypes: action.transactionType }) as GiveState;
  },

  [types.SET_TRANSACTION_DETAILS]: (state: GiveState, action: any): GiveState => {

    return assign( state, { url: action.url }) as GiveState;
  },

  [types.SET_REMINDER_DATE]: (state: GiveState, action: any): GiveState => {

    return assign( state, { reminderDate: action.reminderDate }) as GiveState;
  },
});
