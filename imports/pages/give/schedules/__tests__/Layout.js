import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import mockDate from "mockdate";
import { Meteor } from "meteor/meteor";
import Layout from "../Layout";

// XXX god bless you
mockDate.set("1/1/2000");

Meteor.user = jest.fn(() => true);

const defaultProps = {
  schedules: [
    {
      id: "1",
      details: [
        {
          amount: 2,
          account: {
            name: "test account",
          },
        },
      ],
      start: "2012-12-12",
      schedule: {
        description: "test",
        value: "test",
      },
    },
  ],
  accounts: [{}],
  schedulesReady: true,
  accountsReady: true,
  recoverableSchedules: [{}],
  person: {
    firstName: "jim",
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
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("works with nickName", () => {
  const wrapper = shallow(generateComponent({
    person: {
      nickName: "jimothy",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("works without recoverableSchedules", () => {
  const wrapper = shallow(generateComponent({
    recoverableSchedules: [],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if accounts not ready", () => {
  const wrapper = shallow(generateComponent({
    accountsReady: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if no accounts", () => {
  const wrapper = shallow(generateComponent({
    accounts: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if no accounts", () => {
  const wrapper = shallow(generateComponent({
    accounts: [],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders sign in message if no user", () => {
  Meteor.user = jest.fn(() => false);
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
  Meteor.user = jest.fn(() => true);
});

it("renders loading if no schedules", () => {
  const wrapper = shallow(generateComponent({
    schedules: [],
    schedulesReady: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders no schedules message", () => {
  const wrapper = shallow(generateComponent({
    schedules: [],
    schedulesReady: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without schedule details", () => {
  const props = clone(defaultProps);
  props.schedules[0].details = null;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without schedule details account", () => {
  const props = clone(defaultProps);
  props.schedules[0].details[0].account = null;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render schedule if no details", () => {
  const props = {
    schedules: [
      {
        id: "1",
        details: null,
        start: "2012-12-12",
        schedule: {
          description: "test",
          value: "test",
        },
      },
    ],
  };
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render schedule if no details account", () => {
  const props = {
    schedules: [
      {
        id: "1",
        details: [
          {
            amount: 2,
            account: null,
          },
        ],
        start: "2012-12-12",
        schedule: {
          description: "test",
          value: "test",
        },
      },
    ],
  };
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders one time completed schedules", () => {
  const props = {
    schedules: [
      {
        id: "1",
        details: [
          {
            amount: 2,
            account: {
              name: "test account",
            },
          },
        ],
        start: "1999-12-12",
        next: "1999-12-12",
        schedule: {
          description: "test",
          value: "One-Time",
        },
      },
    ],
  };
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render one time completed schedule if no details", () => {
  const props = {
    schedules: [
      // will render
      {
        id: "1",
        details: [
          {
            amount: 2,
            account: {
              name: "test account",
            },
          },
        ],
        start: "1999-12-12",
        next: "1999-12-12",
        schedule: {
          description: "test",
          value: "One-Time",
        },
      },
      // won't render
      {
        id: "2",
        details: null,
        start: "1999-12-12",
        next: "1999-12-12",
        schedule: {
          description: "test",
          value: "One-Time",
        },
      },
    ],
  };
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render one time completed schedule if no details account", () => {
  const props = {
    schedules: [
      // will render
      {
        id: "1",
        details: [
          {
            amount: 2,
            account: {
              name: "test account",
            },
          },
        ],
        start: "1999-12-12",
        next: "1999-12-12",
        schedule: {
          description: "test",
          value: "One-Time",
        },
      },
      // won't render
      {
        id: "2",
        details: [
          {
            amount: 2,
            account: null,
          },
        ],
        start: "1999-12-12",
        next: "1999-12-12",
        schedule: {
          description: "test",
          value: "One-Time",
        },
      },
    ],
  };
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});


it("doesn't render incompleted schedule as completed schedule", () => {
  const props = {
    schedules: [
      // incomplete
      {
        id: "1",
        details: [
          {
            amount: 2,
            account: {
              name: "test account",
            },
          },
        ],
        start: "2012-12-12",
        schedule: {
          description: "test",
          value: "test",
        },
      },
      // complete
      {
        id: "2",
        details: [
          {
            amount: 2,
            account: {
              name: "test name",
            },
          },
        ],
        start: "1999-12-12",
        next: "1999-12-12",
        schedule: {
          description: "test",
          value: "One-Time",
        },
      },
    ],
  };
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
it("expandedSchedule collapses the schedule if already expanded", () => {
  const mockEvent = {
    preventDefault: jest.fn(),
    currentTarget: {
      dataset: {
        id: "1",
      },
    },
  };
  const wrapper = shallow(generateComponent());
  wrapper.setState({ expandedSchedule: 1 });
  wrapper.instance().expandSchedule(mockEvent);
  expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
  expect(wrapper.state().expandedSchedule).toBe(null);
});

it("expandedSchedule expands the schedule if not expanded", () => {
  const mockEvent = {
    preventDefault: jest.fn(),
    currentTarget: {
      dataset: {
        id: "2",
      },
    },
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().expandSchedule(mockEvent);
  expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
  expect(wrapper.state().expandedSchedule).toBe(2);
});

it("collapseSchedule sets state to null", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().collapseSchedule();
  expect(wrapper.state().expandedSchedule).toBe(null);
});

it("formatDate returns a formatted data", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().formatDate("2012-12-12");
  expect(result).toBe("Dec 13, 2012");
});

it("capitalizeFirstLetter does that", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().capitalizeFirstLetter("test");
  expect(result).toBe("Test");
});
