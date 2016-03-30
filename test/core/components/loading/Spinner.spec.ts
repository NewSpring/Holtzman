import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import Spinner from "./../../../../src/core/components/loading/Spinner";

describe("Spinner component", () => {

 it("has the correct classname", () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.hasClass("loader")).to.equal(true);
  });
});
