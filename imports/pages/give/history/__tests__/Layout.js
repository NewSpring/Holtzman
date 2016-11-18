import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Layout, {
  formatDate,
  monentize,
  TransactionDetail,
  TransactionCard,
} from "../Layout";

describe("formatDate", () => {
  it("returns formatted data", () => {
    const result = formatDate("2012-12-12");
    expect(result).toBe("Dec 12, 2012");
  });
});

describe("monentize", () => {
  const DEFAULT_VALUE = "$0.00";

  it("returns `$12.34` if number 12.34", () => {
    const value = 12.34;
    const result = monentize(value);
    expect(result).toBe(`$${value}`);
  });

  it("returns `$12.34` if string `12.34`", () => {
    const value = "12.34";
    const result = monentize(value);
    expect(result).toBe(`$${value}`);
  });

  it("removes everything except numbers, dots, and dashes", () => {
    const value = "!@#$%^&*()12abcdefg.`~`~{}[]34";
    const result = monentize(value);
    expect(result).toBe("$12.34");
  });

  it("has no decimals by default", () => {
    const value = 24;
    const result = monentize(value);
    expect(result).toBe("$24");
  });

  it("fixes to two decimals if greater than two", () => {
    const value = 24.2456788;
    const result = monentize(value);
    expect(result).toBe("$24.25");
  });

  it("fixes to two decimals if fixed is true", () => {
    const value = 12;
    const result = monentize(value, true);
    expect(result).toBe(`$${value}.00`);
  });

  it("adds commas for large values", () => {
    const value = 123456789;
    const result = monentize(value);
    expect(result).toBe("$123,456,789");
  });
});

describe("TransactionDetail", () => {
  const defaultProps = {
    transactionDetail: {
      amount: 2,
      account: {
        name: "account name",
      },
    },
    transaction: {
      date: "2012-12-12",
    },
    icon: true,
    status: null,
    failure: false,
    person: {
      firstName: "jim",
      lastName: "bob",
      photo: "http://test.com/test.jpg",
    },
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <TransactionDetail { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders with failure", () => {
    const wrapper = shallow(generateComponent({
      failure: true,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders with failure and status", () => {
    const wrapper = shallow(generateComponent({
      failure: true,
      status: "error",
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders without icon", () => {
    const wrapper = shallow(generateComponent({
      icon: false,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("TransactionCard", () => {
  const defaultProps = {
    transactionDetail: {},
    transaction: {
      id: "1",
      status: "default",
    },
    person: {},
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps
    };
    return <TransactionCard { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders pending version", () => {
    const wrapper = shallow(generateComponent({
      transaction: {
        id: "1",
        status: "PENDING",
      },
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders failed version", () => {
    const wrapper = shallow(generateComponent({
      transaction: {
        id: "1",
        status: "FAILED",
      },
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("Layout", () => {
  const defaultProps = {
    transactions: [
      {
        date: "2012-12-12",
        details: [
          { account: "test", amount: 2 },
          { account: "test", amount: 2 },
        ],
      },
      {
        date: "2012-12-12",
        details: [
          { account: "test", amount: 2 },
          { account: "test", amount: 2 },
        ],
      },
    ],
    ready: true,
    Loading: jest.fn(),
    done: false,
    changeFamily: jest.fn(),
    changeDates: jest.fn(),
    reloading: false,
    family: [],
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

  it("renders reloading version", () => {
    const wrapper = shallow(generateComponent({
      reloading: true,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders reloading if no transactions and not ready", () => {
    const wrapper = shallow(generateComponent({
      transactions: [],
      ready: false,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders no transactions if there are none and ready", () => {
    const wrapper = shallow(generateComponent({
      transactions: [],
      ready: true,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
