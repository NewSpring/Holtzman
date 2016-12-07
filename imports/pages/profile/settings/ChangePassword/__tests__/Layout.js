import { shallow } from "enzyme";
import Layout from "../Layout";

const defaultProps = {
  submit: jest.fn(),
  save: jest.fn(),
  state: {
    current: "test",
    newP: "testtest",
    newPDup: "testtest",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Layout { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("renders disabled if missing prop", () => {
  const wrapper = shallow(generateComponent({
    state: {
      current: null,
    },
  }));
  expect(wrapper).toMatchSnapshot();
});
