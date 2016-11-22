import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Loading from "../Loading";

const defaultProps = {
  account: false,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Loading { ...newProps } />;
};

it("renders no account version", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders account version", () => {
  const wrapper = shallow(generateComponent({
    account: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
