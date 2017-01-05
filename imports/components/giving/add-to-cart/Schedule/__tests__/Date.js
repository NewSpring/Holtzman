
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";

import Date from "../Date";
jest.mock("react-day-picker", () => {
  const component = () => <div />;
  component.DateUtils = {
    isSameDay: jest.fn(),
    isPastDay: jest.fn(),
  };
  return component;
});

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    start: null,
    onDayClick: jest.fn(() => {}),
    toggleDatePicker: jest.fn(() => {}),
  };

  return <Date {...defaultProps} {...additionalProps} />
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
