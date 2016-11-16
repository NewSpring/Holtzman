
// import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { ChangePaymentsWithoutData as ChangePayments, map } from "../";

it("maps savedAccount to state", () => {
  const dummyState = {
    give: {
      savedAccount: "test",
    },
  };

  expect(map(dummyState)).toEqual({ savedAccount: dummyState.give.savedAccount });
});

const accountShape = [
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

const currentAccount = {
    name: "Test Card 1",
    id: 1,
    date: "2016-11-16T21:45:41.275Z",
    payment: {
      accountNumber: "4111111111111111",
      paymentType: "Visa",
    }
  };

const mockedEvent = {
  preventDefault: jest.fn(),
  currentTarget: {
    id: "1"
  }
};

let component;
let changeAccounts;

beforeEach(() => {
  component = shallow(
    <ChangePayments
      savedAccounts={accountShape}
      currentAccount={currentAccount}
      dispatch={jest.fn()}
    />
  );

  changeAccounts = component.instance().changeAccounts;
});

afterEach(() => {
  component = undefined;
  changeAccounts = undefined;
});

describe("changeAccounts", () => {

  const mockedEvent = {
    preventDefault: jest.fn(),
  };

  it("takes an event, and calls preventDefault",() => {
    expect(changeAccounts).toBeDefined();
    changeAccounts(mockedEvent);
    expect(mockedEvent.preventDefault).toBeCalled();
  });

  it("dispatches an change to setAccount", () => {
    changeAccounts(mockedEvent);
    expect(component.instance().props.dispatch).toHaveBeenCalledTimes(2);

    const dispatchCalls = component.instance().props.dispatch.mock.calls[0];

    expect(dispatchCalls).toMatchSnapshot();
  });

  it("dispatches modal.hide()", () => {
    changeAccounts(mockedEvent);
    expect(component.instance().props.dispatch).toHaveBeenCalledTimes(2);

    const dispatchCalls = component.instance().props.dispatch.mock.calls[1];
    expect(dispatchCalls).toMatchSnapshot();
  });
});

describe("choose", () => {

  it("takes an event, and calls preventDefault",() => {
    let { choose } = component.instance();
    expect(choose).toBeDefined();
    choose(mockedEvent);
    expect(mockedEvent.preventDefault).toBeCalled();
  });

  it("set's a savedAccount state", () => {
    let { choose } = component.instance();
    choose(mockedEvent);
    const savedAccountState = component.instance().state.savedAccount;
    expect(savedAccountState).toMatchSnapshot();
  });
});

describe("renders layout", () => {

  it("sets selectedAccount", () => {
    const renderedLayout = mount(
      <ChangePayments
        savedAccounts={accountShape}
        currentAccount={currentAccount}
        dispatch={jest.fn()}
      />
    );

    const selectedAccount = renderedLayout.find("Layout").get(0).props.selectedAccount;
    expect(selectedAccount).toMatchSnapshot();
  });

  it("correctly delivers props to layout", () => {

    const renderedLayout = mount(
      <ChangePayments
        savedAccounts={accountShape}
        currentAccount={currentAccount}
        dispatch={jest.fn()}
      />
    );

    expect(mountToJson(renderedLayout)).toMatchSnapshot();
  });
});
