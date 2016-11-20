import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Marker from "../Marker";

const defaultProps = {
  $hover: false,
  hover: false,
  active: false,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Marker { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders $hover version", () => {
  const wrapper = shallow(generateComponent({
    $hover: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders hover version", () => {
  const wrapper = shallow(generateComponent({
    hover: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders active version", () => {
  const wrapper = shallow(generateComponent({
    active: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
