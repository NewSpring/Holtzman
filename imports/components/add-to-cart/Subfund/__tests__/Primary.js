
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { getSingleSpecWrapper } from "../../../../util/tests/data-spec.js";

import Primary from "../Primary";

const generateComponent = (additionalProps={}) => {
  const defaultProps = {
    active: false,
    fundId: "test",
    changeFund: () => {},
    changeAmount: () => {},
    preFill: () => {},
    accounts: [{value: "main fund"}],
  };

  return <Primary {...defaultProps} {...additionalProps} />
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
  expect(component.find("option").length).toEqual(3);
});

it("should change classes based on active state", () => {
  const component = mount(generateComponent({ active: true }));
  expect(mountToJson(component)).toMatchSnapshot();
});
