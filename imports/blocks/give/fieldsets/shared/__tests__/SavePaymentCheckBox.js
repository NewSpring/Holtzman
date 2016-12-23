import renderer from "react-test-renderer";
import { SavePaymentCheckBox } from "../";

const defaultProps = {
  savedAccount: {},
  savePayment: () => {},
  shouldSaveState: false,
  schedule: { start: null, frequency: null },
  transactionType: "default",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SavePaymentCheckBox { ...newProps } />;
};

it("renders with props", () => {
  const result = renderer.create(generateComponent());
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
    schedule: { start: "now" },
  }));
  expect(result).toMatchSnapshot();
});
