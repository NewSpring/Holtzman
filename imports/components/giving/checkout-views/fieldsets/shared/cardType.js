// @flow
const cardType = (payment: Object, savedAccount?: Object): string | null => {
  if (savedAccount && savedAccount.payment && savedAccount.payment.paymentType) {
    return savedAccount.payment.paymentType;
  }

  if (payment.type === "ach") return "Bank";

  if (payment.type === "cc") {
    const d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$/gmi;

    const defaultRegex = {
      Visa: /^4[0-9]{0,15}$/gmi,
      MasterCard: /^5$|^5[1-5][0-9]{0,14}$/gmi,
      AmEx: /^3$|^3[47][0-9]{0,13}$/gmi,
      Discover: d,
    };

    let result;
    Object.keys(defaultRegex).map(regex => {
      if (defaultRegex[regex].test(payment.cardNumber.replace(/-/gmi, ""))) {
        result = regex;
      }
      return null;
    });
    if (result) return result;
  }

  return null;
};

export default cardType;
