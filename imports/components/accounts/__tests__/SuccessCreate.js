import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Success from "../SuccessCreate";

const defaultProps = {
  email: "test@gmail.com",
  goBack: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Success { ...newProps } />;
};

it("render with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
