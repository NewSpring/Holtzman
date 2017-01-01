import renderer from "react-test-renderer";
import Layout from "../Layout";
import PaymentCard from "../payment-card";

// // Mock the payment card
jest.mock("../payment-card");

let accountResponse;

beforeEach(() => {
  accountResponse = [
    {
      name: "Test Card 1",
      id: 1,
      date: "2016-11-16T21:45:41.275Z",
      payment: {
        accountNumber: "4111111111111111",
        paymentType: "Visa",
      }
    },
    {
      name: "Test Card 2",
      id: 2,
      date: "2016-11-16T21:45:41.275Z",
      payment: {
        accountNumber: "4111111111111111",
        paymentType: "Visa",
      }
    }
  ];
});

afterEach(() => {
  accountResponse = undefined;
});

it("correctly delivers props to child component", () => {
  PaymentCard.mockImplementation(props => null);

  const layout = renderer.create(
    <Layout
      savedAccounts={accountResponse}
      selectedAccount="1"
      chooseAccount={() => {}}
      changeAccounts={() => {}}
    />
  );

  expect(PaymentCard).toHaveBeenCalledTimes(2);
});

it("correctly delivers props to the layout", () => {

  const layout = renderer.create(
    <Layout
      savedAccounts={accountResponse}
      selectedAccount="1"
      chooseAccount={() => {}}
      changeAccounts={() => {}}
    />
  );

  expect(layout).toMatchSnapshot();
});
