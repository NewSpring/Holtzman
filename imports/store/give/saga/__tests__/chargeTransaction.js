
import sagaHelper from "redux-saga-testing";
import { takeLatest } from "redux-saga";
import { put, select, call, cps, take } from "redux-saga/effects";

import { Meteor } from "meteor/meteor";

import { initial } from "../../reducer";
import actions from "../../actions";
import types from "../../types";

import { chargeTransaction } from "../";

describe("early return", () => {
  const it = sagaHelper(chargeTransaction({ state: "HAPPY" }));
  it("exits on wrong state", result => {
    expect(result).toBeUndefined();
  });
});

describe("successful charge without saved payment", () => {
  const it = sagaHelper(chargeTransaction({ state: "submit" }));
  const initalState = {
    give: {
      ...initial,
    },
  };

  it("reads the state from the store", result => {
    expect(result.SELECT).toBeTruthy();
    return initalState;
  });

  it("sets the loading state", ({ PUT: { action }}) => {
    expect(action).toEqual(actions.loading());
  });

  it("reads from the store again if no saved account and not a schedule", result => {
    expect(result.SELECT).toBeTruthy();
    return initalState;
  });

  it("reads from the store again if not a saved account", result => {
    expect(result.SELECT).toBeTruthy();
    return initalState;
  });

  it("waits for the url to return if not found", result => {
    expect(result).toEqual(take(types.SET_TRANSACTION_DETAILS));
    return { url: "https://example.com/TOKEN" };
  });

  it("tries to submit a transaction with the correct token", result => {
    expect(result.CPS.args).toEqual(["TOKEN", null, undefined ]);
    return true;
  });

  it("puts a success state", result => {
    expect(result).toEqual(put(actions.setState("success")));
  });

  it("ends after a normal charge", result => {
    expect(result).toBeUndefined();
  });

});

describe("successful charge saved payment and schedules", () => {
  const it = sagaHelper(chargeTransaction({ state: "submit" }));
  const initalState = {
    give: {
      ...initial,
      savedAccount: { id: 1 },
      schedules: { 1: { start: "20200101" } },
    },
  };

  it("reads the state from the store", result => {
    expect(result.SELECT).toBeTruthy();
    return initalState;
  });

  it("sets the loading state", ({ PUT: { action }}) => {
    expect(action).toEqual(actions.loading());
  });

  it("tries to call 'give/order'", result => {
    result.CPS.fn.call(null, ...result.CPS.args);
    expect(Meteor.call).toHaveBeenCalledTimes(1);
    const args = Meteor.call.mock.calls[0];
    expect(args).toEqual([
      "give/order",
      {
        billing: {
          "first-name": null,
          "last-name": null,
          email: null,
          address1: null,
          address2: "",
          city: null,
          state: null,
          postal: null,
        },
        "merchant-defined-field-2": null,
        plan: { payments: 0, amount: 0 },
        "start-date": "20200101",
        "merchant-defined-field-3": "20200101",
        savedAccount: 1,
        savedAccountName: undefined,
      },
      true,
      undefined,
      undefined,
    ]);

    expect(result.CPS.args).toEqual([ "", null, undefined ]);
    return true;
  });

  it("puts a success state", result => {
    expect(result).toEqual(put(actions.setState("success")));
  });

  it("ends after a normal charge", result => {
    expect(result).toBeUndefined();
  });

});

describe("successful charge using a saved payment", () => {
  const it = sagaHelper(chargeTransaction({ state: "submit" }));
  const initalState = {
    give: {
      ...initial,
      savedAccount: { id: 1 },
    },
  };

  it("reads the state from the store", result => {
    expect(result.SELECT).toBeTruthy();
    return initalState;
  });

  it("sets the loading state", ({ PUT: { action }}) => {
    expect(action).toEqual(actions.loading());
  });

  it("reads from the store again if no saved account and not a schedule", result => {
    expect(result.SELECT).toBeTruthy();
    return initalState;
  });


  it("tries to submit person details to ensure a url", result => {
    expect(result.CPS.args[0]).toEqual({
      amount: 0,
      billing: {
        'first-name': null,
        'last-name': null,
        email: null,
        address1: null,
        address2: '',
        city: null,
        state: null,
        postal: null
      },
      'merchant-defined-field-2': null,
      savedAccount: 1,
      savedAccountName: undefined
    });
    return { url: "http://example.com/TOKEN" }
  });

  // BELOW IS TESTED IN ./submitPersonDetails
  it("submits a form", result => true);
  it("waits for a delay", result => {});
  it("sets a url", result => {});

  it("reads from the store again after submitting person details", result => {
    expect(result.SELECT).toBeTruthy();
    return { ...{ give: { ...initalState.give, ...{  url: "http://example.com/TOKEN" }} } };
  });

  it("tries to submit a transaction with the correct token", result => {
    expect(result.CPS.args).toEqual(["TOKEN", null, undefined ]);
    return true;
  });

  it("puts a success state", result => {
    expect(result).toEqual(put(actions.setState("success")));
  });

  it("ends after a normal charge", result => {
    expect(result).toBeUndefined();
  });

});
