import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";

import Layout from "../Layout";

jest.mock("../Date", () => () => <div />);
jest.mock("../../../../components/forms/TagSelect", () => () => <span />);

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    GIVING_SCHEDULES: [{ value: "foo" }],
    START_DATES: [{ value: "bar" }],
    checked: false,
    frequencyClick: jest.fn(),
    onDayClick: jest.fn(),
    showDatePicker: false,
    start: "now",
    startClick: jest.fn(),
    toggleDatePicker: jest.fn(),
    toggleSchedule: jest.fn(),
  };

  return <Layout {...defaultProps} {...additionalProps} />
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("should render with minimal props", () => {
  const component = shallow(generateComponent());
  expect(shallowToJson(component)).toMatchSnapshot();
});

it("should render schedule options if checked", () => {
  const component = shallow(generateComponent({ checked: true }));
  expect(shallowToJson(component)).toMatchSnapshot();
});

it("should render the date picker if told to", () => {
  const component = shallow(generateComponent({ checked: true, showDatePicker: true }));
  expect(shallowToJson(component)).toMatchSnapshot();
});
