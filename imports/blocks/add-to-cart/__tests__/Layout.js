import { Component } from "react";
import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";

import { createStore } from "redux";

import { Provider } from "react-redux";
import { reset, startBuffering } from "aphrodite/lib/inject";

import Layout from "../Layout";

import Subfund from "../Subfund";

jest.mock("../Subfund", () => jest.fn(() => <div />));
jest.mock("../../checkout-buttons", () => jest.fn(() => <div />));
jest.useFakeTimers();

const additionalAccounts = [
  { value: 1, label: "TEST 1" },
  { value: 2, label: "TEST 2" },
  { value: 3, label: "TEST 3" },
  { value: 4, label: "TEST 4" },
];

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    accounts: [
      { value: "test" }
    ],
    preFill: () => {},
  };
  return (
    <Layout {...defaultProps} {...additionalProps} />
  );
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("should render with minimal props", () => {
  const component = shallow(generateComponent());
  expect(shallowToJson(component)).toMatchSnapshot();
});

// XXX this will work fully when the stuff isn't mocked'
it("should handle multiple accounts", () => {
  // Mock the subfund lifecycle where it updates the parent component
  // this lets it set the second input on load
  // XXX it would be nice if we could do this without the immediate rerender for SSR
  class LocalSubFund extends Component {
    state = {
      amount: null
    }
    componentWillMount() {
      if (this.props.primary) {
        this.props.update(this.props.instance, this.props.accounts[0].value, this.state.amount);
      }
    }
    render() {
      return null;
    }
  }
  Subfund.mockImplementationOnce((props) => <LocalSubFund {...props} />);
  const component = mount(generateComponent({accounts: additionalAccounts}));
  expect(mountToJson(component)).toMatchSnapshot();

  // 2 subfund mocks and checkout-buttons
  expect(component.find("mockConstructor").length).toEqual(3);

  // make sure not all accouts are passed to the secondary subfund
  expect(component.find("mockConstructor").get(1).props.accounts.length).toEqual(3);
});

describe ("Update", () => {
  it("should return true if an instance exists", () => {
    const component = mount(generateComponent({accounts: additionalAccounts}));
    const { instanceExists, update } = component.instance();
    update(0,1,10);
    expect(instanceExists(0)).toBeTruthy();
  });

  it("should return undefined if an instance doesn't exist", () => {
    const component = mount(generateComponent({accounts: additionalAccounts}));
    const { instanceExists } = component.instance();
    expect(instanceExists(0)).toBe(undefined);
  });

  it("should update state to reflect one fund update", () => {
    const component = mount(generateComponent({accounts: additionalAccounts}));
    const { update } = component.instance();
    update(0, 1, 10);

    //updating one subfund without another showing should show a second one.
    expect(component.state().SubFundInstances).toEqual(2);

    //the first subfund should have a value of 10
    expect(component.state().instances[0]).toEqual({id: 0, accountId: 1, amount: 10});

    expect(mountToJson(component)).toMatchSnapshot();
  });

  it ("should allow for multiple updates on separate instances of SubFund", () => {
    const component = mount(generateComponent({accounts: additionalAccounts}));
    const { update } = component.instance();
    update(0, 1, 10);
    update(1, 3, 30);

    // having two subfunds with values should show a third
    expect(component.state().SubFundInstances).toEqual(3);

    //the first subfund should have a value of 10
    expect(component.state().instances[0]).toEqual({id: 0, accountId: 1, amount: 10});
    expect(component.state().instances[1]).toEqual({id: 1, accountId: 3, amount: 30});

    expect(mountToJson(component)).toMatchSnapshot();
  });

  it ("should allow change of fund for an instance of SubFund", () => {
    const component = mount(generateComponent({accounts: additionalAccounts}));
    const { update } = component.instance();
    update(0, 1, 10);
    update(1, 3, 30);
    update(1, 2, 20);

    expect(component.state().SubFundInstances).toEqual(3);

    expect(component.state().instances[0]).toEqual({id: 0, accountId: 1, amount: 10});
    expect(component.state().instances[1]).toEqual({id: 1, accountId: 2, amount: 20});

    expect(mountToJson(component)).toMatchSnapshot();
  });
});

describe("Remove", () => {
  it("should remove the first instance", () => {
    const component = mount(generateComponent({accounts: additionalAccounts}));
    const { update, remove } = component.instance();
    // seed our instances
    update(0, 1, 10);
    update(1, 3, 30);
    expect(component.state().SubFundInstances).toEqual(3);

    // now remove the first instance
    remove(0);
    expect(component.state().SubFundInstances).toEqual(2);
    // the first subfund now should be the second one we added.
    expect(component.state().instances[0]).toEqual({id: 1, accountId: 3, amount: 30});
  });

  it("should remove the second instance", () => {
    const component = mount(generateComponent({accounts: additionalAccounts}));
    const { update, remove } = component.instance();
    // seed our instances
    update(0, 1, 10);
    update(1, 3, 30);
    expect(component.state().SubFundInstances).toEqual(3);

    // now remove the first instance
    remove(1);
    expect(component.state().SubFundInstances).toEqual(2);
    // the first subfund now should still be the first one we added.
    expect(component.state().instances[0]).toEqual({id: 0, accountId: 1, amount: 10});
  });

  it("should remove the middle instance", () => {
    const component = mount(generateComponent({accounts: additionalAccounts}));
    const { update, remove } = component.instance();
    // seed our instances
    // update(key, id, amount);
    update(0, 1, 10);
    update(1, 2, 30);
    update(2, 3, 50);
    expect(component.state().SubFundInstances).toEqual(4);

    // now remove the first instance
    // remove(key);
    remove(1);
    jest.runAllTimers();
    expect(component.state().SubFundInstances).toEqual(3);
    // the first subfund now should still be the first one we added.
    expect(component.state().instances[0]).toEqual({id: 0, accountId: 1, amount: 10});
    expect(component.state().instances[1]).toEqual({id: 1, accountId: 3, amount: 50});
  });

  // XXX not sure how to test this version of the submit function.
  // it("should click the submit button one time", () => {
  // });
});
