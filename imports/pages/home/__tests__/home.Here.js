import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import HomeHero from "../home.Hero";

const defaultProps = {
  item: {
    title: "test",
    channelName: "articles",
    meta: {
      date: "12-12-2012",
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <HomeHero { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders unready version", () => {
  const wrapper = shallow(generateComponent({
    item: {},
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
