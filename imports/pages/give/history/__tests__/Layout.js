import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";

import Layout, { TransactionList } from "../Layout";

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
    filterTransactions: jest.fn(),
    onPrintClick: jest.fn(),
    printLoading: false,
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

  it("renders with negative transactions", () => {
    const transactions = [
      {
        date: "2012-12-12",
        details: [
          { account: "test", amount: -1 },
        ],
      },
      {
        date: "2012-12-12",
        details: [
          { account: "Other Test", amount: 2 },
          { account: "Third Test", amount: 2 },
        ],
      },
    ];
    const wrapper = shallow(generateComponent({ transactions }));
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

  it("renders with print loading false and there are transactions", () => {
    const transactions = [
      {
        date: "2012-12-12",
        details: [
          { account: "test", amount: -1 },
        ],
      },
      {
        date: "2012-12-12",
        details: [
          { account: "Other Test", amount: 2 },
          { account: "Third Test", amount: 2 },
        ],
      },
    ];
    const wrapper = shallow(generateComponent({ transactions }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders with print loading true and there are transactions", () => {
    const transactions = [
      {
        date: "2012-12-12",
        details: [
          { account: "test", amount: -1 },
        ],
      },
      {
        date: "2012-12-12",
        details: [
          { account: "Other Test", amount: 2 },
          { account: "Third Test", amount: 2 },
        ],
      },
    ];
    const wrapper = shallow(generateComponent({
      transactions,
      printLoading: true
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

  it("renders transactions across years", () => {
    const transactions = [
      {
        date: "2012-12-12",
        person: {nickname: "1", photo:"1",firstName:"1",lastName:"1"},
        details: [
          { account: "test", amount: 2 },
          { account: "test", amount: 2 },
        ],
      },
      {
        date: "2013-12-12",
        person: {nickname: "1", photo:"1",firstName:"1",lastName:"1"},
        details: [
          { account: "Other Test", amount: 2 },
          { account: "Third Test", amount: 2 },
        ],
      },
    ];
    const wrapper = shallow(generateComponent({ transactions }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("TransactionList", () => {
  const defaultProps = {
    transactions: [
      {
        date: "2012-12-11",
        details: [
          { account: "test", amount: 1 },
          { account: "test", amount: 2 },
        ],
      },
      {
        date: "2012-12-12",
        details: [
          { account: "test", amount: 3 },
          { account: "test", amount: 4 },
        ],
      },
    ],
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <TransactionList { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders transactions across years", () => {
    const transactions = [
      {
        date: "2012-12-12",
        person: {nickname: "1", photo:"1",firstName:"1",lastName:"1"},
        details: [
          { account: "test", amount: 1 },
          { account: "test", amount: 2 },
        ],
      },
      {
        date: "2013-12-12",
        person: {nickname: "1", photo:"1",firstName:"1",lastName:"1"},
        details: [
          { account: "test", amount: 3 },
          { account: "test", amount: 4 },
        ],
      },
    ];
    const wrapper = shallow(generateComponent({ transactions }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
