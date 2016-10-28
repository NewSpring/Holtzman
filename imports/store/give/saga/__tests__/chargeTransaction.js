
import sagaHelper from "redux-saga-testing";
import { takeLatest } from "redux-saga";
import { put, select, call, cps, take } from "redux-saga/effects";

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
