import { Component } from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Template } from "../";

const generateComponent = () => (
  <Template />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
