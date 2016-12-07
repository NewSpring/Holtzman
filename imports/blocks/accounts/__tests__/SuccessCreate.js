import { shallow } from "enzyme";
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
  expect(wrapper).toMatchSnapshot();
});
