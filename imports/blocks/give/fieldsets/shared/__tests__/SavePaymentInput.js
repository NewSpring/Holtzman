import renderer from "react-test-renderer";
import { SavePaymentInput } from "../";

const defaultProps = {
  saveName: () => {},
  savedAccount: {},
  schedules: {},
  shouldSaveState: true,
  payment: {
    type: "ach",
  },
  transactionType: "default",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SavePaymentInput { ...newProps } />;
};

it("renders default `Bank Account` if ach", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});

it("renders default `Credit Card` if not ach", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "cc",
    },
  }));
  expect(result).toMatchSnapshot();
});

it("does not render if should not save state", () => {
  const result = renderer.create(generateComponent({
    shouldSaveState: false,
  }));
  expect(result).toMatchSnapshot();
});

it("does not render if using saved account", () => {
  const result = renderer.create(generateComponent({
    savedAccount: {
      id: "1",
    },
  }));
  expect(result).toMatchSnapshot();
});

it("does not render if guest checkout", () => {
  const result = renderer.create(generateComponent({
    transactionType: "guest",
  }));
  expect(result).toMatchSnapshot();
});

it("does not render if scheduling", () => {
  const result = renderer.create(generateComponent({
    schedules: { "123": "123" },
  }));
  expect(result).toMatchSnapshot();
});
