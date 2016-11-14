import { shallow } from "enzyme";
import { shallowToJson }from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { Meteor } from "meteor/meteor";
import { CartContainer } from "../index";

export const sampleAccount = {
  id: 180,
  name: "Step Up",
}

describe("CartContainer", () => {

  beforeEach(() => {
    reset();
    startBuffering();
  });

  afterEach(() => {
    reset();
  });

  it( "renders offline if no props exist", () => {
    const functionMock = jest.fn();

    const tree = shallow(
      <CartContainer
        // first thing called on new CartContainers
        clearTransactions={functionMock}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("renders the default component", () => {
    const functionMock = jest.fn();
    const accountsMapMock = jest.fn();

    const wrapper = shallow(
      <CartContainer
        accounts={functionMock}
        alive={true}
        addTransactions={functionMock}
        clearAllSchedulesExcept={functionMock}
        clearSchedules={functionMock}
        clearTransactions={functionMock}
        onClick={functionMock}
        removeSchedule={functionMock}
        saveSchedule={functionMock}
        setTransactionType={functionMock}
        text={""}
      />
    );

    wrapper.setProps({
      map: accountsMock.mockReturnValue({...sampleAccount}),
    });

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

});

// const mockAccountMap = (overrides) => {
//   const defaults = {
//     id: 180,
//     name: "Step Up",
//   };

//   return {
//     ...defaults,
//     ...overrides,
//   };
// };