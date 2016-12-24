import renderer from "react-test-renderer";
import { ButtonText } from "../";

const defaultProps = {
  payment: {},
  schedule: {},
  savedAccount: {},
  scheduleToRecover: false,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <ButtonText { ...newProps } />
};

it("should say `Give` with minimal props", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});

it("should say `Schedule` if schedule present", () => {
  const result = renderer.create(generateComponent({
    schedule: { start: "now", frequency: null },
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Transfer` if recoverable schedule", () => {
  const result = renderer.create(generateComponent({
    scheduleToRecover: true,
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Give With 6789` if accountNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "ach",
      accountNumber: "123456789",
    },
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Give With 4321` if cardNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "card",
      cardNumber: "987654321",
    },
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Schedule With 6789` if schedule and accountNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "ach",
      accountNumber: "123456789",
    },
    schedule: { start: "now", frequency: null },
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Schedule With 4321` if schedule and cardNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "card",
      cardNumber: "987654321",
    },
    schedule: { start: "now", frequency: null },
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Transfer With 6789` if recoverable schedule and accountNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "ach",
      accountNumber: "123456789",
    },
    scheduleToRecover: true,
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Transfer With 4321` if schedule and cardNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "card",
      cardNumber: "987654321",
    },
    scheduleToRecover: true,
  }));
  expect(result).toMatchSnapshot();
});
