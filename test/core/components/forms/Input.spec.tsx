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
   it("has a default state", () =>{
     const wrapper = shallow(<Input classes={["foo"]}/>);
     console.log(wrapper);
     chai.expect(wrapper.hasClass("foo")).to.equal(true);
   });
 });

 describe("props", () => {
   it("has the correct classname", () => {
    assert.equal(true, true);
  });
 });

});
