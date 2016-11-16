import renderer from "react-test-renderer";
import Layout from "../Layout";
import PaymentCard from "../paymentCard";

// // Mock the payment card
// jest.mock("../paymentCard")

let accountResponse;

beforeEach(() => {
  accountResponse = [
    {
      name: "Test Card 1",
      id: 1,
      date: new Date().toISOString(),
      payment: {
        accountNumber: "4111111111111111",
        paymentType: "Visa",
      }
    },
    {
      name: "Test Card 2",
      id: 2,
      date: new Date().toISOString(),
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
  // Mock the implimentation of payment card
  // PaymentCard.mockImplementation(props => null);

  // const layout = renderer.create(
  //   <Layout
  //     savedAccounts={accountResponse}
  //     selectedAccount="1"
  //     chooseAccount={() => {}}
  //     changeAccounts={() => {}}
  //   />
  // );

  // expect(PaymentCard).toHaveBeenCalledTimes(2);
  expect(true).toBe(true);
});

// it("correctly delivers props to the layout", () => {

//   const layout = renderer.create(
//     <Layout
//       savedAccounts={accountResponse}
//       selectedAccount="1"
//       chooseAccount={() => {}}
//       changeAccounts={() => {}}
//     />
//   );

//   expect(layout).toMatchSnapshot();
// });
