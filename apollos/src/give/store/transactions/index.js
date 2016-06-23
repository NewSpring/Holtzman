
import { addReducer, createReducer } from "../../../core/store/utilities"


const initial = {
  transactions: {},
  scheduledTransactions: {}
}

const reducer = createReducer(initial, {
  ["TRANSACTIONS.ADD"](state, action) {

    return {...state, ...{
      transactions: {...state.transactions, ...action.transactions}
    }}
  },
  ["TRANSACTIONS.ADD_SCHEDULE"](state, action) {

    return {...state, ...{
      scheduledTransactions: {...state.scheduledTransactions, ...action.scheduledTransactions}
    }}
  },
  ["TRANSACTIONS.REMOVE_SCHEDULE"](state, action) {
    let newState = {...state}
    if (newState.scheduledTransactions[action.id]) {
      delete newState.scheduledTransactions[action.id]
    }
    return {...state, ...{
      scheduledTransactions: newState
    }}
  },
  ["TRANSACTIONS.CLEAR"]() {
    return initial
  }
});

addReducer({
  transactions: reducer
})


export default {
  add: (transactions) => ({ type: "TRANSACTIONS.ADD", transactions }),
  addSchedule: (scheduledTransactions) => ({ type: "TRANSACTIONS.ADD_SCHEDULE", scheduledTransactions }),
  removeSchedule: (id) => ({ type: "TRANSACTIONS.REMOVE_SCHEDULE", id }),
  clearData: () => ({ type: "TRANSACTIONS.CLEAR" })
}
