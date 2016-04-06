
import * as React from "react";
import * as chai from "chai";
import { shallow, ShallowWrapper } from "enzyme";

declare function require(name: string);
const chaiEnzyme = require("chai-enzyme");
chai.use(chaiEnzyme()) // Note the invocation at the end
const { expect, assert } = chai;

import Label from "./../../../../../src/core/components/forms/components/Label";

describe("<Label /> component", () => {

 it("creates a label with for that is passed as \"labelFor\"", () => {
    const wrapper = shallow(<Label labelFor="test" labelName="Test" />);
    expect(wrapper.html()).to.equal(
      `<label for="test">Test</label>`
    );
  });

  it("creates a label with text that is passed as \"labelName\"", () => {
    const wrapper = shallow(<Label labelFor="test" labelName="Test" />);
    expect(wrapper.html()).to.equal(
      `<label for="test">Test</label>`
    );
  });

  it("allows setting the label to be disabled", () => {
    const wrapper = shallow(<Label labelFor="test" labelName="Test" disabled={true} />);
    expect(wrapper).to.have.style("cursor", "inherit");
  });

});
