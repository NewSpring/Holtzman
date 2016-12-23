import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import {
  SplitContainerWithoutData as SplitContainer,
} from "../";

const defaultProps = {
  classes: [],
  theme: null,
  styles: {
    color: "red",
  },
  nav: false,
  navigation: {
    visible: false,
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return (
    <SplitContainer { ...newProps }>
      <h1>test</h1>
    </SplitContainer>
  );
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

it("overrides with theme", () => {
  const wrapper = shallow(generateComponent({
    theme: "override",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("appends additional classes", () => {
  const wrapper = shallow(generateComponent({
    classes: ["one", "two"],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("adds nav styles if nav visible", () => {
  const wrapper = shallow(generateComponent({
    nav: true,
    navigation: {
      visible: true,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
