
import * as React from "react";
import * as chai from "chai";
import { shallow, mount, ShallowWrapper } from "enzyme";
import { spy } from "sinon";

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
     });
   });

   it("has an active state if a default value is passed", () =>{
     const wrapper = shallow(<Input defaultValue="test" />);
     expect(wrapper.state().active).to.equal(true);
   });

   it("can set a message", () => {
      const wrapper = shallow(<Input />);
      wrapper.setState({ status: "this is a test" });
      expect(wrapper.contains(
        <span className="input__status">
          this is a test
        </span>
      )).to.equal(true);
    });
 });

  describe("props", () => {
    it("can set the input to be disabled", () => {
      const wrapper = shallow(<Input disabled={true} />);
      expect(wrapper.find("input")).to.have.style("cursor", "inherit");
    });

    it("can set styles on input", () => {
      const wrapper = shallow(<Input style={{color: "blue"}} />);
      expect(wrapper.find("input")).to.have.style("color", "blue");
    });
  });

  describe("events", () => {
    it("sets the state of \"focused\" on a focus event", () => {
      const wrapper = shallow(<Input />);
      expect(wrapper.state().focused).to.equal(false);
      wrapper.find("input").simulate("focus");
      expect(wrapper.state().focused).to.equal(true);
    });

    it("sets the state of \"active\" on a focus event", () => {
      const wrapper = shallow(<Input />);
      expect(wrapper.state().active).to.equal(false);
      wrapper.find("input").simulate("focus");
      expect(wrapper.state().active).to.equal(true);
    });

    it("sets the state of \"value\" on a change event if there is a format prop passed", () => {
      const focusSpy = spy((value) => (value));
      const wrapper = mount(<Input format={focusSpy} />);
      wrapper.find("input").simulate("change", {
        target: {
          value: 10,
        },
      });
      expect(focusSpy.called).to.equal(true);
    });
  });

  describe("methods", () => {
    describe("getValue", () => {
      it("gets the value of the input", () => {
        const wrapper = mount(<Input defaultValue="test" />);
        // get the instance of Input
        const inst = wrapper.instance();
        // spy on the getValue method
        const getValueSpy = spy(inst, "getValue");
        expect(getValueSpy()).to.equal("test");
      });
    });
    describe("focus", () => {
      it("sets the state to be \"active\" and \"focused\" and clears errors", () => {
        const wrapper = mount(<Input />);
        // get the instance of Input
        const inst = wrapper.instance();
        // spy on the getValue method
        const focusSpy = spy(inst, "focus");
        // go ahead and focus the component
        focusSpy();
        // verify the state
        expect(wrapper.state()).to.deep.equal({
          active: true,
          focused: true,
          error: false,
          status: "",
        });
      });
    });
  });

});
