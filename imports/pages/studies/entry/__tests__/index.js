/* eslint-disable */
import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { shallow, mount } from "enzyme";
import { shallowToJson, mountToJson } from "enzyme-to-json";

import {
  StudyEntrySingleWithoutData as StudyEntry,
} from "../index";

import {
  header as headerActions,
  live as liveActions,
} from "../../../../data/store";

import StudyEntryList from "../../EntryList";
import Content from "../Content";
import Slider from "../Slider";

jest.mock("../../../../deprecated/mixins/mixins.Shareable", () => {});
jest.mock("../../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
    setAction: jest.fn(),
  },
  header: {
    set: jest.fn(),
  },
  live: {
    hide: jest.fn(),
    unfloat: jest.fn(),
    floatDouble: jest.fn(),
    show: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  live: {},
  studyEntry: {
    content: {
      id: "1",
      content: {
        body: "<h1>devotion</h1>",
        images: [],
      },
    },
  },
  study: {},
  params: {}
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

const mockHeaderAction = jest.fn();
const MockHeaderAction = (Component) => (
  class MockHeaderAction extends React.Component {
    constructor () {
      super(...arguments);
      this.headerAction = mockHeaderAction;
    }
    render() {
      return <Component { ...this.props } { ...this.state } />
    }
  }
);

const generateMockedComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  const MockedStudyEntry = MockHeaderAction(StudyEntry);
  return <MockedStudyEntry { ...newProps } />;
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
      ...defaultProps,
      ...additionalProps,
    };

  return <StudyEntry { ...newProps } />;
};

it("renders without scripture or image", () => {
  const wrapper = mount(generateComponent());
  expect(mountToJson(wrapper)).toMatchSnapshot();
});

it("renders loading with no studyEntry", () => {
  const wrapper = shallow(generateComponent({
    StudyEntry: {},
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("dispatches to the store on mount", () => {
  const mockDispatch = jest.fn();
  liveActions.hide = jest.fn();
  headerActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(liveActions.hide).toHaveBeenCalledTimes(1);
});

xit("updates when nextState is different", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().shouldComponentUpdate({}, {});
  expect(result).toBe(true);
});

xit("updates when next content is different", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ selectedIndex: 1 });
  const nextProps = {
    studyEntry: {
      content: {
        id: "2",
        content: {
          body: "<h1>study changed</h1>",
          images: [],
        },
      },
    },
  };
  const result = wrapper.instance().shouldComponentUpdate(nextProps, wrapper.state());
  expect(result).toBe(true);
  expect(wrapper.state().selectedIndex).toBe(1);
});

xit("does not update when content is the same", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().shouldComponentUpdate(defaultProps, wrapper.state());
  expect(result).toBe(false);
});

xit("updates live bar when component updates", () => {
  const wrapper = shallow(generateComponent());
  const mockHandleLiveBar = jest.fn();
  wrapper.instance().handleLiveBar = mockHandleLiveBar;
  wrapper.instance().componentWillUpdate({}, {});
  expect(mockHandleLiveBar).toHaveBeenCalledTimes(1);
});

xit("unfloats the live bar on unmount", () => {
  const mockDispatch = jest.fn();
  liveActions.unfloat = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().componentWillUnmount();
  expect(mockDispatch).toHaveBeenCalledTimes(6);
  expect(liveActions.unfloat).toHaveBeenCalledTimes(1);
});

xit("onClickLink updates the state", () => {
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

xit("getLiveClasses returns blank if not live", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getLiveClasses();
  expect(result).toEqual([]);
});

xit("getLiveClasses returns styles if live and livePush", () => {
  const wrapper = shallow(generateComponent({
    live: {
      live: true,
    },
  }));
  wrapper.setState({ livePush: true });
  const result = wrapper.instance().getLiveClasses();
  expect(result).toEqual(["push-double-top"]);
});

xit("updates live bar if live", () => {
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

xit("updates live bar with push if scripture", () => {
  jest.useFakeTimers();
  liveActions.float = jest.fn();
  liveActions.show = jest.fn();
  const wrapper = shallow(generateComponent({
    studyEntry: {
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
