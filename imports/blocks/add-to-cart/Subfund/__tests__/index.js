
import { mount, shallow } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { getSingleSpecWrapper } from "../../../../util/tests/data-spec.js";

import { SubFund, withRedux } from "../";

// see the first test
jest.mock("react-redux", () => ({
  connect: jest.fn((props, dispatch) => jest.fn((MyComp) => <MyComp {...dispatch} />)),
}));

const additionalAccounts = [
  {value: "test fund 1", testId: 0},
  {value: "test fund 2", testId: 1},
  {value: "RIP harambe fund", testId: 2},
  {value: "my account", testId: 3},
];

const generateComponent = (additionalProps={}) => {
  const defaultProps = {
    accounts: [{value: "main fund"}],
  };

  return <SubFund {...defaultProps} {...additionalProps} />
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
  it ("should include all the give actions", () => {
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
  // it("has the correct mapStateToProps", () => {
  //   // some kind of reset mocks should fix this to be [0][0]
  //   const mapStateToProps = connect.mock.calls[4][0]
  //   // console.log(connect.mock.calls[4][0])
  //   expect(mapStateToProps({ give: true })).toMatchSnapshot();
  // })
});

describe ("SubFund", () => {

  //this renders a non-primary input
  it("should render with minimal props", () => {
    const component = mount(generateComponent());

    //must reset the id state. It's based off the datetime
    component.setState({id: "test-id-reset"});

    expect(mountToJson(component)).toMatchSnapshot();
    expect(component.find("Layout").length).toEqual(1);
    expect(component.find("Primary").length).toEqual(0);
  });

  it ("should have correct default state for primary and secondary", () => {
    const secComponent = shallow(generateComponent());
    const primComponent = shallow(generateComponent({
      primary: true,
      update: () => {},
      preFill: () => {},
    }));

    secComponent.setState({id: "test-id-reset"});
    primComponent.setState({id: "test-id-reset"});

    expect(secComponent.state()).toMatchSnapshot();
    expect(primComponent.state()).toMatchSnapshot();
  });

  it ("should render primary fund", () => {
    const component = mount(generateComponent({
      primary: true,
      update: () => {},
      preFill: () => {},
    }));

    //must reset the id state. It's based off the datetime
    component.setState({id: "test-id-reset"});

    expect(mountToJson(component)).toMatchSnapshot();
    expect(component.find("Layout").length).toEqual(0);
    expect(component.find("Primary").length).toEqual(1);
  });

  it ("should have dark text on primary fund", () => {
    const component = mount(generateComponent({
      primary: true,
      update: () => {},
      preFill: () => {},
    }));
    const secComponent = mount(generateComponent({
      primary: false,
      update: () => {},
      preFill: () => {},
    }));

    //must reset the id state. It's based off the datetime
    component.setState({id: "test-id-reset"});
    secComponent.setState({id: "test-id-reset"});

    const primaryProps = component.find("Primary").props();
    const secProps = secComponent.find("Layout").props();

    expect(mountToJson(component)).toMatchSnapshot();
    expect(mountToJson(secComponent)).toMatchSnapshot();
    expect(primaryProps.classes.indexOf("text-dark-tertiary")).toBeGreaterThan(-1);
    expect(secProps.classes.indexOf("text-light-tertiary")).toBeGreaterThan(-1);
  });

});

describe ("SubFund Helpers", () => {

  it ("should return the correct fund from getFund", () => {
    const component = shallow(generateComponent({
      primary: true,
      update: () => {},
      preFill: () => {},
      accounts: additionalAccounts,
    }));

    const { getFund } = component.instance();

    //regular calls
    expect(getFund("test fund 1").testId).toEqual(0);
    expect(getFund("should be und")).toBeUndefined();

    //must be exact match, not substring
    expect(getFund("harambe")).toBeUndefined();
    expect(getFund("RIP harambe fund").testId).toEqual(2);

    //is case sensitive
    expect(getFund("RIP Harambe fund")).toBeUndefined();

    //handles null passed in
    expect(getFund()).toBeUndefined();
  });

  it ("should return the correct monetized string from monetize", () => {
    const component = shallow(generateComponent({
      primary: true,
      update: () => {},
      preFill: () => {},
    }));

    const { monentize } = component.instance();
    const monetize = monentize;

    expect(monetize("")).toEqual("$0.00");
    expect(monetize()).toEqual("$0.00"); //unhandled

    expect(monetize("100")).toEqual("$100");
    expect(monetize(100)).toEqual("$100");
    expect(monetize("100.50")).toEqual("$100.50");
    expect(monetize(100.5)).toEqual("$100.5");
    expect(monetize("0")).toEqual("$0");
    expect(monetize(0.0)).toEqual("$0");

    // "fixed" modifier
    expect(monetize("100", true)).toEqual("$100.00");
    expect(monetize(100, true)).toEqual("$100.00");
    expect(monetize("100.50", true)).toEqual("$100.50");
    expect(monetize(100.5, true)).toEqual("$100.50");
    expect(monetize("0", true)).toEqual("$0.00");
    expect(monetize(0.0, true)).toEqual("$0.00");

  });

});

    // const wrapper = shallow( <GiveNow {...sampleProps} />);
    // const { remove } = wrapper.instance();