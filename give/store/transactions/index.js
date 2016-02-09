
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
  }
});

addReducer({
  transactions: reducer
})


export default {
  add: (transactions) => ({ type: "TRANSACTIONS.ADD", transactions }),
  addSchedule: (scheduledTransactions) => ({ type: "TRANSACTIONS.ADD_SCHEDULE", scheduledTransactions })

}
