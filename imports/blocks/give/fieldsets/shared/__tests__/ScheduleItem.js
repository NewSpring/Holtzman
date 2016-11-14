import renderer from "react-test-renderer";
import { ScheduleItem } from "../";

const defaultProps = {
  schedule: {
    start: "1912-12-12T19:00:32+00:00",
    label: "Cat Fund",
    frequency: "Every Day",
  },
  total: 12.12,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <ScheduleItem { ...newProps } />;
};

it("should render with props", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});
