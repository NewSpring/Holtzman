import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Layout from "../Layout";

const defaultProps = {
  tags: [{ value: "test" }, { value: "test" }],
  tagOnClick: jest.fn(),
  submitTags: jest.fn(),
  canSearchTags: true,
  findByQuery: jest.fn(),
  inputOnChange: jest.fn(),
  content: [{}, {}],
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Layout {...newProps} />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders disabled tags", () => {
  const wrapper = shallow(
    generateComponent({
      canSearchTags: false,
    }),
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if no tags", () => {
  const wrapper = shallow(
    generateComponent({
      tags: [],
      campuses: [],
    }),
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
