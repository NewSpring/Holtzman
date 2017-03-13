import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import Layout from "../Layout";

const defaultProps = {
  schedule: {
    start: "2012-12-12",
    details: [
      {
        amount: 2,
        account: {
          name: "test account"
        }
      },
    ],
    payment: {
      accountNumber: "111111111111111",
      paymentType: "ACH",
    },
    schedule: {
      description: "TEST",
    },
    transactions: [
      {
        date: "2013-12-12",
        details: [
          {
            amount: 2,
            account: "test detail account",
          },
        ],
        person: {},
      },
      {
        date: "2013-12-12",
        details: [
          {
            amount: 2,
            account: "test detail account",
          },
        ],
        person: {},
      },
    ],
  },
  stop: jest.fn(),
  active: true,
  complete: false,
  ready: true,
  entries: [
    {
      entryId: "1",
      title: "test",
      meta: {
        summary: "test summary",
        urlTitle: "test-summary",
      },
      content: {
        images: [
          { url: "http://test.com/test.jpg" },
        ],
      },
    },
    {
      entryId: "1",
      title: "test",
      meta: {
        summary: "test summary",
        urlTitle: "test-summary",
      },
      content: {
        images: [
          { url: "http://test.com/test.jpg" },
        ],
      },
    },
  ],
  loadingEntries: false,
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

it("renders loading if no schedule", () => {
  const wrapper = shallow(generateComponent({
    schedule: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if not ready", () => {
  const wrapper = shallow(generateComponent({
    ready: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without schedule payment", () => {
  const props = clone(defaultProps);
  delete props.schedule.payment;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("works with credit card", () => {
  const props = clone(defaultProps);
  props.schedule.payment.paymentType = "Visa";
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders complete message", () => {
  const wrapper = shallow(generateComponent({
    complete: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders stopped message", () => {
  const wrapper = shallow(generateComponent({
    active: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without schedule", () => {
  const wrapper = shallow(generateComponent({
    schedule: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders no contributions message", () => {
  const props = clone(defaultProps);
  props.schedule.transactions = [];
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if no entries", () => {
  const wrapper = shallow(generateComponent({
    loadingEntries: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

// it("formatDate returns formatted date", () => {
//   const wrapper = shallow(generateComponent());
//   const result = wrapper.instance().formatDate("12-12-2012");
//   expect(result).toBe("Dec 12, 2012");
// });

// it("capitalizeFirstLetter returns only first letter capitalized", () => {
//   const wrapper = shallow(generateComponent());
//   const result = wrapper.instance().capitalizeFirstLetter("test");
//   expect(result).toBe("Test");
// });
