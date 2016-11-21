import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { actions as audioActions } from "../../../../store/audio";
import { AudioScrubberWithoutData as AudioScrubber } from "../audio.Scrubber";

const defaultProps = {
  isLight: false,
  seek: jest.fn(),
  time: "20",
  progress: "20",
  playing: {
    track: {
      duration: "12:23",
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <AudioScrubber { ...newProps } />;
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders light version", () => {
  const wrapper = shallow(generateComponent({
    isLight: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("clears timoemouts on mount", () => {
  const mockClearTimeout = jest.fn();
  global.clearTimeout = mockClearTimeout;
  const wrapper = shallow(generateComponent());
  wrapper.instance().onTouchEndTimeout = {};
  wrapper.instance().onClickTimeout = {};
  wrapper.instance().componentWillUnmount();
  expect(mockClearTimeout).toHaveBeenCalledTimes(2);
});

it("click executes if not scrubbing", () => {
  jest.useFakeTimers();
  const mockEvent = {
    target: {
      offsetWidth: 100,
      parentElement: {
        getClientRects: jest.fn(() => [ { left: 0 } ]),
      },
    },
    clientX: 2,
  };
  const wrapper = shallow(generateComponent());
  const mockSeek = jest.fn();
  wrapper.instance().seek = mockSeek;
  wrapper.instance().click(mockEvent);
  expect(wrapper.state().lastPercent).toBe(2);
  expect(wrapper.state().override).toBe(true);
  expect(mockSeek).toHaveBeenCalledTimes(1);
  expect(mockSeek).toHaveBeenCalledWith(2);
  jest.runAllTimers();
  expect(wrapper.state().override).toBe(false);
});

it("calculatePercent returns percentage", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = {
    offsetWidth: 100,
    parentElement: {
      getClientRects: jest.fn(() => [ { left: 1 } ]),
    },
  };
  const result = wrapper.instance().calculatePercent(mockTarget, 5);
  expect(result).toBe(4);
});

it("seek calls seek with percentage", () => {
  const mockSeek = jest.fn();
  const wrapper = shallow(generateComponent({
    seek: mockSeek,
  }));
  wrapper.instance().seek(20);
  expect(mockSeek).toHaveBeenCalledTimes(1);
  expect(mockSeek).toHaveBeenCalledWith(20);
});

it("seek calls seek with 100 if > 100", () => {
  const mockSeek = jest.fn();
  const wrapper = shallow(generateComponent({
    seek: mockSeek,
  }));
  wrapper.instance().seek(120);
  expect(mockSeek).toHaveBeenCalledTimes(1);
  expect(mockSeek).toHaveBeenCalledWith(100);
});

it("seek calls seek with 0 if < 0", () => {
  const mockSeek = jest.fn();
  const wrapper = shallow(generateComponent({
    seek: mockSeek,
  }));
  wrapper.instance().seek(-120);
  expect(mockSeek).toHaveBeenCalledTimes(1);
  expect(mockSeek).toHaveBeenCalledWith(0);
});

it("getTertiaryBackgroundColor has dark version", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getTertiaryBackgroundColor(true);
  expect(result).toMatchSnapshot();
});

it("getTertiaryBackgroundColor has light version", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getTertiaryBackgroundColor(false);
  expect(result).toMatchSnapshot();
});

it("getTertiaryTextColor has dark version", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getTertiaryTextColor(true);
  expect(result).toMatchSnapshot();
});

it("getTertiaryTextColor has light version", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getTertiaryTextColor(false);
  expect(result).toMatchSnapshot();
});

it("getSecondayBackgroundClass has dark version", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getSecondayBackgroundClass(true);
  expect(result).toMatchSnapshot();
});

it("getSecondayBackgroundClass has light version", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getSecondayBackgroundClass(false);
  expect(result).toMatchSnapshot();
});

it("getPrimaryBackgroundClass has dark version", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getPrimaryBackgroundClass(true);
  expect(result).toMatchSnapshot();
});

it("getPrimaryBackgroundClass has light version", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getPrimaryBackgroundClass(false);
  expect(result).toMatchSnapshot();
});

it("getTertiaryTextClass has dark version", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getTertiaryTextClass(true);
  expect(result).toMatchSnapshot();
});

it("getTertiaryTextClass has light version", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getTertiaryTextClass(false);
  expect(result).toMatchSnapshot();
});

it("getTrackDuration returns duration", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getTrackDuration()).toBe("12:23");
});

it("getCurrentTime returns time", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getCurrentTime()).toBe("20");
});

it("touchMove updates state with percent", () => {
  const wrapper = shallow(generateComponent());
  const mockEvent = {
    target: {
      offsetWidth: 100,
      parentElement: {
        getClientRects: jest.fn(() => [ { left: 0 } ]),
      },
    },
    touches: [
      { clientX: 2 },
    ],
  };
  wrapper.instance().touchMove(mockEvent);
  expect(wrapper.state().lastPercent).toBe(2);
  expect(wrapper.state().scrubbing).toBe(true);
  expect(wrapper.state().override).toBe(true);
});

it("touchEnd calls seek with last percent and evntually resets state", () => {
  jest.useFakeTimers();
  const wrapper = shallow(generateComponent());
  const mockSeek = jest.fn();
  wrapper.instance().seek = mockSeek;
  wrapper.setState({ lastPercent: 30, scrubbing: true, override: true });
  wrapper.instance().touchEnd();
  expect(mockSeek).toHaveBeenCalledTimes(1);
  expect(mockSeek).toHaveBeenCalledWith(30);
  jest.runAllTimers();
  expect(wrapper.state().scrubbing).toBe(false);
  expect(wrapper.state().override).toBe(false);
});

it("scrubStyle uses progress if no override", () => {
  const wrapper = shallow(generateComponent({
    progress: 30,
  }));
  wrapper.setState({ lastPercent: 20, override: false });
  const result = wrapper.instance().scrubStyle();
  expect(result).toEqual({
    width: "30%",
  });
});

it("scrubStyle uses lastPercent if override", () => {
  const wrapper = shallow(generateComponent({
    progress: 30,
  }));
  wrapper.setState({ lastPercent: 20, override: true });
  const result = wrapper.instance().scrubStyle();
  expect(result).toEqual({
    width: "20%",
  });
});
