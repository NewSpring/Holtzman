import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { nav as navActions } from "../../../store";
import headerActions from "../../../store/header";
import {
  SeriesSingleWithoutData as SeriesSingle,
  SERIES_SINGLE_QUERY,
} from "../series.Single";

jest.mock("../../../mixins/mixins.Header", () => {});
jest.mock("../../../mixins/mixins.Likeable", () => {});
jest.mock("../../../mixins/mixins.Shareable", () => {});
jest.mock("../../../store/header", () => ({
  set: jest.fn(),
}));
jest.mock("../../../store", () => ({
  nav: {
    setLevel: jest.fn(),
    setAction: jest.fn(),
  },
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

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  navActions.setActions = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(3);
  expect(navActions.setLevel).toHaveBeenCalledWith("CONTENT");
  expect(navActions.setAction.mock.calls[0][0]).toBe("CONTENT");
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
