
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
    expect(result.CALL.args[0].variables).toEqual({
      token: "TOKEN",
      name: null,
      id: undefined
    });
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
      schedule: { start: "20200101" },
    },
  };

  it("reads the state from the store", result => {
    expect(result.SELECT).toBeTruthy();
    return initalState;
  });

  it("sets the loading state", ({ PUT: { action }}) => {
    expect(action).toEqual(actions.loading());
  });

  it("tries to call create order mutation", result => {
    const variables = result.CALL.args[0].variables;
    expect(variables).toEqual({
      data: JSON.stringify({
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
        "merchant-defined-field-1": "",
        "merchant-defined-field-4": "",
        savedAccount: 1,
        savedAccountName: undefined,
      }),
      instant: true,
      id: undefined,
    });

    return true;
  });

  it("puts a success state", result => {
    expect(result).toEqual(put(actions.setState("success")));
  });

  it("ends after a normal charge", result => {
    expect(result).toBeUndefined();
  });

});

window.ga = jest.fn();
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
    expect(result.CALL.args[0].variables).toEqual({
      data: JSON.stringify({
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
      }),
      id: null,
      instant: false,
    });
    return { data: { response: { url: "http://example.com/TOKEN" }}};
  });

  // BELOW IS TESTED IN ./submitPersonDetails
  it("submits a form", result => true);
  it("sets a url", result => {});

  it("reads from the store again after submitting person details", result => {
    expect(result.SELECT).toBeTruthy();
    return { ...{ give: { ...initalState.give, ...{  url: "http://example.com/TOKEN" }} } };
  });

  it("tries to submit a transaction with the correct token", result => {
    expect(result.CALL.args[0].variables).toEqual({
      token: "TOKEN",
      id: undefined,
      name: null
    });
    return true;
  });

  it("puts a success state", result => {
    ga.mockClear();
    expect(result).toEqual(put(actions.setState("success")));
  });

  it("ends after a normal charge", result => {
    expect(window.ga.mock.calls).toMatchSnapshot();
    expect(window.ga).toHaveBeenCalledTimes(2)
    delete window.ga;
    expect(result).toBeUndefined();
  });
});

fdescribe("validating cards on saved payment creation", () => {
  const giveData = {
    personal: {},
    billing: {},
    payment: {
      type: "cc"
    },
  };
  const it = sagaHelper(chargeTransaction({ state: "submit" }));
  const initalState = {
    give: {
      ...initial,
      savedAccount: {},
      data: giveData,
    },
  };

  it("reads the state from the store", result => {
    expect(result.SELECT).toBeTruthy();
    return initalState;
  });

  it("skips over loading state", result => {});
  it("skips over setting store the first time", result => {
    return {};
  });
  it("passes give data", result => ({
    give: {
      url: "URL-Mc-URLface",
      data: giveData,
    }
  }));

  it("calls validation method", result => {
    // validate calls select() first.
    // if validate wasn't being called, the next yield in the file
    // is a graphql call, so this would fail.
    expect(result.SELECT).toBeDefined();
    return { validationError: true };
  });
});
