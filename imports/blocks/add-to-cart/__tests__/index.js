import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import { CartContainerWithoutData as CartContainer } from "../";
import { SubFundWithoutData as SubFund } from "../Subfund";

jest.mock("../Subfund", () => jest.fn(() => <div />));
jest.mock("../../checkout-buttons", () => jest.fn(() => <div />));

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    clearTransactions: () => {},
    accounts: [
      {
        id: "1",
        name: "test",
      }
    ],
    addTransactions: jest.fn(),
    give: "5",
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

it("should render with minimal props", () => {
  const component = shallow(generateComponent());
  expect(shallowToJson(component)).toMatchSnapshot();
});

it ("should not render if no accounts", () => {
  const component = mount(generateComponent({ accounts: [] }));
  expect(mountToJson(component)).toMatchSnapshot();
});

it ("should properly render with multiple accounts", () => {
  const component = mount(generateComponent({ accounts: additionalAccounts }));
  expect(mountToJson(component)).toMatchSnapshot();
});

describe("CartContainer > Lifecycle functions", () => {

  it("calls clearTransactions", () => {
    const spy = jest.fn();
    const component = mount(generateComponent({ clearTransactions: spy }));
    expect(spy).toBeCalled();
  });

  it("accepts query string and calls addTransaction with the right info", () => {
    const spy = jest.fn();

    // change the window location
    delete window.location;
    window.location = { "search": "?test=1" };

    const component = mount(generateComponent({ addTransactions: spy }));
    expect(spy).toBeCalled();
    expect(spy).toHaveBeenCalledWith({"1" : { value: 1, label: "test" }});
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it ("should clear transactions on success", () => {
    const spy = jest.fn();
    const component = mount(generateComponent({
      clearTransactions: spy,
      give: {state: "success"}
    }));
    expect(spy).toHaveBeenCalledTimes(1);
    component.setProps({ give: {state: "success"} });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

describe ("CartContainer > Class Methods", () => {
  //dont' need to test the return value much. It's just the monetize function
  it("should return formatted amount", () => {
    const spy = jest.fn();
    const component = mount(generateComponent({ addTransactions: spy }));
    const format = component.instance().format;

    expect(format(10, {id: 1, name:"test"})).toEqual("$10");
    expect(spy).toHaveBeenCalledWith({"1": {value: 10, label: "test"}});
  });

  //pretty much same as format, with different return
  it ("should run saveData and return true on success", () => {
    const spy = jest.fn();
    const component = mount(generateComponent({ addTransactions: spy }));
    const saveData = component.instance().saveData;

    expect(saveData(10, {id: 1, name:"test"})).toEqual(true);
    expect(spy).toHaveBeenCalledWith({"1": {value: 10, label: "test"}});
  });

  it ("shouldn't provide a prefill value if there are no transactions", () => {
    const component = mount(generateComponent({ give: { transactions: [] } }));
    const preFillValue = component.instance().preFillValue;

    expect(preFillValue(1)).toEqual(null);
  });

  it ("should provide a prefill value if there is a matching transaction", () => {
    const component = mount(generateComponent({
      give: {
        transactions: [{ value: 5 }],
      },
    }));
    const preFillValue = component.instance().preFillValue;

    expect(preFillValue(0)).toEqual("$5");
    expect(preFillValue(1)).toEqual(null);
  });
});
