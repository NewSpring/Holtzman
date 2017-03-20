import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import Layout from "../Layout";

const defaultProps = {
  person: {
    nickName: "jimothy",
    firstName: "jim",
    lastName: "bob",
    photo: "http://test.com/test.jpg",
    home: {
      city: "anderson",
      state: "SC",
    },
  },
  mobile: false,
  onUpload: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return (
    <Layout { ...newProps }>
      <h1>test</h1>
    </Layout>
  );
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("says `Profile` if no nick name", () => {
  const props = clone(defaultProps);
  props.person.nickName = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("works without a photo", () => {
  const props = clone(defaultProps);
  props.person.photo = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
