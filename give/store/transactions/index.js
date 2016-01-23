
import { addReducer, createReducer } from "../../../core/store/utilities"


const initial = {
  transactions: {}
}

const reducer = createReducer(initial, {
  ["TRANSACTIONS.ADD"](state, action) {

    return {...state, ...{
      transactions: {...state.transactions, ...action.transactions}
    }}
  }
});

addReducer({
  transactions: reducer
})


export default {
  add: (transactions) => ({ type: "TRANSACTIONS.ADD", transactions })
}
