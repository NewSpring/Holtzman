import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import DayPicker from "react-day-picker";
import mockDate from "mockdate";
import DateComponent from "../Date";

jest.mock("react-day-picker", () => jest.fn());

const defaultProps = {
  format: jest.fn(),
  defaultValue: "test",
  today: true,
  past: true,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <DateComponent { ...newProps } />;
};

// XXX god bless you
mockDate.set("1/1/2000");

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders date picker", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ showDatePicker: true });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("onDayClick returns if disabled", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().onDayClick({}, 23, { selected: true, disabled: true });
  expect(wrapper.state().selectedDay).toBe(null);
});

it("onDayClick updates state if not disabled or selected", () => {
  const wrapper = shallow(generateComponent());
  const date = new Date();
  wrapper.instance().onDayClick({}, date, { selected: false, disabled: false });
  expect(wrapper.state().selectedDay).toBe(date);
});

it("onDayClick updates state to null if selected", () => {
  const wrapper = shallow(generateComponent());
  const date = new Date();
  wrapper.instance().onDayClick({}, date, { selected: true, disabled: false });
  expect(wrapper.state().selectedDay).toBe(null);
});

it("toggle updates state", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.state().showDatePicker).toBe(false);
  wrapper.instance().toggle();
  expect(wrapper.state().showDatePicker).toBe(true);
  wrapper.instance().toggle();
  expect(wrapper.state().showDatePicker).toBe(false);
});
