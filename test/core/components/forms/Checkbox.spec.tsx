
import * as React from "react";
import * as chai from "chai";
import { shallow, mount, ShallowWrapper, ReactWrapper, CommonWrapper } from "enzyme";
import { spy } from "sinon";

declare function require(name: string);
const chaiEnzyme = require("chai-enzyme");
chai.use(chaiEnzyme()) // Note the invocation at the end
const { expect } = chai;

import Checkbox from "./../../../../src/core/components/forms/Checkbox";

describe("<Checkbox /> component", () => {

 describe("state", () => {
   it("has a default state", () =>{
     const wrapper = shallow(<Checkbox />);
     expect(wrapper.state()).to.deep.equal({
       error: false,
       status: false,
     });
   });

   it("is unchecked if no value is passed", () =>{
     const wrapper = shallow(<Checkbox />);
     expect(wrapper.find("input")).not.to.be.checked();
   });

   it("can set a message", () => {
      const wrapper = shallow(<Checkbox />);
      wrapper.setState({ status: "this is a test" });
      expect(wrapper.contains(
        <span className="input__status">
          this is a test
        </span>
      )).to.equal(true);
    });
 });

  describe("props", () => {
    it("can set the checkbox to be disabled", () => {
      const wrapper = shallow(<Checkbox disabled={true} />);
      expect(wrapper.find("input")).to.be.disabled();
    });

    it("can set the classname of the checkbox", () => {
      const wrapper = shallow(<Checkbox inputClasses={["foo"]} />);
      expect(wrapper.find("input")).to.have.className("foo");
    });
  });
});
