import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Err from "../Error.js";

const defaultProps = {
  msg: "test msg",
  error: {
    message: "another message",
  },
  style: {
    color: "red",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Err { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders with error.error", () => {
  const wrapper = shallow(generateComponent({
    error: {
      error: "error message",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders default message if no error message", () => {
  const wrapper = shallow(generateComponent({
    error: {},
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
