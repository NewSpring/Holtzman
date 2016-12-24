import renderer from "react-test-renderer";
import { AccountNumber } from "../";

it("should slice a masked account number", () => {
  const accountNumber = "**********1234";
  const result = renderer.create(
    <AccountNumber accountNumber={accountNumber} />
  );
  expect(result).toMatchSnapshot();
});
