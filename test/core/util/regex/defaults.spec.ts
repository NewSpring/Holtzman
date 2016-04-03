/// <reference path="../../../../typings/main.d.ts" />

import * as chai from "chai";
import { shallow, ShallowWrapper } from "enzyme";

declare function require(name: string);
const chaiEnzyme = require("chai-enzyme");

chai.use(chaiEnzyme()) // Note the invocation at the end
import RegExpMap from "./../../../../src/core/util/regex/defaults";

describe("Regex defaults", () => {

  it("has all the regexs", () => {
    let answerKey = {
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
      startOfDiscover: /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$/
    };
    
    for(var k in answerKey) {
      chai.expect(RegExpMap[k]).to.not.be.null;
    }
  });
});
