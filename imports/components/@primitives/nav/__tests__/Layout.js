import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import NavLayout from "../Layout";

jest.mock("../Link", () => jest.fn());

const defaultProps = {
  classes: null,
  bgColor: "red",
  fgColor: "orange",
  reset: jest.fn(),
  path: "/path",
  theme: null,
  links: [{}, {}, {}, {}],
  modal: {},
  handleAction: jest.fn(),
  liked: {
    likes: ["1", "2"],
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <NavLayout { ...newProps } />;
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

it("layoutClasses returns default", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("layoutClasses appends additional classes", () => {
  const wrapper = shallow(generateComponent({
    classes: ["one", "two"],
  }));
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("layoutClasses accounts for light nav bar", () => {
  const wrapper = shallow(generateComponent({
    fgColor: "light",
  }));
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("isLiked returns true if liked", () => {
  Object.defineProperty(window.location, "pathname", {
    writable: true,
    value: "/test/1",
  });
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().isLiked()).toBe(true);
});

it("isLiked returns false if not liked", () => {
  Object.defineProperty(window.location, "pathname", {
    writable: true,
    value: "/test/11",
  });
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().isLiked()).toBe(false);
});
