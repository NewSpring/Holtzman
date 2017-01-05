import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Tabs from "../";

const defaultProps = {
  items: [jest.fn(), jest.fn()],
  toggle: jest.fn(),
  state: 0,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Tabs { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates active on mount", () => {
  const wrapper = shallow(generateComponent({
    state: 1,
  }));
  expect(wrapper.state().active).toBe(1);
});

it("updates active when recieving props", () => {
  const wrapper = shallow(generateComponent({
    state: 1,
  }));
  wrapper.setProps({ state: 2 });
  expect(wrapper.state().active).toBe(2);
});

it("toggle uses event to update state", () => {
  const mockTabs = jest.fn();
  const mockEvent = {
    target: {
      dataset: {
        toggle: 2,
      },
    },
  };
  const wrapper = shallow(generateComponent({
    toggle: mockTabs,
  }));
  wrapper.instance().toggle(mockEvent);
  expect(mockTabs).toHaveBeenCalledTimes(1);
  expect(mockTabs).toHaveBeenCalledWith(2);
  expect(wrapper.state().active).toBe(2);
});

it("toggleClasses renders default classes", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().toggleClasses();
  expect(result).toMatchSnapshot();
});

it("toggleClasses renders active classes", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().toggleClasses(0);
  expect(result).toMatchSnapshot();
});

it("toggleWidth determins size for toggle", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().toggleWidth()).toBe(50);
});

it("toggleStyle returns css for toggle width", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().toggleStyle).toEqual({
    width: "50%",
  });
});

it("arrowStyle returns css for arrow placement", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().arrowStyle()).toMatchSnapshot();
  wrapper.setState({ active: 1 });
  expect(wrapper.instance().arrowStyle()).toMatchSnapshot();
});
