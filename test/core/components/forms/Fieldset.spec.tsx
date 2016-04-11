
import * as React from "react";
import * as chai from "chai";
import { shallow, ShallowWrapper } from "enzyme";

declare function require(name: string);
const chaiEnzyme = require("chai-enzyme");
chai.use(chaiEnzyme()) // Note the invocation at the end
const { expect, assert } = chai;

import Fieldset from "./../../../../src/core/components/forms/Fieldset";

describe("<Fieldset /> component", () => {

 it("has the correct classname", () => {
    const wrapper = shallow(<Fieldset />);
    expect(wrapper.hasClass("flush-bottom")).to.equal(true);
  });

  it("can apply the theme", () => {
    const wrapper = shallow(<Fieldset theme="foobar" />);
    expect(wrapper.hasClass("foobar")).to.equal(true);
  });

  it("can have a theme that overrides defaults", () => {
    const wrapper = shallow(<Fieldset theme="foobar" />);
    expect(wrapper.hasClass("flush-bottom")).to.equal(false);
  });

  it("can have extra classes passed to it", () => {
    const wrapper = shallow(<Fieldset classes={["foobar"]} />);
    expect(wrapper.hasClass("foobar")).to.equal(true);
    expect(wrapper.hasClass("flush-bottom")).to.equal(true);
  });
});
