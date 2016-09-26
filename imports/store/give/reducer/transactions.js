
const addTransaction = (state, action) => {
  let total = 0;

  const mergedTransactions = { ...state.transactions, ...action.transactions };

  // eslint-disable-next-line no-restricted-syntax
  for (const fund in mergedTransactions) {
    if (typeof mergedTransactions[fund].value !== "number") {
      delete mergedTransactions[fund];
    }

    total += mergedTransactions[fund].value;
  }

  return { ...state,
    ...{
      transactions: mergedTransactions,
      total,
    },
  };
};

const clearTransaction = (state, action) => {
  let total = 0;

  if (!action.transactionId || !state.transactions[action.transactionId]) {
    return state;
  }

  // eslint-disable-next-line no-param-reassign
  delete state.transactions[action.transactionId];

  // eslint-disable-next-line no-restricted-syntax
  for (const fund in state.transactions) {
    if (typeof state.transactions[fund].value !== "number") {
      // eslint-disable-next-line no-param-reassign
      delete state.transactions[fund];
    }

    total += state.transactions[fund].value;
  }

  return { ...state,
    ...{
      transactions: state.transactions,
      total,
    },
  };
};

const clearTransactions = (state) => (
  { ...state,
    ...{
      total: 0,
      transactions: {},
    },
  }
);

export {
  addTransaction,
  clearTransaction,
  clearTransactions,
};
