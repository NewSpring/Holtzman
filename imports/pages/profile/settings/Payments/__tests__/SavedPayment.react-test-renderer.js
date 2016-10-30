import renderer from "react-test-renderer";
import SavedPayment from "../SavedPayment";

const sampleAccount = {
  name: "Test Card",
  id: "TEST",
  payment: {
    accountNumber: "41*********1111",
    paymentType: "Visa",
  }
}

it("renders out a full card when all data is provided", () => {
  const tree = renderer.create(
    <SavedPayment
      account={{...sampleAccount}}
      remove={() => {}}
    />
  );
  expect(tree).toMatchSnapshot();
});
