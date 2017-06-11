import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { DevotionsSingleWithoutData as DevotionsSingle } from "../Single";

import {
  nav as navActions,
  header as headerActions,
  live as liveActions,
} from "../../../data/store";


jest.mock("../../../deprecated/mixins/mixins.Shareable", () => {});
jest.mock("../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
    setAction: jest.fn(),
  },
  header: {
    set: jest.fn(),
    hide: jest.fn(),
  },
  live: {
    hide: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  live: {},
  devotion: {
    content: {
      id: "1",
      content: {
        body: "<h1>devotion</h1>",
        images: [],
      },
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <DevotionsSingle { ...newProps } />;
};

it("renders without scripture or image", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading with no devotion", () => {
  const wrapper = shallow(generateComponent({
    devotion: {},
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders with image", () => {
  const wrapper = shallow(generateComponent({
    devotion: {
      content: {
        content: {
          body: "<h1>devotion</h1>",
          images: [
            { fileLabel: "1:1", url: "http://test.com/1x1.jpg" },
          ],
        },
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders with scripture", () => {
  const wrapper = shallow(generateComponent({
    devotion: {
      content: {
        content: {
          body: "<h1>devotion</h1>",
          images: [
            { fileLabel: "1:1", url: "http://test.com/1x1.jpg" },
          ],
        },
        scripture: [
          { book: "Job", passage: "2" },
        ],
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("dispatches to the store on mount", () => {
  const mockDispatch = jest.fn();
  liveActions.hide = jest.fn();
  headerActions.set = jest.fn();
  headerActions.hide = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(3);
  expect(liveActions.hide).toHaveBeenCalledTimes(1);
  expect(headerActions.set).toHaveBeenCalledTimes(1);
  expect(headerActions.hide).toHaveBeenCalledTimes(1);
});

it("updates when nextState is different", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().shouldComponentUpdate({}, { selectedIndex: 1 });
  expect(result).toBe(true);
});

it("updates when next content is different", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ selectedIndex: 1 });
  const nextProps = {
      devotion: {
      content: {
        id: "2",
        content: {
          body: "<h1>devotion changed</h1>",
          images: [],
        },
      },
    },
  };
  const result = wrapper.instance().shouldComponentUpdate(nextProps, wrapper.state());
  expect(result).toBe(true);
  expect(wrapper.state().selectedIndex).toBe(0);
});

it("does not update when content is the same", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().shouldComponentUpdate(defaultProps, wrapper.state());
  expect(result).toBe(false);
});

it("updates live bar when component updates", () => {
  const wrapper = shallow(generateComponent());
  const mockHandleLiveBar = jest.fn();
  wrapper.instance().handleLiveBar = mockHandleLiveBar;
  wrapper.instance().componentWillUpdate({}, {});
  expect(mockHandleLiveBar).toHaveBeenCalledTimes(1);
});

it("unfloats the live bar on unmount", () => {
  const mockDispatch = jest.fn();
  liveActions.unfloat = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().componentWillUnmount();
  expect(mockDispatch).toHaveBeenCalledTimes(4);
  expect(liveActions.unfloat).toHaveBeenCalledTimes(1);
});

it("onClickLink updates the state", () => {
  const wrapper = shallow(generateComponent());
  const mockPreventDefault = jest.fn();
  wrapper.instance().onClickLink({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(wrapper.state().selectedIndex).toBe(1);
  expect(wrapper.state().liveSet).toBe(false);
  expect(wrapper.state().livePush).toBe(false);
});

it("getLiveClasses returns blank if not live", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getLiveClasses();
  expect(result).toEqual([]);
});

it("getLiveClasses returns styles if live and livePush", () => {
  const wrapper = shallow(generateComponent({
    live: {
      live: true,
    },
  }));
  wrapper.setState({ livePush: true });
  const result = wrapper.instance().getLiveClasses();
  expect(result).toEqual(["push-double-top"]);
});

it("updates live bar if live", () => {
  jest.useFakeTimers();
  liveActions.show = jest.fn();
  const wrapper = shallow(generateComponent({
    live: {
      live: true,
    },
  }));
  expect(wrapper.state().liveSet).toBe(true);
  jest.runAllTimers();
  expect(liveActions.show).toHaveBeenCalledTimes(1);
});

it("updates live bar with push if scripture", () => {
  jest.useFakeTimers();
  liveActions.float = jest.fn();
  liveActions.show = jest.fn();
  const wrapper = shallow(generateComponent({
    devotion: {
      content: {
        id: "1",
        content: {
          body: "<h1>devotion</h1>",
          images: [],
          scripture: [
            { book: "Job", passage: "2" },
          ],
        },
      },
    },
    live: {
      live: true,
    },
  }));
  expect(wrapper.state().liveSet).toBe(true);
  jest.runAllTimers();
  expect(wrapper.state().livePush).toBe(true);
  expect(liveActions.float).toHaveBeenCalledTimes(1);
  expect(liveActions.show).toHaveBeenCalledTimes(1);
});
