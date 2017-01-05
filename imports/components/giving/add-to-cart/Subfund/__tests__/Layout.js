
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { getSingleSpecWrapper } from "../../../../../util/tests/data-spec.js";

import Layout from "../Layout";

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    state: {
      id: "test",
      fund: "main",
    },
    preFill: () => {},
    accounts: [{value: "main fund"}],
  };

  return <Layout {...defaultProps} {...additionalProps} />
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("should render with minimal props", () => {
  const component = mount(generateComponent());
  expect(mountToJson(component)).toMatchSnapshot();
});

it("should accept custom classes thru classes prop", () => {
  const component = mount(generateComponent({classes: "test1 test2"}));
  expect(mountToJson(component)).toMatchSnapshot();
});

it("should accept multiple accounts through accounts prop", () => {
  const component = mount(generateComponent({
    accounts: [
      {value: "hello"},
      {value: "world"},
    ],
  }));
  expect(mountToJson(component)).toMatchSnapshot();

  //one additional for "select fund" default
  //one additional for blank?
  expect(component.find("option").length).toEqual(3);
});


it("should accept an active prop to show the input", () => {

  const component = mount(generateComponent({ active: true, inputVal: "5.00" }));
  expect(mountToJson(component)).toMatchSnapshot();

  const inputProps = component.find("Input").props();

  expect(inputProps.value).toEqual("5.00");
});
