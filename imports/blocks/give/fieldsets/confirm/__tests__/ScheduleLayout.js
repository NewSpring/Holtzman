import renderer from "react-test-renderer";
import ScheduleLayout, { Header } from "../ScheduleLayout";


jest.mock("moment", () => {
  return jest.fn((date) => ({
    format: (shape) => `${date} formatted as ${shape}`,
  }))
});

describe("Header", () => {
  const defaultProps = {
    override: null,
    scheduleToRecover: false,
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Header { ...newProps } />;
  };

  it("renders `Transfer Your Schedule` by default", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("renders `Review Your Schedule` if schedule to recover", () => {
    const result = renderer.create(generateComponent({
      scheduleToRecover: true,
    }));
    expect(result).toMatchSnapshot();
  });

  it("renders override if override", () => {
    const result = renderer.create(generateComponent({
      override: <span>hey</span>,
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("ScheduleLayout", () => {

  const defaultProps = {
    back: jest.fn(),
    changeAccounts: jest.fn(),
    goToStepOne: jest.fn(),
    header: <span>header</span>,
    payment: {
      type: "ach",
      accountNumber: "123456789",
    },
    savedAccount: {},
    schedules: {
      "123": { label: "123", frequency: "Now", start: "2016-11-18T00:26:48+00:00" },
      "234": { label: "234", frequency: "Later", start: "2016-11-18T00:26:48+00:00" },
    },
    scheduleToRecover: false,
    total: 12,
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <ScheduleLayout { ...newProps } />;
  };

  it("renders with props", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });
});
