/* eslint-disable */
import renderer from "react-test-renderer";
import { CreditCardForm, AchForm } from "../paymentForm";

it("should render all credit details when provided", () => {
  const tree = renderer.create(
    <CreditCardForm
      number="41111111111111"
      exp="09/22"
      ccv="001"
    />
  );
  expect(tree).toMatchSnapshot();
});

it("should not include a ccv input if not passed in", () => {
  const tree = renderer.create(
    <CreditCardForm
      number="41111111111111"
      exp="09/22"
    />
  );
  expect(tree).toMatchSnapshot();
});


it("should render all bank details when provided", () => {
  const tree = renderer.create(
    <AchForm
      account="111111111111"
      routing="111111111112"
      name="Savings Account"
      type="Savings"
    />
  );
  expect(tree).toMatchSnapshot();
});
