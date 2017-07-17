import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import { connect } from "react-redux";

import { give as giveActions } from "../../../../data/store";
import { CartContainerWithoutData as CartContainer, map, withGiveActions } from "../";
import { SubFundWithoutData as SubFund } from "../Subfund";

jest.mock("react-redux", () => ({
  connect: jest.fn(() => (component) => <component />),
}));

jest.mock("../Subfund", () => jest.fn(() => <div />));
jest.mock("../Schedule", () => jest.fn(() => <div />));
jest.mock("../../checkout-buttons", () => jest.fn(() => <div />));
jest.mock("../../../@primitives/UI/tags", () => jest.fn(() => <span />));

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    clearTransactions: () => {},
    accounts: [
      {
        id: "1",
        name: "test",
      }
    ],
    clearTransaction: jest.fn(),
    addTransactions: jest.fn(),
    give: "5",
    query: {},
  };
  return (
    <CartContainer {...defaultProps} {...additionalProps} />
  );
};

const additionalAccounts = [
  { id: 1, name: "TEST 1" },
  { id: 2, name: "TEST 2" },
  { id: 3, name: "TEST 3" },
  { id: 4, name: "TEST 4" },
];

it("is mapped to the store as expected", () => {
  expect(connect).toBeCalledWith(map, giveActions);
});

describe("map", () => {
  it("reduces the state as expected", () => {
    const state = {
      routing: {
        location: {
          query: "foo",
        },
      },
      give: {
        state: "default",
        total: 0,
      },
      accounts: {
        authorized: false,
      },
    };

    expect(map(state)).toEqual({
      status: "default",
      total: 0,
      query: "foo",
      authorized: false
    });
  });
});

it("should render with minimal props", () => {
  const component = shallow(generateComponent());
  expect(shallowToJson(component)).toMatchSnapshot();
});

it("should not render if no accounts", () => {
  const component = mount(generateComponent({ accounts: [] }));
  expect(mountToJson(component)).toMatchSnapshot();
});

it("should properly render with multiple accounts", () => {
  const component = mount(generateComponent({ accounts: additionalAccounts }));
  expect(mountToJson(component)).toMatchSnapshot();
});

describe("CartContainer > Lifecycle functions", () => {

  it("calls clearTransactions", () => {
    const spy = jest.fn();
    const component = mount(generateComponent({ clearTransactions: spy }));
    expect(component.state()).toMatchSnapshot();
    expect(spy).toBeCalled();
  });

  it("accepts query string prefills the fund", () => {
    const addTransactions = jest.fn();
    const component = mount(generateComponent({
      query: { test: 10 },
      addTransactions,
    }));
    const { subfunds } = component.state();
    expect(subfunds[0].fundId).toBe("1");
    expect(subfunds[0].amount).toBe(10);
    expect(addTransactions).toBeCalled();
    expect(addTransactions.mock.calls[0][0]).toEqual({
      "1": {
        label: "test",
        value: 10,
      }
    });
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it("should clear transactions on success", () => {
    const spy = jest.fn();
    const resetSpy = jest.fn();
    const component = mount(generateComponent({
      clearTransactions: spy,
      status: "success",
    }));
    component.setProps({ status: "default" });
    expect(component.state()).toMatchSnapshot();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should clear transactions on when amount is set to 0", () => {
    const spy = jest.fn();
    const component = mount(generateComponent({
      clearTransactions: spy,
      total: 1,
    }));
    expect(spy).toHaveBeenCalledTimes(1);
    component.setProps({ total: 0 });
    expect(component.state()).toMatchSnapshot();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

describe ("CartContainer > Class Methods", () => {
  //dont' need to test the return value much. It's just the monetize function
  it("should allow selecting a fund", () => {
    const component = mount(generateComponent());
    const getFund = component.instance().getFund;

    expect(getFund("1")).toEqual({ id: "1", name: "test" });
  });

  describe("changeAmount", () => {
    it("update the state correctly", () => {
      const component = mount(generateComponent({ accounts: additionalAccounts }));
      const changeAmount = component.instance().changeAmount;
      changeAmount(10, 1);
      expect(component.state().subfunds[0].amount).toBe(10);
    });

    it("updates the store", () => {
      const addTransactions = jest.fn();
      const component = mount(generateComponent({
        accounts: additionalAccounts,
        addTransactions,
      }));
      const changeAmount = component.instance().changeAmount;
      changeAmount(10, 1);
      expect(addTransactions).toBeCalledWith({ 1: { label: "TEST 1", value: 10 }});
    });

    it("returns a formated version of the amount", () => {
      const component = mount(generateComponent({ accounts: additionalAccounts }));
      const changeAmount = component.instance().changeAmount;
      const amount = changeAmount(10, 1);
      expect(amount).toBe("$10");
    });

    it("handles cents as the only amount", () => {
      const component = mount(generateComponent({ accounts: additionalAccounts }));
      const changeAmount = component.instance().changeAmount;
      const amount = changeAmount(.0, 1);
      expect(amount).toBe("$0");
    });

    it("handles cents as the only amount with added amounts", () => {
      const component = mount(generateComponent({ accounts: additionalAccounts }));
      const changeAmount = component.instance().changeAmount;
      const amount = changeAmount(.05, 1);
      expect(amount).toBe("$0.05");
    });

    // it("replaces typeahead currency formatting", () => {
    //   const component = mount(generateComponent({ accounts: additionalAccounts }));
    //   const changeAmount = component.instance().changeAmount;
    //   const amount = changeAmount(.505, 1);
    //   expect(amount).toBe("$0.55");
    // });
  });

  describe("changeFund", () => {
    it("update the state correctly", () => {
      const component = mount(generateComponent({ accounts: additionalAccounts }));
      const changeFund = component.instance().changeFund;
      changeFund(2, 1);
      expect(component.state()).toMatchSnapshot();
    });

    it("handles deselecting a fund", () => {
      const component = mount(generateComponent({ accounts: additionalAccounts }));
      const changeFund = component.instance().changeFund;
      changeFund(0, 1);
      expect(component.state()).toMatchSnapshot();
    });

    it("handles deselecting a fund with an amount", () => {
      const component = mount(generateComponent({ accounts: additionalAccounts }));
      const changeFund = component.instance().changeFund;
      const changeAmount = component.instance().changeAmount;
      const amount = changeAmount(10, 1);
      const success = changeFund(2, 1);
      expect(component.state()).toMatchSnapshot();
      expect(success).toBe(true);
    });

    it("clears the fund id", () => {
      const clearTransaction = jest.fn();
      const component = mount(generateComponent({
        accounts: additionalAccounts,
        clearTransaction,
      }));
      const changeFund = component.instance().changeFund;
      changeFund(1, 1);
      expect(clearTransaction).toBeCalledWith(1);
    });

    it("updates the store for the correct amount", () => {
      const addTransactions = jest.fn();
      const component = mount(generateComponent({
        accounts: additionalAccounts,
        addTransactions,
      }));
      const changeFund = component.instance().changeFund;
      const changeAmount = component.instance().changeAmount;
      const amount = changeAmount(10, 1);
      changeFund(1, 2);
      expect(addTransactions).toBeCalledWith({ 1: { label: "TEST 1", value: 10 }});
    });
  });

  describe("prefill", () => {
    it("early returns on missing subfunds", () => {
      const component = mount(generateComponent({ accounts: [] }));
      const preFillValue = component.instance().preFillValue;
      const amount = preFillValue(1);
      expect(amount).toBe(null);
    });

    it("returns a formatted amount", () => {
      const component = mount(generateComponent({ query: { "test": 5 }}));
      const preFillValue = component.instance().preFillValue;
      const amount = preFillValue("1");
      expect(amount).toBe("$5");
    });
  });

  describe("toggleSecondFund", () => {
    it("creates the correct new subfund state", () => {
      const component = mount(generateComponent({
        accounts: additionalAccounts,
      }));
      const { toggleSecondFund } = component.instance();
      toggleSecondFund();
      const newState = component.state();
      expect(newState).toMatchSnapshot();
    });

    it("creates the correct new subfund state when the first fund is selected", () => {
      const component = mount(generateComponent({
        accounts: additionalAccounts,
      }));
      const { toggleSecondFund, changeAmount, changeFund } = component.instance();
      changeFund(1, 1);
      changeAmount(10, 1)
      toggleSecondFund();
      const newState = component.state();
      expect(newState).toMatchSnapshot();
    });

    it("correctly toggles", () => {
      const component = mount(generateComponent({
        accounts: additionalAccounts,
      }));
      const { toggleSecondFund, changeAmount, changeFund } = component.instance();
      changeFund(1, 1);
      changeAmount(10, 1)
      toggleSecondFund();
      toggleSecondFund();
      const newState = component.state();
      expect(newState).toMatchSnapshot();
    });

    it("clears the transaction when toggling", () => {
      const clearTransaction = jest.fn();
      const component = mount(generateComponent({
        accounts: additionalAccounts,
        clearTransaction,
      }));
      const { toggleSecondFund, changeAmount, changeFund } = component.instance();
      changeFund(1, 1);
      changeAmount(10, 1)
      toggleSecondFund();
      toggleSecondFund();
      expect(clearTransaction).toBeCalledWith(1);
    });
  });

  describe("setCanCheckout", () => {
    it("updates the state", () => {
      const component = mount(generateComponent({
        accounts: additionalAccounts,
      }));
      const { setCanCheckout } = component.instance();

      setCanCheckout(true);
      expect(component.state().canCheckout).toBe(true);
    });
    it("updates the state (falsey)", () => {
      const component = mount(generateComponent({
        accounts: additionalAccounts,
      }));
      const { setCanCheckout } = component.instance();

      setCanCheckout(false);
      expect(component.state().canCheckout).toBe(false);
    });
  });

  describe("canCheckout", () => {
    it("early returns if the total isn't valid", () => {
      const component = mount(generateComponent({
        accounts: additionalAccounts,
      }));
      const { canCheckout } = component.instance();

      expect(canCheckout(0)).toBe(false);
    });
    it("returns the canCheckout state from the component", () => {
      const component = mount(generateComponent({
        accounts: additionalAccounts,
      }));
      const { setCanCheckout, canCheckout } = component.instance();

      setCanCheckout(true);
      expect(canCheckout(10)).toBe(true);
    });
    it("returns the canCheckout state from the component (falsy)", () => {
      const component = mount(generateComponent({
        accounts: additionalAccounts,
      }));
      const { setCanCheckout, canCheckout } = component.instance();

      setCanCheckout(false);
      expect(canCheckout(10)).toBe(true);
    });
  });
});
