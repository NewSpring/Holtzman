
import { Meteor } from "meteor/meteor";
import { shallow, mount } from "enzyme";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { GiveNow, PAYMENT_DETAILS_QUERY } from "../";

const sampleProps = {
  data: {
    accounts: [{ id: "TEST" }, { id: "TEST2" }],
    loading: true,
    refetch: jest.fn(() => new Promise((resolve, reject) => { resolve(); })),
  },
  dispatch: jest.fn(),
};

it("has a known query", () => {
  expect(PAYMENT_DETAILS_QUERY).toMatchSnapshot();
})

describe("GiveNow", () => {
  beforeEach(() => {
    reset();
    startBuffering();
  })
  afterEach(() => {
    Meteor.call.mockClear();
    reset();
  });

  it("has a remove method", () => {
    const wrapper = shallow( <GiveNow {...sampleProps} />);

    const component = wrapper.instance();
    expect(component.remove).toBeTruthy();
  });

  it("calls `PaymentAccounts.remove` when removing an account", () => {
    const wrapper = shallow( <GiveNow {...sampleProps} />);

    const { remove } = wrapper.instance();
    remove("TEST");
    expect(Meteor.call.mock.calls.length).toEqual(1);
    expect(Meteor.call.mock.calls[0][0]).toEqual("PaymentAccounts.remove");
    expect(Meteor.call.mock.calls[0][1]).toEqual("TEST");
    expect(wrapper.state()).toEqual({ loading: true, accounts: [] });

    const returnMethod = Meteor.call.mock.calls[0][2];
    returnMethod();

    return new Promise((r) => {
      // testing hack
      setTimeout(r, 5); // bypass internal meteor method timing
    })
      .then(() => {
        expect(sampleProps.data.refetch.mock.calls.length).toEqual(1);
        expect(wrapper.state()).toEqual({ loading: null, accounts: null });
      });

  });
});
