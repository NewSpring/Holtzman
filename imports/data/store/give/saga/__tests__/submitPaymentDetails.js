import sagaHelper from "redux-saga-testing";
import { takeLatest, put, select, call, cps, take } from "redux-saga/effects";

import { Meteor } from "meteor/meteor";

import { initial } from "../../reducer";
import actions from "../../actions";
import types from "../../types";

import { submitPaymentDetails } from "../";

describe("early return without cc info", () => {
  const it = sagaHelper(submitPaymentDetails({
    payment: { type: "cc" },
  }));
  it("exits on wrong state", result => {
    expect(result).toBeUndefined();
  });
});

describe("early return without ach info", () => {
  const it = sagaHelper(submitPaymentDetails({
    payment: { type: "ach" },
  }));
  it("exits on wrong state", result => {
    expect(result).toBeUndefined();
  });
});

describe("using a credit card", () => {
  const it = sagaHelper(submitPaymentDetails({
    payment: {
      type: "cc",
      cardNumber: 4111111111111111,
      expiration: "07/19",
      ccv: "001"
    },
  }, "http://example.com/TOKEN"));

  window.fetch = jest.fn(() => new Promise(resolve => resolve()));

  it("should submit a form to the correct place", result => {
    const [url, request] = window.fetch.mock.calls[0];
    const { method, body, mode } = request;

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(url).toBe("http://example.com/TOKEN");
    expect(method).toBe("POST");
    expect(mode).toBe("no-cors");
    expect(body).toMatchSnapshot();
    window.fetch.mockClear();
  });

  it("should wait for 300 ms", () => {});

  it("should end the submission", result => {
    expect(result).toBeUndefined();
  });

});

describe("using a bank card", () => {
  const it = sagaHelper(submitPaymentDetails({
    payment: {
      type: "ach",
      accountNumber: 4111111111111111,
      routingNumber: 4111111111111112,
      type: "Bank",
    },
    personal: { firstName: "James", lastName: "Baxley" },
  }, "http://example.com/TOKEN"));

  window.fetch = jest.fn(() => new Promise(resolve => resolve()));

  it("should submit a form to the correct place", result => {
    const [url, request] = window.fetch.mock.calls[0];
    const { method, body, mode } = request;

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(url).toBe("http://example.com/TOKEN");
    expect(method).toBe("POST");
    expect(mode).toBe("no-cors");
    expect(body).toMatchSnapshot();
    window.fetch.mockClear();
  });

  it("should wait for 300 ms", () => {});

  it("should end the submission", result => {
    expect(result).toBeUndefined();
  });

});
