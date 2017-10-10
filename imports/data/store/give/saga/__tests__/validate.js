import sagaHelper from "redux-saga-testing";
import { takeLatest, put, select, call, cps } from "redux-saga/effects";

import { initial } from "../../reducer";

import { validate } from "../";

describe("successful validation", () => {
  const it = sagaHelper(validate());
  it("requires initial seed data", () => ({
    give: { ...initial },
  }));

  it("formats the data in the store", result => {

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
        'merchant-defined-field-2': null
      }),
      id: null,
      instant: false,
    });

    return { data: { response: { url: "http://test.com/TOKEN" } } };
  });

  // XXX how to test the args of this
  it("tries to submit payment details with the data and url", result => {
    result.next();
    return null;
  });

  it("tries to submit payment details with the data and url", result => {
    expect(result.CALL.args[0].variables).toEqual({ token: "TOKEN" });
    return { };
  });

  it("finally returns an object with status", ({ success, validationError }) => {
    expect(success).toBe(true);
    expect(validationError).toBe(false);
  });
});


describe("failure in order", () => {
  const it = sagaHelper(validate());
  it("requires initial seed data", () => ({
    give: { ...initial },
  }));

  it("formats the data in the store", result => {
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
        'merchant-defined-field-2': null
      }),
      id: null,
      instant: false,
    });
    return new Error("SAMPLE ERROR");
  });

  // XXX how to test the args of this
  it("tries to submit payment details with the data and url", result => {
    result.next();
    return null;
  });

  it("finally returns an object with faling status", ({ success, validationError }) => {
    expect(success).toBe(false);
    expect(validationError.message).toBe("SAMPLE ERROR");
  });
});


describe("failure in charge", () => {
  const it = sagaHelper(validate());
  it("requires initial seed data", () => ({
    give: { ...initial },
  }));

  it("formats the data in the store", result => {
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
        'merchant-defined-field-2': null
      }),
      id: null,
      instant: false,
    });

    return { data: { response: { url: "http://test.com/TOKEN" } } };
  });

  // XXX how to test the args of this
  it("tries to submit payment details with the data and url", result => {
    result.next();
    return null;
  });

  it("tries to submit payment details with the data and url", result => {
    expect(result.CALL.args[0].variables).toEqual({ token: "TOKEN" });
    return { data: { response: { error: "SAMPLE ERROR" } } };
  });

  it("finally returns an object with faling status", ({ success, validationError }) => {
    expect(success).toBe(false);
    expect(validationError).toBe("SAMPLE ERROR");
  });
});
