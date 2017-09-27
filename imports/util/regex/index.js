
import { capitalize } from "../format";
import Validate from "../validate";
import defaultRegex from "./defaults";

const Regex = {};

// XXX refactor this
Regex.addRegex = (name, test, validate) => {
  if (Regex[name]) {
    throw new Error(
      "Regex assigned",
      `Regex ${name} is already registered`
    );
  }

  if (!test || !(test instanceof RegExp)) {
    throw new Error(
      "Regex TypeError",
      `Regexter ${name} requires a regex`
    );
  }

  Regex[name] = test;

  if (validate) {
    const funcName = `is${capitalize(name)}`;
    Validate.addValidator(funcName, str => (test.test(str)));
  }
  return;
};

/*

  Defualt regexes

*/
// such a long regex

// eslint-disable-next-line
for (const name in defaultRegex) {
  const regex = defaultRegex[name];
  Regex.addRegex(name, regex, true);
}

export { defaultRegex };
export default Regex;
