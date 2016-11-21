import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import FeedItemSkeleton from "../FeedItemSkeleton";

const generateComponent = () => (
  <FeedItemSkeleton />
);

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("backgroundStyles returns styles", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().backgroundStyles();
  expect(result).toMatchSnapshot();
});

it("titleStyles returns styles", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().titleStyles();
  expect(result).toMatchSnapshot();
});

it("subtitleStyles returns styles", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().subtitleStyles();
  expect(result).toMatchSnapshot();
});

it("subsubtitleStyles returns styles", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().subsubtitleStyles();
  expect(result).toMatchSnapshot();
});
