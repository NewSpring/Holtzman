
import { types } from "../../actions/give"


const addTransaction = (state, action) => {
  return {...state, ...{
    transaction: {...state.transaction, ...action.transaction}
  }}
}

const clearTransactions = (state, action) => {

  return {...state, ...{
    transaction: {
      total: 0,
      funds: {}
    }
  }}
}

export default {
  addTransaction,
  clearTransactions
}
