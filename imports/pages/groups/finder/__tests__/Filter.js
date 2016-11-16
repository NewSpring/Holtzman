import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { FilterWithoutData as Filter } from "../Filter";

const defaultProps = {
  router: {
    push: jest.fn(),
  },
  location: {
    query: {
      q: "test",
    },
  },
  toggleSearch: jest.fn(),
  attributes: {
    tags: [{}, {}],
  },
  showSearch: true,
  showTags: true,
  q: "test",
  campusLocations: {
    campuses: [{}, {}],
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Filter { ...newProps } />;
};

document.getElementById = jest.fn().mockReturnValue({
  blur: jest.fn(),
});

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without tags", () => {
  const wrapper = shallow(generateComponent({
    attributes: {
      tags: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without campuses", () => {
  const wrapper = shallow(generateComponent({
    campusLocations: {
      campuses: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("hides tags when false", () => {
  const wrapper = shallow(generateComponent({
    showTags: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("hides search when false", () => {
  const wrapper = shallow(generateComponent({
    showSearch: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("findByQuery calls preventDefault if event", () => {
  const wrapper = shallow(generateComponent());
  const mockPreventDefault = jest.fn();
  wrapper.instance().findByQuery({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
});

it("findByQuery blurs the search input", () => {
  const mockBlur = jest.fn();
  const mockGetElementById = jest.fn().mockReturnValue({
    blur: mockBlur,
  });
  document.getElementById = mockGetElementById;
  const wrapper = shallow(generateComponent());
  wrapper.instance().findByQuery();
  expect(mockGetElementById).toHaveBeenCalledTimes(1);
  expect(mockGetElementById).toHaveBeenCalledWith("search");
  expect(mockBlur).toHaveBeenCalledTimes(1);
});

it("findByQuery sets query state to null", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ query: "test" });
  wrapper.instance().findByQuery();
  expect(wrapper.state().query).toBe(null);
});

it("findByQuery updates router with location", () => {
  const mockPush = jest.fn();
  const wrapper = shallow(generateComponent({
    router: {
      push: mockPush,
    },
  }));
  wrapper.instance().findByQuery();
  expect(mockPush).toHaveBeenCalledTimes(1);
  expect(mockPush).toHaveBeenCalledWith({
    query: {
      q: "test",
    },
  });
});

it("findByQuery updates router with location from state", () => {
  const mockPush = jest.fn();
  const wrapper = shallow(generateComponent({
    router: {
      push: mockPush,
    },
  }));
  wrapper.setState({ query: "thing" });
  wrapper.instance().findByQuery();
  expect(mockPush).toHaveBeenCalledTimes(1);
  expect(mockPush).toHaveBeenCalledWith({
    query: {
      q: "thing",
    },
  });
});

it("findByQuery updates router with blank object if no location query", () => {
  const mockPush = jest.fn();
  const wrapper = shallow(generateComponent({
    location: {},
    router: {
      push: mockPush,
    },
  }));
  wrapper.instance().findByQuery();
  expect(mockPush).toHaveBeenCalledTimes(1);
  expect(mockPush).toHaveBeenCalledWith({
    query: {},
  });
});

it("removeQuery calls preventDefault", () => {
  const wrapper = shallow(generateComponent());
  const mockPreventDefault = jest.fn();
  wrapper.instance().removeQuery({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
});

it("removeQuery calls toggleSearch", () => {
  const mockToggleSearch = jest.fn();
  const wrapper = shallow(generateComponent({
    toggleSearch: mockToggleSearch,
  }));
  wrapper.instance().removeQuery();
  expect(mockToggleSearch).toHaveBeenCalledTimes(1);
});

it("removeQuery set state to null", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ query: "test" });
  wrapper.instance().removeQuery();
  expect(wrapper.state().query).toBe(null);
});

it("removeQuery updates router with blank object", () => {
  const mockPush = jest.fn();
  const wrapper = shallow(generateComponent({
    router: {
      push: mockPush,
    },
  }));
  wrapper.instance().removeQuery();
  expect(mockPush).toHaveBeenCalledTimes(1);
  expect(mockPush).toHaveBeenCalledWith({
    query: {},
  });
});

it("inputOnChange updates query state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().inputOnChange("test");
  expect(wrapper.state().query).toBe("test");
});
