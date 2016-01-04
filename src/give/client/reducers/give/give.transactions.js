
const addTransaction = (state, action) => {

  let total = 0

  let mergedTransactions = { ...state.transactions, ...action.transactions }

  for (let fund in mergedTransactions) {
    if (typeof mergedTransactions[fund].value != 'number') {
      delete mergedTransactions[fund]
    }

    total = total + mergedTransactions[fund].value
  }

  return { ...state, ...{
    transactions: mergedTransactions,
    total: total
  } }
}

const clearTransaction = (state, action) => {

  let total = 0

  if (!action.transactionId || !state.transactions[action.transactionId]) {
    return state
  }

  delete state.transactions[action.transactionId]

  for (let fund in state.transactions) {
    if (typeof state.transactions[fund].value != 'number') {
      delete state.transactions[fund]
    }

    total = total + state.transactions[fund].value
  }

  return { ...state, ...{
    transactions: state.transactions,
    total: total
  } }
}

const clearTransactions = (state) => {

  return { ...state, ...{
    total: 0,
    transactions: {}
  } }
}

export default {
  addTransaction,
  clearTransaction,
  clearTransactions
}
