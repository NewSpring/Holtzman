import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import ErrTemplate from "../ErrTemplate";

const defaultProps = {
  errorCode: 100,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  }
  return <ErrTemplate {...newProps} />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});



