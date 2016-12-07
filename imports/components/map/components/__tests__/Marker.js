import { shallow } from "enzyme";
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
  expect(wrapper).toMatchSnapshot();
});

it("renders $hover version", () => {
  const wrapper = shallow(generateComponent({
    $hover: true,
  }));
  expect(wrapper).toMatchSnapshot();
});

it("renders hover version", () => {
  const wrapper = shallow(generateComponent({
    hover: true,
  }));
  expect(wrapper).toMatchSnapshot();
});

it("renders active version", () => {
  const wrapper = shallow(generateComponent({
    active: true,
  }));
  expect(wrapper).toMatchSnapshot();
});
