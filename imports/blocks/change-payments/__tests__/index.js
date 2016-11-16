
// import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { ChangePaymentsWithoutData as ChangePayments, map } from "../";

// jest.mock("../index");

// it("maps savedAccount to state", () => {
//   const dummyState = {
//     give: {
//       savedAccount: "test",
//     },
//   };

//   expect(map(dummyState)).toEqual({ savedAccount: dummyState.give.savedAccount });
// });

describe("changeAccounts", () => {
  const accountShape = [
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

  const currentAccount = {
      name: "Test Card 1",
      id: 1,
      date: new Date().toISOString(),
      payment: {
        accountNumber: "4111111111111111",
        paymentType: "Visa",
      }
    };

  const mockedEvent = {
    preventDefault: jest.fn(),
  };

  let layout;

  // beforeEach(() => {

  // });

  // afterEach(() => {
  //   layout = undefined;
  // });

  it("takes an event",() => {
    // layout.setProps({
    //   dispatch: jest.fn(),
    // });

    layout = shallow(
      <ChangePayments
        savedAccounts={accountShape}
        currentAccount={currentAccount}
        dispatch={jest.fn()}
      />
    );

    const { changeAccounts } = layout.instance();
    expect(changeAccounts).toBeDefined();
    changeAccounts(mockedEvent);
    expect(mockedEvent.preventDefault).toBeCalled();

    console.log(layout.props());
    expect(shallowToJson(layout)).toMatchSnapshot();
    expect(layout.props().dispatch).toHaveBeenCalledTimes(2);

    // expect(changeAccounts(mockedEvent));
    // changeAccounts(mockedEvent);

    // expect(changeAccounts(mockedEvent.onClick));
    // expect(changeAccounts(jest.fn()))

    // const wrapper = shallow(<ChangePayments />);
    // console.log(wrapper);
  });

  // it("prevents default", () => {
  //   const { changeAccounts } = layout.instance();

  // });


  // it("dispatches an change to setAccount");
  // it("dispatches modal.hide()");
});
