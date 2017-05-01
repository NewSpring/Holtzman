import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import Layout from "../Layout";

jest.mock("../../../@primitives/UI/forms");

const defaultProps = {
  back: jest.fn(),
  campuses: [],
  changeSavedAccount: jest.fn(),
  countries: [],
  clear: jest.fn(),
  clearData: jest.fn(),
  give: {
    data: {
      personal: {},
    },
    state: "default",
    step: 1,
  },
  goToAccounts: jest.fn(),
  goToStepOne: jest.fn(),
  next: jest.fn(),
  onSubmit: jest.fn(),
  save: jest.fn(),
  savedPayments: [],
  states: [],
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Layout { ...newProps } />;
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("renders Personal form", () => {
  const result = renderer.create(generateComponent({
    campuses: ["hey"],
  }));
  expect(result).toMatchSnapshot();
});

it("renders Billing form", () => {
  const result = renderer.create(generateComponent({
    give: {
      data: {
        personal: {},
        billing: {},
      },
      state: "SC",
      step: 2,
    },
    campuses: ["hey"],
    states: ["SC","NC"],
    countries: ["USA","Others"],
  }));
  expect(result).toMatchSnapshot();
});

it("renders Payment form", () => {
  const result = renderer.create(generateComponent({
    give: {
      data: {
        personal: {},
        payment: {},
      },
      savedAccount: {},
      schedule: { start: null, frequency: null },
      state: "default",
      step: 3,
    },
    campuses: ["hey"],
  }));
  expect(result).toMatchSnapshot();
});

it("renders Confirm form", () => {
  const result = renderer.create(generateComponent({
    give: {
      data: {
        personal: {},
        payment: {
          type: "ach",
        },
      },
      savedAccount: {},
      schedule: { start: null, frequency: null },
      state: "default",
      step: 4,
      transactions: {},
    },
    campuses: ["hey"],
  }));
  expect(result).toMatchSnapshot();
});

it("renders Loading", () => {
  const result = renderer.create(generateComponent({
    give: {
      state: "loading",
    },
    campuses: ["hey"],
  }));
  expect(result).toMatchSnapshot();
});

it("renders Error", () => {
  const result = renderer.create(generateComponent({
    give: {
      state: "error",
      errors: { "123": "error" },
    },
    campuses: ["hey"],
  }));
  expect(result).toMatchSnapshot();
});

it("renders Success", () => {
  const result = renderer.create(generateComponent({
    give: {
      data: {
        personal: {
          email: "test@test.com",
        },
      },
      // schedule: { start: null, frequency: null },
      state: "success",
      total: 12,
    },
    campuses : ["yo"],
  }));
  expect(result).toMatchSnapshot();
});

it("should show loading state with no campus info", () => {
  const component = renderer.create(generateComponent({campuses: []}));
  expect(component).toMatchSnapshot();
});
