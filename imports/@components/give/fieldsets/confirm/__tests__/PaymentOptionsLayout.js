import renderer from "react-test-renderer";
import PaymentOptionsLayout from "../PaymentOptionsLayout";

const defaultProps = {
  changeAccounts: jest.fn(),
  choose: jest.fn(),
  goToStepOne: jest.fn(),
  savedAccount: {},
  savedAccounts: [
    { payment: { accountNumber: "1234" } },
    { payment: { accountNumber: "2345" } },
  ],
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };

  return <PaymentOptionsLayout { ...newProps } />;
};

it("should render with props", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});
