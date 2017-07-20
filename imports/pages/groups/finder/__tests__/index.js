import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { nav as navActions } from "../../../../data/store";
import { TemplateWithoutData } from "../";

jest.mock("../../../../deprecated/mixins/mixins.Header", () => {});
jest.mock("../../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};

const defaultProps = {
  dispatch: jest.fn(),
  router: {
    push: jest.fn(),
  },
  location: {
    query: {},
  },
  attributes: {
    tags: [{}, {}],
  },
  content: {
    loading: false,
    entries: [{}, {}],
  },
  latitude: 34.59189,
  longitude: -82.6196913,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <TemplateWithoutData { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders result if tags", () => {
  const wrapper = shallow(generateComponent({
    location: {
      query: {
        tags: [{}],
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders result if q", () => {
  const wrapper = shallow(generateComponent({
    location: {
      query: {
        q: "test",
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders result if campuses", () => {
  const wrapper = shallow(generateComponent({
    location: {
      query: {
        campuses: [{}],
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders result if schedules", () => {
  const wrapper = shallow(generateComponent({
    location: {
      query: {
        schedules: [{}],
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without attributes", () => {
  const wrapper = shallow(generateComponent({
    attributes: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders if content loading", () => {
  const wrapper = shallow(generateComponent({
    content: {
      loading: true,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
});

it("set content level nav when recieving props with location query", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setProps({
    location: {
      query: {
        q: "test",
      },
    },
  });
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledWith("BASIC_CONTENT");
});

it("set top level nav when recieving props without location query", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setProps({
    location: {
      query: {},
    },
  });
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
});

it("getResults resets state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ tags: ["test"], query: "test" });
  wrapper.instance().getResults();
  expect(wrapper.state().tags).toEqual([]);
  expect(wrapper.state().query).toBe(null);
});

it("getResults calls router with q and tags", () => {
  const mockPush = jest.fn();
  const wrapper = shallow(generateComponent({
    router: {
      push: mockPush,
    },
  }));
  wrapper.setState({ query: "test", tags: ["one", "two"] });
  wrapper.instance().getResults();
  expect(mockPush).toHaveBeenCalledTimes(1);
  expect(mockPush).toHaveBeenCalledWith({
    query: {
      q: "test",
      tags: "one,two",
    },
  });
});

it("inputOnChange updates tags and query", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ tags: ["one"], query: null });
  wrapper.instance().inputOnChange("test");
  expect(wrapper.state().tags).toEqual(["one"]);
  expect(wrapper.state().query).toEqual("test");
});

it("tagOnClick adds tag to state if not found", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().tagOnClick("one");
  expect(wrapper.state().tags).toEqual(["one"]);
});

it("tagOnClick removes tag from state if found", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ tags: ["one", "two"] });
  wrapper.instance().tagOnClick("one");
  expect(wrapper.state().tags).toEqual(["two"]);
});

it("submitTags calls preventDefault", () => {
  const wrapper = shallow(generateComponent());
  const mockPreventDefault = jest.fn();
  wrapper.instance().submitTags({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
});

it("findByQuery calls preventDefault and blurs the search", () => {
  const mockPreventDefault = jest.fn();
  const mockBlur = jest.fn();
  const mockGetElementById = jest.fn().mockReturnValue({
    blur: mockBlur,
  });
  document.getElementById = mockGetElementById;
  const wrapper = shallow(generateComponent());
  wrapper.instance().findByQuery({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockGetElementById).toHaveBeenCalledTimes(1);
  expect(mockGetElementById).toHaveBeenCalledWith("search");
  expect(mockBlur).toHaveBeenCalledTimes(1);
});
