import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { BankFields } from "../";

const defaultProps = {
  payment: {
    type: "ach",
    accountNumber: "987654321",
    routingNumber: "123456789",
    accountType: "checking",
  },
  saveData: () => {},
  validate: () => {},
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <BankFields { ...newProps } />;
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("should render with props", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});

it("should not render if not ach type", () => {
  const result = renderer.create(generateComponent({
    payment: {
      type: "card",
      cardNumber: "123456789",
    },
  }));
  expect(result).toMatchSnapshot();
});
