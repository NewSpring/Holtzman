import sagaHelper from "redux-saga-testing";
import { takeLatest, put, select, call, cps, take } from "redux-saga/effects";

import { Meteor } from "meteor/meteor";

import { initial } from "../../reducer";
import actions from "../../actions";
import types from "../../types";

import { submitPersonDetails } from "../";

describe("with saved account and schedules", () => {
  const initalState = {
    ...initial,
    savedAccount: { id: 1 },
    schedule: { start: new Date() },
  };
  const it = sagaHelper(submitPersonDetails(initalState));

  it("should exit immediately", result => {
    expect(result).toBeUndefined();
  });
});

describe("normal submit", () => {
  const initalState = { ...initial };
  const it = sagaHelper(submitPersonDetails(initalState));

  it("should try and call 'order' with the formated data", result => {
    const formattedData = {
      amount: 0,
      billing: {
        "first-name": null,
        "last-name": null,
        email: null,
        address1: null,
        address2: "",
        city: null,
        state: null,
        postal: null
      },
      "merchant-defined-field-2": null,
    };
    expect(result.CALL.args[0].variables).toEqual({
      data: JSON.stringify(formattedData),
      id: null,
      instant: false,
    });
    return { data: { response: { url: "http://example.com/TOKEN" } } };
  });

  it("should try and store the url in the store", result => {
    expect(result).toEqual(put(actions.setDetails("http://example.com/TOKEN")));
  });

  it("should have ended", result => {
    expect(result).toBeUndefined();
  });

});


describe("normal submit with an error", () => {
  const initalState = { ...initial };
  const it = sagaHelper(submitPersonDetails(initalState));

  it("should try and call 'order' with the formated data", result => {

    const formattedData = {
      amount: 0,
      billing: {
        "first-name": null,
        "last-name": null,
        email: null,
        address1: null,
        address2: "",
        city: null,
        state: null,
        postal: null
      },
      "merchant-defined-field-2": null,
    };
    expect(result.CALL.args[0].variables).toEqual({
      data: JSON.stringify(formattedData),
      id: null,
      instant: false,
    });
    return new Error("ERROR");
  });

  it("should try and store nothing in the store", result => {
    expect(result).toEqual(put(actions.setDetails()));
  });

  it("should have ended", result => {
    expect(result).toBeUndefined();
  });

});

describe("submit with a saved payment", () => {
  const initalState = { ...initial };
  const it = sagaHelper(submitPersonDetails(initalState, true));

  it("should try and call 'order' with the formated data", result => {
    const formattedData = {
      amount: 0,
      billing: {
        "first-name": null,
        "last-name": null,
        email: null,
        address1: null,
        address2: "",
        city: null,
        state: null,
        postal: null
      },
      "merchant-defined-field-2": null,
    };
    expect(result.CALL.args[0].variables).toEqual({
      data: JSON.stringify(formattedData),
      id: null,
      instant: false,
    });
    return { data: { response: { url: "http://example.com/TOKEN" } } };
  });

  window.fetch = jest.fn(() => new Promise(resolve => resolve()));

  it("should try to submit an empty set of payment details", result => {
    const [url, request] = window.fetch.mock.calls[0];
    const { method, body, mode } = request;

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(url).toBe("http://example.com/TOKEN");
    expect(method).toBe("POST");
    expect(mode).toBe("no-cors");
    expect(body).toMatchSnapshot();
    window.fetch.mockClear();
  });

  it("should try and store the url in the store", result => {
    expect(result).toEqual(put(actions.setDetails("http://example.com/TOKEN")));
  });

  it("should have ended", result => {
    expect(result).toBeUndefined();
  });

});
