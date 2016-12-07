import { shallow } from "enzyme";
import Loading from "../Loading.js";

const defaultProps = {
  msg: "test msg",
  style: {
    color: "red",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Loading { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
