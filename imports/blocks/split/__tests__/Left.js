import { shallow } from "enzyme";
import Left from "../Left";

const defaultProps = {
  classes: [],
  theme: null,
  scroll: false,
  width: null,
  background: false,
  image: null,
  styles: null,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return (
    <Left { ...newProps }>
      <h1>test</h1>
    </Left>
  );
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("adds scrollable class", () => {
  const wrapper = shallow(generateComponent({
    scroll: true,
  }));
  expect(wrapper).toMatchSnapshot();
});

it("adds width class", () => {
  const wrapper = shallow(generateComponent({
    width: "my-width-class",
  }));
  expect(wrapper).toMatchSnapshot();
});

it("adds background class and image", () => {
  const wrapper = shallow(generateComponent({
    background: true,
    image: "https://test.com/test.jpg",
  }));
  expect(wrapper).toMatchSnapshot();
});

it("adds appends additional classes", () => {
  const wrapper = shallow(generateComponent({
    classes: ["one", "two"],
  }));
  expect(wrapper).toMatchSnapshot();
});
