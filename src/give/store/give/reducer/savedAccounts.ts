import { assign } from "lodash";

const savedAccount = (state: any, action: any): any => {

  if (!action.savedAccount && action.savedAccount != "clear") {
    return state;
  }

  if (action.savedAccount === "clear") {
    action.savedAccount = {
      id: null, // Id of saved account to charge
      payment: {
        accountNumber: null, // accountNumber to be shown (full, not just last four)
        paymentType: null, // type of card
      },
      name: null, // name of card
    };
  }

  return assign(state, { savedAccount: action.savedAccount });
};

export {
  savedAccount
};
