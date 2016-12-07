import { shallow } from "enzyme";
import cloneDeep from "lodash.clonedeep";
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
      },
      {
        person: {
          photo: "http://test.com/person.jpg",
        },
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
  expect(wrapper).toMatchSnapshot();
});

it("renders leader version", () => {
  const wrapper = shallow(generateComponent({
    isLeader: true,
  }));
  expect(wrapper).toMatchSnapshot();
});

it("renders without schedule", () => {
  const props = cloneDeep(defaultProps);
  props.group.schedule = null;
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("renders without schedule description", () => {
  const props = cloneDeep(defaultProps);
  props.group.schedule.description = null;
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("renders without group locations", () => {
  const props = cloneDeep(defaultProps);
  props.group.locations = null;
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("renders without campus", () => {
  const props = cloneDeep(defaultProps);
  props.group.campus = null;
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("renders adult only version", () => {
  const props = cloneDeep(defaultProps);
  props.group.kidFriendly = false;
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("doesn't render Interest type tag", () => {
  const props = cloneDeep(defaultProps);
  props.group.type = "Interests";
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("doesn't render demographic tag if none", () => {
  const props = cloneDeep(defaultProps);
  props.group.demographic = null;
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
