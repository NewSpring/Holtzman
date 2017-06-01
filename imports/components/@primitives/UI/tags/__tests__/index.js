import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import { TagWithoutData as Tag } from "../";
import { getSpecWrappers } from "../../../../../util/tests/data-spec.js";

Meteor.isCordova = false;

const defaultProps = {
  className: "test class",
  onClick: jest.fn(),
  style: { color: "red" },
  clickAble: true,
  active: true,
  val: "testVal",
  canBeActive: true,
  label: "testLabel",
  urlKey: "testUrl",
  router: {
    createPath: jest.fn(),
    replace: jest.fn(),
  },
  location: {
    query: {
      testUrl: "one,two",
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Tag { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders unclickable version", () => {
  const wrapper = shallow(generateComponent({
    clickAble: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders active version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ isActive: true });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders cordova active version", () => {
  Meteor.isCordova = true;
  const wrapper = shallow(generateComponent());
  wrapper.setState({ isActive: true });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
  Meteor.isCordova = false;
});

it("works with val", () => {
  const wrapper = shallow(generateComponent({
    label: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates active state on mount if active", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.state().isActive).toBe(true);
});

it("doesn't active state on mount if not active", () => {
  const wrapper = shallow(generateComponent({
    active: false,
    canBeActive: false,
  }));
  expect(wrapper.state().isActive).toBe(false);
});

it("updates active state when recieving new props", () => {
  const wrapper = shallow(generateComponent({
    active: true,
    canBeActive: false,
  }));
  wrapper.setProps({
    canBeActive: true,
  });
  expect(wrapper.state().isActive).toBe(true);
  wrapper.setProps({
    canBeActive: false,
  });
  expect(wrapper.state().isActive).toBe(false);
});

it("calls stopPropagation on click", () => {
  const mockStopPropagation = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.instance().onClick({
    stopPropagation: mockStopPropagation,
  });
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
});

it("doesn't do anything if not clickable", () => {
  const mockOnClick = jest.fn();
  const wrapper = shallow(generateComponent({
    clickAble: false,
    onClick: mockOnClick,
  }));
  wrapper.instance().onClick();
  expect(wrapper.state().isActive).toBe(true);
  expect(mockOnClick).not.toHaveBeenCalled();
});

it("changes state if canBeActive", () => {
  const wrapper = shallow(generateComponent());
  const isActive = wrapper.state().isActive;
  wrapper.instance().onClick();
  expect(wrapper.instance().isActive).not.toBe(isActive);
});

it("calls onClick prop if available", () => {
  const mockCreatePath = jest.fn();
  const mockReplace = jest.fn();
  const mockOnClick = jest.fn();
  const wrapper = shallow(generateComponent({
    onClick: mockOnClick,
    router: {
      createPath: mockCreatePath,
      replace: mockReplace,
    },
  }));

  wrapper.instance().onClick();

  expect(mockOnClick).toHaveBeenCalledTimes(1);
  expect(mockCreatePath).not.toHaveBeenCalled();
  expect(mockReplace).not.toHaveBeenCalled();
});

it("calls router with location and path if no onClick function", () => {
  const mockCreatePath = jest.fn().mockReturnValue("testNewPath");
  const mockReplace = jest.fn();
  const wrapper = shallow(generateComponent({
    onClick: null,
    router: {
      createPath: mockCreatePath,
      replace: mockReplace,
    },
  }));

  wrapper.instance().onClick();

  expect(mockCreatePath).toHaveBeenCalledTimes(1);
  expect(mockCreatePath).toHaveBeenCalledWith({
    query: {
      testUrl: "one,two,testval",
    },
  });
  expect(mockReplace).toHaveBeenCalledTimes(1);
  expect(mockReplace).toHaveBeenCalledWith("testNewPath");
});

it("isInQueryString returns false if no query", () => {
  const wrapper = shallow(generateComponent());
  const props = {
    val: "testVal",
    urlKey: "testKey",
    location: {
      query: null,
    },
  };
  const result = wrapper.instance().isInQueryString(props);
  expect(result).toBe(false);
});

it("isInQueryString returns query does not contain urlKey", () => {
  const wrapper = shallow(generateComponent());
  const props = {
    val: "testVal",
    urlKey: "testKey",
    location: {
      query: {
        notKey: "notKey",
      },
    },
  };
  const result = wrapper.instance().isInQueryString(props);
  expect(result).toBe(false);
});

it("isInQueryString return true if query contains urlKey", () => {
  const wrapper = shallow(generateComponent());
  const props = {
    val: "testVal",
    urlKey: "testKey",
    location: {
      query: {
        testKey: "testVal",
      },
    },
  };
  const result = wrapper.instance().isInQueryString(props);
  expect(result).toBe(true);
});

it("should not show the icon span if icon shouldn't show", () => {
  const wrapper = shallow(generateComponent({
    active: false,
    canBeActive: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  const iconSpan = getSpecWrappers(wrapper, "iconSpan");
  expect(iconSpan.length).toEqual(0);
});

it("should show the icon span if iconClass is used", () => {
  const wrapper = shallow(generateComponent({
    active: false,
    canBeActive: false,
    iconClass: "icon-arrow-up",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  const iconSpan = getSpecWrappers(wrapper, "iconSpan");
  expect(iconSpan.length).toEqual(1);
});

it("should show the X icon if active and clickable", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  const iconSpan = getSpecWrappers(wrapper, "iconSpan");
  expect(iconSpan.length).toEqual(1);
});
