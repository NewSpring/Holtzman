import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Success from "../Success";

const defaultProps = {
  person: {
    nickName: "jimothy",
  },
  onExit: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Success { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

// XXX it doesn't actually work without first name
it("works without nick name", () => {
  const wrapper = shallow(generateComponent({
    person: {
      firstName: "jim",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
