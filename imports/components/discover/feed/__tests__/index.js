import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { print } from "graphql-tag/printer";
import {
  DiscoverWithoutData as Discover,
  DISCOVER_QUERY,
} from "../";

const defaultProps = {
  discover: {
    loading: false,
    items: [
      { status: "featured" },
      { status: "featured" },
      { status: "featured" },
      { status: "open" },
      { status: "open" },
      { status: "open" },
    ],
  },
  recentLikes: {
    loading: false,
  }
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Discover { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render if loading", () => {
  const wrapper = shallow(generateComponent({
    discover: {
      loading: true,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query correctly", () => {
  expect(print(DISCOVER_QUERY)).toMatchSnapshot();
});
