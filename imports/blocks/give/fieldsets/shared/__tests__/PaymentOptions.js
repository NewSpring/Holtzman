import renderer from "react-test-renderer";
import { PaymentOptions } from "../";

const defaultProps = {
  back: () => {},
  changeAccounts: () => {},
  goToStepOne: () => {},
  savedAccount: {},
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <PaymentOptions { ...newProps } />;
};

it("renders `Edit Contribution Details` if no saved account", () => {
  const result = renderer.create(generateComponent({
    savedAccount: {
      id: null,
    },
  }));
  expect(result).toMatchSnapshot();
});

it("renders `Change Payment Accounts` and `Enter New Payment` if savedAccount", () => {
  const result = renderer.create(generateComponent({
    savedAccount: {
      id: "thing",
    },
  }));
  expect(result).toMatchSnapshot();
});
