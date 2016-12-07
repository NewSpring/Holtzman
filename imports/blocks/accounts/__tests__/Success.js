import { shallow } from "enzyme";
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
  expect(wrapper).toMatchSnapshot();
});

// XXX it doesn't actually work without first name
it("works without nick name", () => {
  const wrapper = shallow(generateComponent({
    person: {
      firstName: "jim",
    },
  }));
  expect(wrapper).toMatchSnapshot();
});
