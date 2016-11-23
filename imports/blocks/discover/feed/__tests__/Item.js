import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import DiscoverItem from "../Item";

const defaultProps = {
  item: {
    link: "http://test.com",
    image: "http://test.com/test.jpg",
    topicName: "test topic",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <DiscoverItem { ...newProps } />;
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

it("preloader renders image loading component", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().preloader();
  expect(result).toMatchSnapshot();
});

it("renderElement renders image component", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().renderElement();
  expect(result).toMatchSnapshot();
});
