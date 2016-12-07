import { Component } from "react";
import { shallow } from "enzyme";
import { Template } from "../";

const generateComponent = () => (
  <Template />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
