import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import { Meteor } from "meteor/meteor";
import Layout from "../Layout";

Meteor.settings.public.rock.baseURL = "http://rock.rock";

const defaultProps = {
  group: {
    name: "test group",
    photo: "http://test.com/test.jpg",
    description: "test description",
    id: "1",
    entityId: "2",
    schedule: {
      description: "schedule description",
    },
    locations: [
      {
        location: {
          city: "anderson",
          state: "sc",
        },
      },
    ],
    campus: {
      name: "anderson",
    },
    kidFriendly: true,
    ageRange: ["1", "2"],
    members: [
      {
        person: {
          photo: "http://test.com/person.jpg",
        },
        status: true,
      },
      {
        person: {
          photo: "http://test.com/person.jpg",
        },
        status: false,
      },
    ],
    tags: ["one", "two"],
    type: "test",
    demographic: "test",
  },
  leaders: [
    {
      person: {
        photo: "http://test.com/jim.jpg",
        firstName: "jim",
        lastName: "bob",
      },
    },
    {
      person: {
        photo: "http://test.com/tom.jpg",
        nickName: "tom",
        lastName: "bob",
      },
    },
  ],
  isLeader: false,
  join: jest.fn(),
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
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders leader version", () => {
  const wrapper = shallow(generateComponent({
    isLeader: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without schedule", () => {
  const props = clone(defaultProps);
  props.group.schedule = null;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without schedule description", () => {
  const props = clone(defaultProps);
  props.group.schedule.description = null;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without group locations", () => {
  const props = clone(defaultProps);
  props.group.locations = null;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without campus", () => {
  const props = clone(defaultProps);
  props.group.campus = null;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders adult only version", () => {
  const props = clone(defaultProps);
  props.group.kidFriendly = false;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render Interest type tag", () => {
  const props = clone(defaultProps);
  props.group.type = "Interests";
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render demographic tag if none", () => {
  const props = clone(defaultProps);
  props.group.demographic = null;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
