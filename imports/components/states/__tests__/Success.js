import { shallow } from "enzyme";
import Success from "../Success.js";

const defaultProps = {
  msg: "test msg",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Success { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
