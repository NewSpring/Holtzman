
import { mount, shallow } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { getSingleSpecWrapper } from "../../../../../util/tests/data-spec.js";

import { SubFundWithoutData, withRedux } from "../";

// see the first test
jest.mock("react-redux", () => ({
  connect: jest.fn((props, dispatch) => jest.fn((MyComp) => <MyComp {...dispatch} />)),
}));

const additionalAccounts = [
  {value: "test fund 1", label: "test fund 1", testId: 0},
  {value: "test fund 2", label: "test fund 2", testId: 1},
  {value: "RIP harambe fund", label: "RIP harambe fund", testId: 2},
  {value: "my account", label:"my account", testId: 3},
];

const generateComponent = (additionalProps={}) => {
  const defaultProps = {
    accounts: [{ value: "main fund" }],
    preFill: () => {},
    changeAmount: jest.fn(),
    changeFund: jest.fn()
  };

  return <SubFundWithoutData {...defaultProps} {...additionalProps} />
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("withRedux", () => {
  /*
  *   SubFund relies on give actions to be passed in using withRedux.
  *   This tests to make sure that this is happening on a stub component
  */
  xit("should include all the give actions", () => {
    const Stub = (dispatch) => {
      expect(dispatch).toMatchSnapshot();
      return null;
    }
    const stub = withRedux(Stub);
    shallow(stub);
  });

  /*
  *  if mapStateToProps existed...
  */
  // export const withRedux = connect((state) => ({ foo: state.give }), giveActions);
  // xit("has the correct mapStateToProps", () => {
  //   // some kind of reset mocks should fix this to be [0][0]
  //   const mapStateToProps = connect.mock.calls[4][0]
  //   // console.log(connect.mock.calls[4][0])
  //   expect(mapStateToProps({ give: true })).toMatchSnapshot();
  // })
});

describe ("SubFund", () => {

  it("should render with minimal props", () => {
    const component = mount(generateComponent());

    expect(mountToJson(component)).toMatchSnapshot();
    expect(component.find("Layout").length).toEqual(1);
    expect(component.find("Primary").length).toEqual(0);
  });

  it("should render a primary fund", () => {
    const component = mount(generateComponent({ primary: true }));

    expect(mountToJson(component)).toMatchSnapshot();
    expect(component.find("Layout").length).toEqual(0);
    expect(component.find("Primary").length).toEqual(1);
  });

  it("sets the state to active if it has an amount", () => {
    const component = mount(generateComponent({ amount: 10 }));

    expect(mountToJson(component)).toMatchSnapshot();
    expect(component.state()).toEqual({ active: true });
  });

  it("should wrap the changeAmount prop with the fundId", () => {
    const changeAmount = jest.fn();
    const fundId = 11;
    const component = mount(generateComponent({ changeAmount, fundId }));

    const classChangeAmount = component.instance().changeAmount;
    classChangeAmount(10);
    expect(changeAmount).toBeCalledWith(10, 11);
  });

  it("should wrap the changeFund prop with the passed id", () => {
    const changeFund = jest.fn();
    const id = 11;
    const component = mount(generateComponent({ changeFund, id }));

    const classChangeFund = component.instance().changeFund;
    classChangeFund(10);
    expect(component.state()).toEqual({ active: true });
    expect(changeFund).toBeCalledWith(10, 11);
  });

  it("should wrap the changeFund prop with the passed id", () => {
    const changeFund = jest.fn();
    const id = 11;
    const component = mount(generateComponent({ changeFund, id }));

    const classChangeFund = component.instance().changeFund;
    classChangeFund(0);
    expect(component.state()).toEqual({ active: false });
    expect(changeFund).toBeCalledWith(0, 11);
  });

});
