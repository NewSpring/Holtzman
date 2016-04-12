
import { assign } from "lodash";
import { addReducer, createReducer } from "../../../core/store/utilities";

export interface TransactionState {
  transactions: any;
  scheduledTransactions: any;
};

const initial: TransactionState = {
  transactions: {},
  scheduledTransactions: {}
};

const reducer = createReducer(initial, {
  ["TRANSACTIONS.ADD"]: (state: TransactionState, action: any): TransactionState => {
    return assign(state, { transactions: assign( state.transactions, action.transactions )}) as TransactionState;
  },
  ["TRANSACTIONS.ADD_SCHEDULE"]: (state: TransactionState, action: any): TransactionState => {
    return assign(state, { scheduledTransactions: assign( state.scheduledTransactions, action.scheduledTransactions )}) as TransactionState;
  },
  ["TRANSACTIONS.REMOVE_SCHEDULE"]: (state: TransactionState, action: any): TransactionState => {
    let newState = assign( state );

    if (newState.scheduledTransactions[action.id]) {
      delete newState.scheduledTransactions[action.id];
    }

    return assign(state, { scheduledTransactions: newState }) as TransactionState;
  }
});

addReducer({
  transactions: reducer
});

export default {
  add: (transactions) => ({ type: "TRANSACTIONS.ADD", transactions }),
  addSchedule: (scheduledTransactions) => ({ type: "TRANSACTIONS.ADD_SCHEDULE", scheduledTransactions }),
  removeSchedule: (id) => ({ type: "TRANSACTIONS.REMOVE_SCHEDULE", id }),
};
