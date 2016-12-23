import { shallow } from "enzyme";
import { shallowToJson }from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { Meteor } from "meteor/meteor";
import { CartContainer } from "../index";

export const sampleAccount = {
  id: 180,
  name: "Step Up",
};

export const sampleSchedule = {
  details: [{
    account: {...sampleAccount},
    amount: 50,
  }],
  frequency: "Monthly",
  start: new Date("2025", "01", "01"),
};

describe("CartContainer", () => {

  beforeEach(() => {
    reset();
    startBuffering();
  });

  afterEach(() => {
    reset();
  });

  it( "renders offline if !alive", () => {
    const functionMock = jest.fn();

    const tree = shallow(
      <CartContainer
        // first thing called on new CartContainers
        clearTransactions={functionMock}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it( "renders null if no accounts exist", () => {
    const functionMock = jest.fn();

    const tree = shallow(
      <CartContainer
        accounts={[]}
        alive={true}
        clearTransactions={functionMock}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("renders the default component", () => {
    const functionMock = jest.fn();

    const tree = shallow(
      <CartContainer
        accounts={[...sampleAccount]}
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

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("renders checkout ready when schedule is valid", () => {
    const functionMock = jest.fn();

    const wrapper = shallow(
      <CartContainer
        accounts={[...sampleAccount]}
        alive={true}
        addTransactions={functionMock}
        clearAllSchedulesExcept={functionMock}
        clearSchedules={functionMock}
        clearTransactions={functionMock}
        existing={sampleSchedule}
        onClick={functionMock}
        removeSchedule={functionMock}
        saveSchedule={functionMock}
        setTransactionType={functionMock}
        text={""}
      />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("receives props and resets the form", () => {
    const functionMock = jest.fn();

    const wrapper = shallow(
      <CartContainer
        accounts={[...sampleAccount]}
        alive={true}
        addTransactions={functionMock}
        clearAllSchedulesExcept={functionMock}
        clearSchedules={functionMock}
        clearTransactions={functionMock}
        existing={sampleSchedule}
        onClick={functionMock}
        removeSchedule={functionMock}
        saveSchedule={functionMock}
        setTransactionType={functionMock}
        text={""}
      />
    );

    wrapper.setProps({
      give: {
        schedules: {},
        transactions: {},
      },
    });

    expect(shallowToJson(wrapper)).toMatchSnapshot();
    // XXX expect form to NOT have an add-to-cart element
  });
});
