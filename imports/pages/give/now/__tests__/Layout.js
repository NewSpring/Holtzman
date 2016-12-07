import { shallow } from "enzyme";
import Layout from "../Layout";

const defaultProps = {
  alive: true,
  accounts: {
    loading: false,
    accounts: [
      {
        name: "test",
        images: [],
        image: null,
        summary: "test summary",
      },
      {
        name: "test",
        images: [],
        image: null,
        summary: "test summary",
      },
    ],
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

it("renders not alive version", () => {
  const wrapper = shallow(generateComponent({
    alive: false,
  }));
  expect(wrapper).toMatchSnapshot();
});

it("renders loading version", () => {
  const wrapper = shallow(generateComponent({
    accounts: {
      loading: true,
    },
  }));
  expect(wrapper).toMatchSnapshot();
});
