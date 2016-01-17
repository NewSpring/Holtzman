
const Regex = {}
import Format from "../format"
import Validate from "../validate"
import Error from "../error"
import defaultRegex from "./defaults"

Regex.addRegex = (name, test, validate) => {

  if (Regex[name]) {
    throw new Error(
      "Regex assigned",
      `Regex ${name} is already registered`
    )
  }

  if (!test || !test instanceof RegExp) {
    throw new Error(
      "Regex TypeError",
      `Regexter ${name} requires a regex`
    )
  }

  Regex[name] = test

  if (validate) {
    const funcName = `is${Format.capitalize(name)}`

    Validate.addValidator(funcName, (str) => { return test.test(str) })
  }
  return

}

/*

  Defualt regexes

*/
// such a long regex


for (let name in defaultRegex) {
  const _regex = defaultRegex[name]

  Regex.addRegex(name, _regex, true)
}

export { defaultRegex }
export default Regex
