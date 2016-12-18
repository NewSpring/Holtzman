import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import Layout from "../Layout";

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

  it("renders no transactions if there are none and ready", () => {
    const wrapper = shallow(generateComponent({
      transactions: [],
      ready: true,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
