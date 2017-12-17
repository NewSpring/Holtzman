import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import Layout from "../Layout";

const defaultProps = {
  recoverableSchedules: [
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
      },
    },
  ],
  accounts: [{}],
  cancelSchedule: jest.fn(),
  confirm: jest.fn(),
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

it("renders without recoverableSchedules", () => {
  const wrapper = shallow(generateComponent({
    recoverableSchedules: [],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("does not render recoverableSchedule if it has a gateway", () => {
  const props = clone(defaultProps);
  props.recoverableSchedules[0].gateway = "test gateway";
  const wrapper = shallow(generateComponent(props));
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

it("does not render recoverableSchedule if no details", () => {
  const props = clone(defaultProps);
  delete props.recoverableSchedules[0].details;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("does not render recoverableSchedule if no account", () => {
  const props = clone(defaultProps);
  delete props.recoverableSchedules[0].details[0].account;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("expands the schedule if it matches state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ expandedSchedule: 1 });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates the state on mount if recoverableSchedule", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.state().expandedSchedule).toBe(1);
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
  expect(result).toBe("Dec 12, 2012");
});

const DEFAULT_VALUE = "$0.00";

it("returns `$12.34` if number 12.34", () => {
  const wrapper = shallow(generateComponent());
  const value = 12.34;
  const result = wrapper.instance().monentize(value);
  expect(result).toBe(`${value}`);
});

it("returns `$12.34` if string `12.34`", () => {
  const wrapper = shallow(generateComponent());
  const value = "12.34";
  const result = wrapper.instance().monentize(value);
  expect(result).toBe(`${value}`);
});

it("removes everything except numbers, dots, and dashes", () => {
  const wrapper = shallow(generateComponent());
  const value = "!@#$%^&*()12abcdefg.`~`~{}[]34";
  const result = wrapper.instance().monentize(value);
  expect(result).toBe("12.34");
});

it("has no decimals by default", () => {
  const wrapper = shallow(generateComponent());
  const value = 24;
  const result = wrapper.instance().monentize(value);
  expect(result).toBe("24");
});

it("fixes to two decimals if greater than two", () => {
  const wrapper = shallow(generateComponent());
  const value = 24.2456788;
  const result = wrapper.instance().monentize(value);
  expect(result).toBe("24.25");
});

it("fixes to two decimals if fixed is true", () => {
  const wrapper = shallow(generateComponent());
  const value = 12;
  const result = wrapper.instance().monentize(value, true);
  expect(result).toBe(`${value}.00`);
});

it("adds commas for large values", () => {
  const wrapper = shallow(generateComponent());
  const value = 123456789;
  const result = wrapper.instance().monentize(value);
  expect(result).toBe("123,456,789");
});

it("capitalizeFirstLetter does that", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().capitalizeFirstLetter("test");
  expect(result).toBe("Test");
});
