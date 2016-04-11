
import * as React from "react";
import * as chai from "chai";
import { shallow, mount, ShallowWrapper, ReactWrapper, CommonWrapper } from "enzyme";
import { spy } from "sinon";

declare function require(name: string);
const chaiEnzyme = require("chai-enzyme");
chai.use(chaiEnzyme()) // Note the invocation at the end
const { expect } = chai;

import Select from "./../../../../src/core/components/forms/Select";

describe("<Select /> component", () => {

 describe("state", () => {
   it("has a default state", () =>{
     const wrapper = shallow(<Select />);
     expect(wrapper.state()).to.deep.equal({
       active: false,
       focused: false,
       error: false,
       status: "",
     });
   });

   it("has an active state if a default value is passed", () =>{
     const wrapper = shallow(<Select defaultValue="test" />);
     expect(wrapper.state().active).to.equal(true);
   });

   it("can set a message", () => {
      const wrapper = shallow(<Select />);
      wrapper.setState({ status: "this is a test" });
      expect(wrapper.contains(
        <span className="input__status">
          this is a test
        </span>
      )).to.equal(true);
    });
 });

  describe("props", () => {
    it("can set the select to be disabled", () => {
      const wrapper = shallow(<Select disabled={true} />);
      expect(wrapper.find("select")).to.have.attr("disabled", "disabled");
    });

    it("fires validation prop with default value", (done) => {
      const theSpy = spy((value, target, e) => {
        expect(value).to.equal("the default value");
        done();
      });

      const wrapper = mount(<Select defaultValue="the default value" validation={theSpy} />);
    });

    it("fires change prop with default value", (done) => {
      const theSpy = spy((value, target, e) => {
        expect(value).to.equal("the default value");
        done();
      });

      const wrapper = mount(<Select defaultValue="the default value" onChange={theSpy} />);
    });

  });

  describe("events", () => {
    it("sets the state of \"focused\" on a focus event", () => {
      const wrapper = shallow(<Select />);
      expect(wrapper.state().focused).to.equal(false);
      wrapper.find("select").simulate("focus");
      expect(wrapper.state().focused).to.equal(true);
    });

    it("sets the state of \"active\" on a focus event", () => {
      const wrapper = shallow(<Select />);
      expect(wrapper.state().active).to.equal(false);
      wrapper.find("select").simulate("focus");
      expect(wrapper.state().active).to.equal(true);
    });

    it("passes a value to the onChange prop", (done) => {

      const onChangeSpy = spy((value, target, e) => {
        expect(value).to.equal("10");
        done();
      });

      const container = document.createElement("div");
      document.body.appendChild(container);

      let reactSelect = <Select onChange={onChangeSpy} items={[{value: "20", label: "twenty"}, {value: "10", label: "ten"}]} />;

      const wrapper = mount(reactSelect, {
        attachTo: container
      });

      let select = container.querySelectorAll("select")[0] as HTMLSelectElement;
      select.selectedIndex = 1;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });

    it("passes a value to the validation prop", (done) => {

      const validationSpy = spy((value, target, e) => {
        expect(value).to.equal("10");
        done();
      });

      const container = document.createElement("div");
      document.body.appendChild(container);

      let reactSelect = <Select validation={validationSpy} items={[{value: "20", label: "twenty"}, {value: "10", label: "ten"}]} />;

      const wrapper = mount(reactSelect, {
        attachTo: container
      });

      let select = container.querySelectorAll("select")[0] as HTMLSelectElement;
      select.selectedIndex = 1;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });

  describe("methods", () => {

    describe("getValue", () => {
      it("gets the value of the select", () => {
        const wrapper = mount(<Select defaultValue="test" includeBlank={false} items={[{value: "test", label: "ten"}]} />);
        // get the instance of Input
        const inst = wrapper.instance();
        // spy on the getValue method
        const getValueSpy = spy(inst, "getValue");
        expect(getValueSpy()).to.equal("test");
      });
    });

    describe("focus", () => {
      it("sets the state to be \"active\" and \"focused\" and clears errors", () => {
        const wrapper = mount(<Select items={[{value: "10", label: "ten"}]} />);
        // get the instance of Input
        const inst = wrapper.instance();
        // spy on the focus method
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

      it("sets the value to default with componentWillUpdate", () => {
        const container = document.createElement("div");
        document.body.appendChild(container);

        let reactSelect = <Select defaultValue="20" items={[{value: "20", label: "twenty"}, {value: "10", label: "ten"}]} />;

        const wrapper = mount(reactSelect, {
          attachTo: container
        });

        wrapper.setProps({defaultValue: "10"});

        let select = container.querySelectorAll("select")[0] as HTMLSelectElement;
        expect(select.value).to.equal("10");
      });

    });

    describe("setStatus", () => {
      it("sets the status within the state", () => {
        const wrapper = mount(<Select />);
        // get the instance of Input
        const inst = wrapper.instance();
        // spy on the setStatus method
        const setStatusSpy = spy(inst, "setStatus");
        // share a test string for easier changes if needed
        const testString = "this is a test";
        // change the status
        setStatusSpy(testString);
        // verify the state
        expect(wrapper.state().status).to.equal(testString);
      });
    });
  });

});