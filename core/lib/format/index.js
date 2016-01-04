
let Format = {}
import Error from "../error"


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

  Format[name] = handler
  return { [name]: handler }

}

import { capitalize } from "./strings"
Format.addFormat("capitalize", capitalize)

import { toCurrency } from "./currency"
Format.addFormat("toCurrency", toCurrency)

import { toDateString } from "./dates"
Format.addFormat("toDateString", toDateString)

import { creditCard } from "./credit-card"
Format.addFormat("creditCard", creditCard)


export default Format
