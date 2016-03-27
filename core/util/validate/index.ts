import { creditCVV, creditCard, creditExpiry } from "./credit-card"

const Validate : any = {}
import Error from "../error"

Validate.addValidator = (name : string, handler : Function) : Object => {

  if (Validate[name]) {
    throw Error(
      "Validator assigned",
      `Validate function ${name} is already registered`
    )
  }

  if (!handler || typeof(handler) != "function") {
    throw Error(
      "Validator TypeError",
      `Validator ${name} requires a function`
    )
  }

  Validate[name] = handler
  return { [name]: handler }
}


Validate.addValidator("isCCV", creditCVV)
Validate.addValidator("isCreditCard", creditCard)
Validate.addValidator("isExpiry", creditExpiry)

export default Validate
