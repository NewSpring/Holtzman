// XXX How do I include GiveState here?

import { assign } from "lodash";

const addTransaction = (state: any, action: any): any => {

  let total = 0;

  let mergedTransactions = assign(state.transactions, action.transactions);

  for (let fund in mergedTransactions) {
    if (typeof mergedTransactions[fund].value != "number") {
      delete mergedTransactions[fund];
    }

    total = total + mergedTransactions[fund].value;
  }

  return assign(state, { transactions: mergedTransactions, total: total });
}

const clearTransaction = (state: any, action: any): any => {

  let total = 0;

  // console.log(action.transactionId, state.transactions)
  if (!action.transactionId || !state.transactions[action.transactionId]) {
    return state;
  }

  delete state.transactions[action.transactionId];

  for (let fund in state.transactions) {
    if (typeof state.transactions[fund].value != "number") {
      delete state.transactions[fund];
    }

    total = total + state.transactions[fund].value;
  }

  return assign(state, { transactions: state.transactions, total: total });
}

const clearTransactions = (state: any): any => {
  return assign(state, { total: 0, transactions: {} });
}

export {
  addTransaction,
  clearTransaction,
  clearTransactions
};
