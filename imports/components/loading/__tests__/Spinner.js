import { shallow } from "enzyme";
import { reset, startBuffering } from "aphrodite/lib/inject";
import Spinner, { getClasses } from "../Spinner";

const defaultProps = {
  theme: null,
  styles: {
    color: "red",
  },
  classes: null,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Spinner { ...newProps } />;
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
  expect(wrapper).toMatchSnapshot();
});

it("overrides with theme", () => {
  const wrapper = shallow(generateComponent({
    theme: "my theme",
  }));
  expect(wrapper).toMatchSnapshot();
});

it("appends classes", () => {
  const wrapper = shallow(generateComponent({
    classes: "one two",
  }));
  expect(wrapper).toMatchSnapshot();
});

it("getClasses returns default", () => {
  const result = getClasses([]);
  expect(result).toMatchSnapshot();
});

it("getClasses merges classes passed in", () => {
  const result = getClasses(["one", "two"]);
  expect(result).toMatchSnapshot();
});
