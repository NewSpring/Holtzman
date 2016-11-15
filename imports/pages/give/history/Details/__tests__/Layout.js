import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Layout from "../Layout";

const defaultProps = {
  loadingEntries: false,
  transaction: {
    details: [
      {
        amount: 2,
        account: {
          name: "test",
        },
      },
    ],
    person: {
      firstName: "jim",
      lastName: "bob",
    },
    payment: {
      accountNumber: "1",
      paymentType: "ACH",
    },
  },
  entries: [
    {
      entryId: "1",
      title: "test",
      content: {
        images: [
          { url: "http://test.com/test.jpg" },
        ],
      },
      meta: {
        summary: "test",
      },
    },
    {
      entryId: "2",
      title: "test",
      content: {
        images: [
          { url: "http://test.com/test.jpg" },
        ],
      },
      meta: {
        summary: "test",
      },
    },
  ],
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

it("renders loading if loadingEntries", () => {
  const wrapper = shallow(generateComponent({
    loadingEntries: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if no transaction", () => {
  const wrapper = shallow(generateComponent({
    transaction: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("works with nickname", () => {
  const wrapper = shallow(generateComponent({
    transaction: {
      details: [
        {
          amount: 2,
          account: {
            name: "test",
          },
        },
      ],
      person: {
        nickName: "jimothy",
        firstName: "jim",
        lastName: "bob",
      },
      payment: {
        accountNumber: "1",
        paymentType: "ACH",
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("works with credit card", () => {
  const wrapper = shallow(generateComponent({
    transaction: {
      details: [
        {
          amount: 2,
          account: {
            name: "test",
          },
        },
      ],
      person: {
        firstName: "jim",
        lastName: "bob",
      },
      payment: {
        accountNumber: "1",
        paymentType: "Visa",
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render account type if none", () => {
  const wrapper = shallow(generateComponent({
    transaction: {
      details: [
        {
          amount: 2,
          account: {
            name: "test",
          },
        },
      ],
      person: {
        firstName: "jim",
        lastName: "bob",
      },
      payment: {
        accountNumber: "1",
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render entries if there are none", () => {
  const wrapper = shallow(generateComponent({
    entries: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
