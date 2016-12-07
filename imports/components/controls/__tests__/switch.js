import { shallow } from "enzyme";
import Switch from "../switch";

const defaultProps = {
  id: 1,
  changed: jest.fn(),
  classes: [],
  containerClasses: "test-container",
  containerStyle: {
    color: "red",
  },
  theme: null,
  styles: null,
  name: null,
  active: true,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Switch { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("renders with styles", () => {
  const wrapper = shallow(generateComponent({
    styles: {
      color: "red",
    },
  }));
  expect(wrapper).toMatchSnapshot();
});

it("overrides with theme", () => {
  const wrapper = shallow(generateComponent({
    theme: "my theme",
  }));
  expect(wrapper).toMatchSnapshot();
});

it("overrides with name", () => {
  const wrapper = shallow(generateComponent({
    name: "my name",
  }));
  expect(wrapper).toMatchSnapshot();
});

it("appends with classes", () => {
  const wrapper = shallow(generateComponent({
    classes: ["one", "two"],
  }));
  expect(wrapper).toMatchSnapshot();
});

it("changed calls changed", () => {
  const mockChanged = jest.fn();
  const wrapper = shallow(generateComponent({
    id: 2,
    changed: mockChanged,
  }));
  wrapper.instance().changed();
  expect(mockChanged).toHaveBeenCalledWith(2);
});
