
const Validate = {};
import Error from "../error"


Validate.addValidator = (name, handler) => {

  if (Validate[name]) {
    throw new Error(
      "Validator assigned",
      `Validate function ${name} is already registered`
    )
  }

  if (!handler || typeof(handler) != "function") {
    throw new Error(
      "Validator TypeError",
      `Validator ${name} requires a function`
    )
  }

  Validate[name] = handler;
  return;

}


export default Validate
