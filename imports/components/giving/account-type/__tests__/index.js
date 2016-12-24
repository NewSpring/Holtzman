import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import AccountType from "../";

const defaultProps = {
  width: 20,
  height: 20,
  type: "Bank",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <AccountType { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("handles ACH case", () => {
  const wrapper = shallow(generateComponent({
    type: "ACH",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("handles AmEx case", () => {
  const wrapper = shallow(generateComponent({
    type: "American Express",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
