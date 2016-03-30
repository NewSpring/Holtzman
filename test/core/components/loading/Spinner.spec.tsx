/// <reference path="../../../../typings/main.d.ts" />

import * as React from "react";
import chai, { expect } from "chai";
import { shallow, ShallowWrapper } from "enzyme";

import chaiEnzyme from "chai-enzyme";

chai.use(chaiEnzyme()) // Note the invocation at the end
import Spinner from "./../../../../src/core/components/loading/Spinner";

describe("<Spinner /> component", () => {

 it("has the correct classname", () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.hasClass("loader")).to.equal(true);
  });
  
  it("can apply the theme", () => {
    const wrapper = shallow(<Spinner theme="foobar" />);
    expect(wrapper.hasClass("foobar")).to.equal(true);
  });
​
  // it("can set independent styles", () => {
  //   const wrapper = shallow(<Spinner styles={{borderColor: "#fff"}} />);
  //   expect(wrapper).to.have.style("border-color", "#fff");
  // });
  
});
