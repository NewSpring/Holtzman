import renderer from "react-test-renderer";
import { ButtonText } from "../";

const defaultProps = {
  payment: {},
  schedules: {},
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

it("should say `Give Now` with minimal props", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});

it("should say `Schedule Now` if schedule present", () => {
  const result = renderer.create(generateComponent({
    schedules: { "123": "123" },
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Transfer Now` if recoverable schedule", () => {
  const result = renderer.create(generateComponent({
    scheduleToRecover: true,
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Give Now using 6789` if accountNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "ach",
      accountNumber: "123456789",
    },
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Give Now using 4321` if cardNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "card",
      cardNumber: "987654321",
    },
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Schedule Now using 6789` if schedule and accountNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "ach",
      accountNumber: "123456789",
    },
    schedules: { "123": "123" },
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Schedule Now using 4321` if schedule and cardNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "card",
      cardNumber: "987654321",
    },
    schedules: { "123": "123" },
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Transfer Now using 6789` if recoverable schedule and accountNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "ach",
      accountNumber: "123456789",
    },
    scheduleToRecover: true,
  }));
  expect(result).toMatchSnapshot();
});

it("should say `Transfer Now using 4321` if schedule and cardNumber", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "card",
      cardNumber: "987654321",
    },
    scheduleToRecover: true,
  }));
  expect(result).toMatchSnapshot();
});
