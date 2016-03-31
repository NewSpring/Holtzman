/// <reference path="../../../../typings/main.d.ts" />

import * as chai from "chai";
import { shallow, ShallowWrapper } from "enzyme";

declare function require(name: string);
const chaiEnzyme = require("chai-enzyme");

chai.use(chaiEnzyme()) // Note the invocation at the end
import Spinner from "./../../../../src/core/components/loading/Spinner";

describe("Regex defaults", () => {

 it("true is true", () => {
    chai.expect(true).to.equal(true);
  });
});
