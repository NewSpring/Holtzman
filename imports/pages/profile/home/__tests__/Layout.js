import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import Layout from "../Layout";

const defaultProps = {
  photo: "http://test.com/photo.jpg",
  person: {
    nickName: "jim",
    lastName: "bob",
    home: {
      city: "anderson",
    },
  },
  onToggle: jest.fn(),
  content: <h1>test</h1>,
  onUpload: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Layout { ...newProps } />;
};

Meteor.isCordova = false;

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders cordova version", () => {
  Meteor.isCordova = true;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("works without city", () => {
  const wrapper = shallow(generateComponent({
    person: {
      nickName: "jim",
      lastName: "bob",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
