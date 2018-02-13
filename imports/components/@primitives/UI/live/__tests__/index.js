import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { print } from "graphql-tag/printer";
import liveActions from "../../../../../data/store/live";
import {
  LiveWithoutData as Live,
  LIVE_QUERY,
} from "../";

jest.mock("../../../../../data/store/live", () => ({
  set: jest.fn(),
  reset: jest.fn(),
}));

jest.mock("react-motion", () => ({
  Motion: jest.fn(),
  spring: jest.fn(),
}));

const defaultProps = {
  live: {
    float: false,
    live: true,
    fuse: false,
    show: true,
  },
  dispatch: jest.fn(),
  data: {
    live: {
      live: true,
      fuse: false,
      show: true,
    },
  },
  fuseLive: {
    live: {
      live: true,
      fuse: true,
      show: true,
    }
  }
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Live { ...newProps } />;
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

it("doesn't render if not live", () => {
  const wrapper = shallow(generateComponent({
    live: {
      live: false,
      fuse: true,
      show: true,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render if don't show", () => {
  const wrapper = shallow(generateComponent({
    live: {
      live: true,
      fuse: true,
      show: false,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders float version", () => {
  const wrapper = shallow(generateComponent({
    live: {
      float: true,
      live: true,
      fuse: false,
      show: true,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("getClasses returns default classes", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getClasses();
  expect(result).toMatchSnapshot();
});

it("getClasses returns float version", () => {
  const wrapper = shallow(generateComponent({
    live: {
      float: true,
      live: true,
      fuse: false,
      show: true,
    },
  }));
  const result = wrapper.instance().getClasses();
  expect(result).toMatchSnapshot();
});

it("getTextClasses returns default classes", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getTextClasses();
  expect(result).toMatchSnapshot();
});

it("handleLive returns if not live", () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().handleLiveChange({
    data: {
      live: null,
    },
  });
  expect(mockDispatch).not.toHaveBeenCalled();
});

it("handleLive returns data live is the same as props live", () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().handleLiveChange({
    data: {
      live: {
        live: true,
        fuse: false,
      },
    },
    live: {
      live: true,
      fuse: false,
    },
  });
  expect(mockDispatch).not.toHaveBeenCalled();
});

it("handleLive updates store when data live is live and props live is not", () => {
  const mockDispatch = jest.fn();
  liveActions.set = jest.fn();
  liveActions.reset = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().handleLiveChange({
    data: {
      live: {
        live: true,
        fuse: false,
      },
    },
    live: {
      live: false,
      fuse: false,
    },
  });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(liveActions.set).toHaveBeenCalledTimes(1);
  expect(liveActions.set).toHaveBeenCalledWith({
    isLive: true,
    isFuse: false,
  });
});

it("handleLive updates store when data is not live and props live is", () => {
  const mockDispatch = jest.fn();
  liveActions.set = jest.fn();
  liveActions.reset = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().handleLiveChange({
    data: {
      live: {
        live: false,
        fuse: false,
      },
    },
    live: {
      live: true,
      fuse: false,
    },
  });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(liveActions.reset).toHaveBeenCalledTimes(1);
});

it("parses query", () => {
  expect(print(LIVE_QUERY)).toMatchSnapshot();
});

// XXX FOR BETA
it("shows beta users a link to wowza page", () => {
  const mockDispatch = jest.fn();
  liveActions.set = jest.fn();
  liveActions.reset = jest.fn();
  const props = {
    dispatch: mockDispatch,
    live: { live: true, fuse: true },
    person: {
      authLoading: false,
      authorized: true,
    },
  };
  const wrapper = shallow(generateComponent(props));
  expect(wrapper.instance().getLink()).toEqual("https://live.newspring.cc");
  wrapper.setProps({ ...props, person: {
    authLoading: false, authorized: false,
  }});
  // use only wowza now
  expect(wrapper.instance().getLink()).toEqual("https://live.newspring.cc");
});
