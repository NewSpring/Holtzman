import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  nav as navActions,
  audio as audioActions,
  header as headerActions,
} from "../../../data/store";
import {
  SeriesSingleVideoWithoutData as SeriesSingleVideo,
  CURRENT_SERMON_QUERY,
  SERIES_QUERY,
} from "../SingleVideo";

jest.mock("../../../deprecated/mixins/mixins.Header", () => {});
jest.mock("../../../deprecated/mixins/mixins.Likeable", () => {});
jest.mock("../../../deprecated/mixins/mixins.Shareable", () => {});
jest.mock("../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
    setAction: jest.fn(),
  },
  audio: {
    setPlaying: jest.fn(),
  },
  header: {
    set: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  live: {
    live: false,
  },
  currentSermon: {
    content: {
      title: "test sermon",
      meta: {
        actualDate: "2016-11-14T20:42:29+00:00",
      },
      content: {
        description: "<h1>test</h1>",
        speaker: "jim bob",
        audio: [
          { url: "http://test.com/test.mp3" },
        ],
        ooyalaId: "testid",
      },
    },
  },
  series: {
    content: {
      title: "test series",
      content: {
        isLight: false,
        colors: [
          { type: "primary", value: "00ff00" },
        ],
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
  return <SeriesSingleVideo { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading without series", () => {
  const wrapper = shallow(generateComponent({
    series: {
      content: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading without sermon", () => {
  const wrapper = shallow(generateComponent({
    currentSermon: {
      content: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses series query", () => {
  expect(SERIES_QUERY).toMatchSnapshot();
});

it("parses sermon query", () => {
  expect(CURRENT_SERMON_QUERY).toMatchSnapshot();
});

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  navActions.setAction = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  // from handleHeader as well
  expect(mockDispatch).toHaveBeenCalledTimes(3);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("CONTENT");
  expect(navActions.setAction).toHaveBeenCalledTimes(1);
  expect(navActions.setAction.mock.calls[0][0]).toBe("CONTENT");
});

it("handleHeader updates the header", () => {
  const mockDispatch = jest.fn();
  headerActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().handleHeader(defaultProps);
  // once on mount
  expect(headerActions.set).toHaveBeenCalledTimes(2);
  expect(headerActions.set).lastCalledWith({
    title: "Series",
    color: "00ff00",
    light: true,
    subTitle: "test series",
  });
});

it("handleHeader doesn't set subtitle if live", () => {
  const mockDispatch = jest.fn();
  headerActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    live: {
      live: true,
    },
  }));
  wrapper.instance().handleHeader(defaultProps);
  // once on mount
  expect(headerActions.set).toHaveBeenCalledTimes(2);
  expect(headerActions.set).lastCalledWith({
    title: "Series",
    color: "00ff00",
    light: true,
    subTitle: undefined,
  });
});

it("playAudio updates audio store", () => {
  const mockPreventDefault = jest.fn();
  audioActions.setPlaying = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.instance().playAudio({
    preventDefault: mockPreventDefault,
  });
  expect(audioActions.setPlaying).toHaveBeenCalledTimes(1);
  expect(audioActions.setPlaying.mock.calls[0][0]).toEqual({
    track: {
      url: "http://test.com/test.mp3",
      title: "test sermon",
      artist: "Jim Bob",
    },
    album: defaultProps.series.content,
  });
});
