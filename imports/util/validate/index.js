import { creditCVV, creditCard, creditExpiry } from "./credit-card";
import { zipCode, locationBasedZipCode } from "./zipcode";

const Validate = {};

// XXX deprecated loading method
Validate.addValidator = (name, handler) => {
  if (Validate[name]) {
    throw new Error("Validator assigned", `Validate function ${name} is already registered`);
  }

  if (!handler || typeof handler !== "function") {
    throw new Error("Validator TypeError", `Validator ${name} requires a function`);
  }

  Validate[name] = handler;
  return { [name]: handler };
};

Validate.addValidator("isCCV", creditCVV);
Validate.addValidator("isCreditCard", creditCard);
Validate.addValidator("isExpiry", creditExpiry);
Validate.addValidator("isZipCode", zipCode);
Validate.addValidator("isLocationBasedZipCode", locationBasedZipCode);

export default Validate;
