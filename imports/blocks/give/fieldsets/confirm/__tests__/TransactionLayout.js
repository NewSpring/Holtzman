import renderer from "react-test-renderer";
import TransactionLayout, { Header } from "../TransactionLayout";

describe("Header", () => {
  const defaultProps = {
    override: null,
    personal: {
      firstName: "Jim",
    },
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };

    return <Header { ...newProps } />;
  };

  it("renders default if no override", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("renders override if override", () => {
    const result = renderer.create(generateComponent({
      override: <span>hey</span>,
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("TransactionLayout", () => {
  const defaultProps = {
    back: jest.fn(),
    changeAccounts: jest.fn(),
    completeGift: jest.fn(),
    goToStepOne: jest.fn(),
    header: <span>header</span>,
    payment: {
      type: "ach",
      accountNumber: "123456789",
    },
    personal: {
      firstName: "Jim",
    },
    savedAccount: {},
    schedules: {},
    scheduleToRecover: false,
    total: 12,
    transactions: [
      { label: "123", value: 5 },
      { label: "234", value: 7 },
    ],
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };

    return <TransactionLayout { ...newProps } />;
  };

  it("should render with props", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });
});
