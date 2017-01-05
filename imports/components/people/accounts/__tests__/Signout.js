import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import SignOut from "../Signout";

const defaultProps = {
  signout: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SignOut { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
