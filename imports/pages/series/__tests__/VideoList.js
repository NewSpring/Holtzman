import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  SeriesVideoListWithoutData as SeriesVideoList,
  SERMONS_QUERY,
} from "../VideoList";

const defaultProps = {
  sermons: {
    loading: false,
    content: {
      sermons: [{}, {}],
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SeriesVideoList { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading", () => {
  const wrapper = shallow(generateComponent({
    sermons: {
      loading: true,
      content: {
        sermons: [],
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("calculates width based on window size", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().dynamicWidth();
  expect(result).toEqual({ width: "1654.4px" });
});

it("calculates tablet version", () => {
  window.isTablet = true;
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().dynamicWidth();
  expect(result).toEqual({ width: "818px" });
});

it("overflow contains css object", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().overflow;
  expect(result).toMatchSnapshot();
});
