import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import SearchItem from "../Item";

const defaultProps = {
  item: {
    link: "http://test.com",
    title: "test item",
    description: "test description",
    image: "http://test.com/test.jpg",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SearchItem { ...newProps } />;
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

it("works with no image", () => {
  const wrapper = shallow(generateComponent({
    item: {
      link: "http://test.com",
      title: "test item",
      description: "test description",
      image: "null",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("cardClasses returns css string", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().cardClasses()).toMatchSnapshot();
});

it("gridClasses returns css string", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().gridClasses()).toMatchSnapshot();
});

it("gridItemClasses returns css string", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().gridItemClasses()).toMatchSnapshot();
});

it("pClasses returns css string", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().pClasses()).toMatchSnapshot();
});

it("bgClasses returns css array", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().bgClasses()).toMatchSnapshot();
});
