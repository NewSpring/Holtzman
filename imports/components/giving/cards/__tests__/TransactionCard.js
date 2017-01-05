import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import TransactionCard, { DetailCard } from "../TransactionCard";

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
    return <DetailCard { ...newProps } />;
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
