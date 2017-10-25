import sagaHelper from "redux-saga-testing";
import { takeLatest, put, select, call, cps, take } from "redux-saga/effects";

import actions from "../../actions";

import { clearGiveData } from "../";

describe("clearing data when authorized", () => {
  const it = sagaHelper(clearGiveData({ authorized: true }));

  it("should exit immediately", result => {
    expect(result).toBeUndefined();
  });
});


describe("clearing data when not authorized", () => {
  const it = sagaHelper(clearGiveData({ authorized: false }));

  it("should dispatch clearData", result => {
    expect(result).toEqual(put(actions.clearData()));
  });

  it("should exit", result => {
    expect(result).toBeUndefined();
  });
});
