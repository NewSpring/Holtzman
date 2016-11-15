import renderer from "react-test-renderer";
import PaymentCard, { obfuscateAccount } from "../";

it("obfuscates account number", () => {
  const accountObfuscate = obfuscateAccount("4111111111111111");
  expect(accountObfuscate).toBe("************1111");
});

it("correctly renders the component with props", () => {
  const tree = renderer.create(
    <PaymentCard
      onClick={() => {}}
      accountName="Test Account"
      accoundId="1"
      paymentAccount="4111111111111111"
      selectedAccountId="1"
      paymentType="Visa"
    />
  );
  expect(tree).toMatchSnapshot();
});
