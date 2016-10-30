

const savedAccount = (state, action) => {
  // XXX this will never work?
  if (!action.savedAccount && action.savedAccount !== "clear") {
    return state;
  }

  if (action.savedAccount === "clear") {
    // eslint-disable-next-line no-param-reassign
    action.savedAccount = {
      id: null, // Id of saved account to charge
      payment: {
        accountNumber: null, // accountNumber to be shown (full, not just last four)
        paymentType: null, // type of card
      },
      name: null, // name of card
    };
  }

  return { ...state,
    ...{
      savedAccount: action.savedAccount,
    },
  };
};

export default savedAccount;
