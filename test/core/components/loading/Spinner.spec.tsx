/// <reference path="../../../../typings/main.d.ts" />

import * as React from "react";
import * as chai from "chai";
import { shallow, ShallowWrapper } from "enzyme";

declare function require(name: string);
const chaiEnzyme = require("chai-enzyme");

chai.use(chaiEnzyme()) // Note the invocation at the end
import Spinner from "./../../../../src/core/components/loading/Spinner";

describe("<Spinner /> component", () => {

 it("has the correct classname", () => {
    const wrapper = shallow(<Spinner />);
    chai.expect(wrapper.hasClass("loader")).to.equal(true);
  });

  it("can apply the theme", () => {
    const wrapper = shallow(<Spinner theme="foobar" />);
    chai.expect(wrapper.hasClass("foobar")).to.equal(true);
  });

  it("can have a theme that overrides defaults", () => {
    const wrapper = shallow(<Spinner theme="foobar" />);
    chai.expect(wrapper.hasClass("loader")).to.equal(false);
  });

  it("can have extra classes passed to it", () => {
    const wrapper = shallow(<Spinner classes={["foobar"]} />);
    chai.expect(wrapper.hasClass("foobar")).to.equal(true);
    chai.expect(wrapper.hasClass("loader")).to.equal(true);
  });

  it("can set independent styles", () => {
    const wrapper = shallow(<Spinner styles={{borderColor: "#fff"}} />);
    chai.expect(wrapper).to.have.style("border-color", "#fff");
  });

});
