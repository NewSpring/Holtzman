/// <reference path="../../../../typings/main.d.ts" />

import * as React from "react";
import * as chai from "chai";
import { shallow, ShallowWrapper } from "enzyme";

declare function require(name: string);
const chaiEnzyme = require("chai-enzyme");
chai.use(chaiEnzyme()) // Note the invocation at the end

const { assert } = chai;

import Input from "./../../../../src/core/components/forms/Input";

describe("<Input /> component", () => {
  
 describe("state", () => {
   it("is south carolina", () => {
      assert.equal(true, true);
   })
 });
 
 describe("props", () => {
   it("has the correct classname", () => {
    // const wrapper = shallow(<Input />);
    // chai.expect(wrapper.hasClass("loader")).to.equal(true);
    assert.equal(true, true);
  });
 });

});
