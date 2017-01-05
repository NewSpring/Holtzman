import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { DiscoverWithoutData as Discover } from "../";
import liveActions from "../../../data/store/live";

jest.mock("../../../deprecated/mixins/mixins.Header", () => {});
jest.mock("../../../data/store/live", () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));

const defaultProps = {
  dispatch: jest.fn(),
  audio: {
    state: "default",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Discover { ...newProps } />;
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

it("renders additional padding when audio player active", () => {
  const wrapper = shallow(generateComponent({
    audio: {
      state: "playing",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("hides live bar on mount", () => {
  const mockDispatch = jest.fn();
  liveActions.hide = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(liveActions.hide).toHaveBeenCalledTimes(1);
});

it("reenables live bar on unmount", () => {
  const mockDispatch = jest.fn();
  liveActions.show = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.unmount();
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(liveActions.show).toHaveBeenCalledTimes(1);
});

it("containerStyles doesn't account for audio player when default", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().containerStyles();
  expect(result).toEqual({
    paddingBottom: "10px",
  });
});

it("containerStyles acounts for audio player when not default", () => {
  const wrapper = shallow(generateComponent({
    audio: {
      state: "paused",
    },
  }));
  const result = wrapper.instance().containerStyles();
  expect(result).toEqual({
    paddingBottom: "50px",
  });
});
