import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import mockDate from "mockdate";
jest.mock("../../../../../util/inAppLink", () => jest.fn());
import inAppLink from "../../../../../util/inAppLink";
import LikesItem from "../Item";

// XXX god bless you
mockDate.set("1/1/2000");

const defaultProps = {
  like: {
    link: "http://test.com/1",
    category: "test category",
    image: "http://test.com/1.jpg",
    icon: "test-icon",
    date: "12-12-2012",
  },
  native: false,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <LikesItem { ...newProps } />;
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

it("imageclasses returns array of css classes", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().imageclasses).toMatchSnapshot();
});

it("containerClasses returns non native version", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().containerClasses()).toMatchSnapshot();
});

it("containerClasses returns native version", () => {
  const wrapper = shallow(generateComponent({
    native: true,
  }));
  expect(wrapper.instance().containerClasses()).toMatchSnapshot();
});

it("preloader renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().preloader()).toMatchSnapshot();
});

it("renderElement renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().renderElement()).toMatchSnapshot();
});

it("onClick calls inAppLink with event", () => {
  const mockEvent = {
    currentTarget: {
      href: "https://test.com",
    },
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().onClick(mockEvent);
  expect(inAppLink).toHaveBeenCalledTimes(1);
  expect(inAppLink).toHaveBeenCalledWith(mockEvent);
  inAppLink.mockClear();
});

it("onClick does not call inAppLink if localhost link", () => {
  const mockEvent = {
    currentTarget: {
      href: "https://localhost.com",
    },
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().onClick(mockEvent);
  expect(inAppLink).not.toHaveBeenCalled();
  inAppLink.mockClear();
});

it("getDate returns formatted date", () => {
  const mockEntry = {
    date: "12-12-2012",
  };
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getDate(mockEntry);
  expect(result).toBe("Dec 12, 2012");
});

it("getDate returns shortened date if this year", () => {
  const mockEntry = {
    date: "12-12-2000",
  };
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getDate(mockEntry);
  expect(result).toBe("Dec 12");
});

it("iconClasses returns css class string", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().iconClasses).toMatchSnapshot();
});
