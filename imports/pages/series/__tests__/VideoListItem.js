import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import SeriesVideoListItem from "../VideoListItem";

const defaultProps = {
  sermon: {
    entryId: "1",
    channelName: "sermons",
    title: "test sermon",
    parent: {
      entryId: "2",
    },
    meta: {
      actualDate: "2016-11-14T20:42:29+00:00",
    },
    content: {
      speaker: "jim bob",
    },
  },
  order: 1,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SeriesVideoListItem { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("calculates width based on window size", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().dynamicWidth();
  expect(result).toEqual({ width: 787.2, height: 787.2 });
});

it("calculates tablet version", () => {
  window.isTablet = true;
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().dynamicWidth();
  expect(result).toEqual({ width: 369, height: 369 });
});
