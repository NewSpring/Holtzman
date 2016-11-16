import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import cloneDeep from "lodash.clonedeep";
import { GroupCardWithoutData as GroupCard } from "../GroupCard";

const defaultProps = {
  group: {
    id: "1",
    photo: "http://test.com/test.jpg",
    name: "test group",
    schedule: {
      description: "test description",
    },
    distance: 2,
    tags: [
      { value: "one" },
      { value: "two" },
    ],
    type: "test type",
    kidFriendly: true,
    demographic: "test demographic",
    campus: {
      name: "Anderson",
    },
  },
  router: {
    push: jest.fn(),
  },
  onHover: jest.fn(),
};

const generateComponent = (additionalProps ={}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <GroupCard { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders default photo", () => {
  const props = cloneDeep(defaultProps);
  props.group.photo = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without schedule", () => {
  const props = cloneDeep(defaultProps);
  props.group.schedule = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without schedule description", () => {
  const props = cloneDeep(defaultProps);
  props.group.schedule.description = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without distance", () => {
  const props = cloneDeep(defaultProps);
  props.group.distance = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render tag for type `Interests`", () => {
  const props = cloneDeep(defaultProps);
  props.group.type = "Interests";
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render kid friendly tag if no", () => {
  const props = cloneDeep(defaultProps);
  props.group.kidFriendly = false;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render demographic tag if no", () => {
  const props = cloneDeep(defaultProps);
  props.group.demographic = false;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render campus tag if no campus", () => {
  const props = cloneDeep(defaultProps);
  props.group.campus = false;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render campus tag if no campus name", () => {
  const props = cloneDeep(defaultProps);
  props.group.campus.name = false;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
