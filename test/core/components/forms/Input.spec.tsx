
import * as React from "react";
import * as chai from "chai";
import { shallow, ShallowWrapper } from "enzyme";

declare function require(name: string);
const chaiEnzyme = require("chai-enzyme");
chai.use(chaiEnzyme()) // Note the invocation at the end
const { expect } = chai;

import Input from "./../../../../src/core/components/forms/Input";

describe("<Input /> component", () => {

 describe("state", () => {
   it("has a default state", () =>{
     const wrapper = shallow(<Input />);
     expect(wrapper.state()).to.deep.equal({
       active: false,
       focused: false,
       error: false,
       status: "",
       value: null,
     });
   });

   it("has an active state if a default value is passed", () =>{
     const wrapper = shallow(<Input defaultValue="test" />);
     expect(wrapper.state().active).to.equal(true);
   });
 });

//  describe("props", () => {
//    it("has the correct classname", () => {
//   });
//  });

});
