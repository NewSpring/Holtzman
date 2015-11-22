
const Format = {};
import { Error } from "../util"


Format.addFormat = (name, handler) => {

  if (Format[name]) {
    throw new Error(
      "Formatter assigned",
      `Format function ${name} is already registered`
    )
  }

  if (!handler || typeof(handler) != "function") {
    throw new Error(
      "Formatter TypeError",
      `Formatter ${name} requires a function`
    )
  }

  Format[name] = handler;
  return;

}


import { toCurrency } from "./currency.js"
Format.addFormat("toCurrency", toCurrency)


import { toDateString } from "./dates"
Format.addFormat("toDateString", toDateString)


export default Format
