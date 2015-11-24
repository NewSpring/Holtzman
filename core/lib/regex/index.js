
const Regex = {};
import Format from "../format"
import Validate from "../validate"
import Error from "../error"


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

  Regex[name] = test;

  if (validate) {
    const funcName = `is${Format.capitalize(name)}`;
    Validate.addValidator(funcName, (str) => {
      return test.test(str);
    });
  }
  return;

}

/*

  Defualt regexes

*/
// such a long regex
const d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$/

const defaultRegex = {
  email: /[\w\.\'_%-]+(\+[\w-]*)?@([\w-]+\.)+[\w-]+/,
  bcrypt: /^\$2a\$10\$[\/\.a-zA-Z0-9]{53}$/,
  phoneNumber: /^[1-9]([0-9]{6}|[0-9]{9})$/,
  guid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$/,
  americanExpress: /^3[47][0-9]{13}$/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  startOfVisa: /^4[0-9]{0,15}$/,
  startOfMastercard: /^5$|^5[1-5][0-9]{0,14}$/,
  startOfAmEx: /^3$|^3[47][0-9]{0,13}$/,
  startOfDiscover: d
}

for (let name in defaultRegex) {
  const _regex = defaultRegex[name];

  Regex.addRegex(name, _regex, true);
}

export default Regex
