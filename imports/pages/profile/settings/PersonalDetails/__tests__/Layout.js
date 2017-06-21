import { mount, shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { clone } from "ramda";
import Validate from "../../../../../util/validate";
import Layout from "../Layout";

const defaultProps = {
  submit: jest.fn(),
  person: {
    campus: {
      id: "1",
      value: "anderson",
    },
    firstName: "jim",
    lastName: "bob",
    nickName: "jimothy",
    email: "test@test.com",
    birthDay: 1,
    birthMonth: 1,
    birthYear: "2000",
  },
  months: [{ label: "Jan", value: 1 }],
  saveMonth: jest.fn(),
  days: [{ label: 1, value: 1 }],
  years: [{ label: 2000, value: 2000 }],
  campuses: [{ label: "anderson", value: 1 }],
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Layout { ...newProps } />;
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
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without person campus", () => {
  const props = clone(defaultProps);
  props.person.campus = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without campuses", () => {
  const wrapper = shallow(generateComponent({
    campuses: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("submit calls submit with values in inputs", () => {
  Validate.isEmail = jest.fn(() => true);
  const mockPreventDefault = jest.fn();
  const mockSubmit = jest.fn();
  const wrapper = mount(generateComponent({
    submit: mockSubmit,
  }));
  wrapper.instance().submit({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockSubmit).toHaveBeenCalledWith({
    NickName: 'jimothy',
    FirstName: 'jim',
    LastName: 'bob',
    Email: 'test@test.com',
    BirthMonth: 1,
    BirthDay: 1,
    BirthYear: 2000,
    Campus: 1
  });
});

it("displays a different note if the email is @newspring", () => {
  const wrapper = shallow(generateComponent({
    person: {
      email: "test@newspring.cc",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
})
