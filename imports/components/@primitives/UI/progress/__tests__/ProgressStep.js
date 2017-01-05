import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Progress from "../ProgressStep";

const defaultProps = {
  steps: 3,
  active: 1,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Progress { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

// XXX unused
it("getLayer calculates layer", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getLayer(2)).toBe(3);
  expect(wrapper.instance().getLayer(3)).toBe(2);
});

it("steps returns an array of objects containing count", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().steps();
  expect(result).toEqual([
    { count: 0 }, { count: 1 }, { count: 2 },
  ]);
});
