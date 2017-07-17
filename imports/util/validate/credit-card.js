import moment from "moment";
import defaultRegex from "../regex/defaults";

const creditCard = (value) => {
  const replaceValue = value.replace(/-/g, "");

  if (defaultRegex.startOfVisa.test(replaceValue)) {
    const regex = /^4[0-9]{12}(?:[0-9]{3})?$/;

    return regex.test(replaceValue);
  } else if (defaultRegex.startOfMastercard.test(replaceValue)) {
    const regex = /^5[1-5][0-9]{14}$/;
    return regex.test(replaceValue);
  } else if (defaultRegex.startOfAmEx.test(replaceValue)) {
    const regex = /^3[47][0-9]{13}$/;
    return regex.test(replaceValue);
  } else if (defaultRegex.startOfDiscover.test(replaceValue)) {
    const regex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    return regex.test(replaceValue);
  }
  return false;
};

const creditExpiry = (value) => {
  let d;

  if (value.length <= 3) {
    d = value.replace(/\D/g, "");
    d = moment(value, "MM");
  } else {
    d = moment(value, "MM/YY");
    if (d.isBefore(moment().subtract(1, "month")) || d.isAfter(moment().add(15, "years"))) {
      return false;
    }
  }

  if (d == null || !d.isValid()) return false;
  return true;
};

const creditCVV = (value) => {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(value);
};

export { creditCard, creditExpiry, creditCVV };
