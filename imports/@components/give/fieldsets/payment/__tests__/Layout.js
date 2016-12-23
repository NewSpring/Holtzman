import renderer from "react-test-renderer";
import Layout, { Header, NextButton } from "../Layout";

describe("Header", () => {
  const defaultProps = {};
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
      override: <span>header</span>,
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("NextButton", () => {
  const defaultProps = {
    next: jest.fn(),
    payment: {},
  };
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <NextButton { ...newProps } />;
  };

  it("renders disabled styles if no ach or cc", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("renders enabled styles if ach", () => {
    const result = renderer.create(generateComponent({
      payment: {
        type: "ach",
        accountNumber: "1234",
        routingNumber: "2345",
      },
    }));
    expect(result).toMatchSnapshot();
  });

  it("renders enabled styles if cc", () => {
    const result = renderer.create(generateComponent({
      payment: {
        type: "cc",
        cardNumber: "4111111111111111",
        expiration: "12/34",
        ccv: "111",
      },
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("Layout", () => {
  const defaultProps = {
    back: jest.fn(),
    children: <span>children</span>,
    header: <span>header</span>,
    formatExp: jest.fn(),
    next: jest.fn(),
    payment: {},
    saveData: jest.fn(),
    saveName: jest.fn(),
    savedAccount: {},
    savePayment: jest.fn(),
    shouldSaveState: false,
    schedule: { start: null },
    toggle: jest.fn(),
    toggles: null,
    transactionType: "default",
    validate: jest.fn(),
  };
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Layout { ...newProps } />;
  };

  it("renders default toggles by default", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("renders custom toggles if passed", () => {
    const result = renderer.create(generateComponent({
      toggles: ["Meow", "Woof"],
    }));
    expect(result).toMatchSnapshot();
  });
});
