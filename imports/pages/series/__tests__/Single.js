import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import headerActions from "../../../data/store/header";
import {
  SeriesSingleWithoutData as SeriesSingle,
  SERIES_SINGLE_QUERY,
} from "../Single";

jest.mock("../../../deprecated/mixins/mixins.Header", () => {});

jest.mock("../../../deprecated/mixins/mixins.Shareable", () => {});
jest.mock("../../../data/store/header", () => ({
  set: jest.fn(),
}));

const defaultProps = {
  dispatch: jest.fn(),
  series: {
    content: {
      id: "1",
      channelName: "series_newspring",
      content: {
        isLight: false,
        description: "<h1>test</h1>",
        colors: [
          { description: "primary", value: "0000ff" },
        ],
        images: [
          {
            fileLabel: "1:1",
            url: "http://test.com/1x1.jpg",
          },
        ],
        ooyalaId: "testid",
        tags: ["one", "two"],
      },
    },
  },
  params: {
    id: "1",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SeriesSingle { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading", () => {
  const wrapper = shallow(generateComponent({
    series: {
      content: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query", () => {
  expect(SERIES_SINGLE_QUERY).toMatchSnapshot();
});

it("handleHeaderStyle updates the header", () => {
  const mockDispatch = jest.fn();
  headerActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().handleHeaderStyle(defaultProps);
  // once on mount
  expect(headerActions.set).toHaveBeenCalledTimes(2);
  expect(headerActions.set).lastCalledWith({
    title: "Series",
    color: "0000ff",
    light: true,
  });
});

it("hackBackgroundStyles returns css object", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().hackBackgroundStyles();
  expect(result).toMatchSnapshot();
});
