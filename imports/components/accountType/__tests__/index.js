import { shallow } from "enzyme";
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
  expect(wrapper).toMatchSnapshot();
});

it("handles ACH case", () => {
  const wrapper = shallow(generateComponent({
    type: "ACH",
  }));
  expect(wrapper).toMatchSnapshot();
});

it("handles AmEx case", () => {
  const wrapper = shallow(generateComponent({
    type: "American Express",
  }));
  expect(wrapper).toMatchSnapshot();
});
