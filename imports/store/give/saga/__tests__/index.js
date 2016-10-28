import sagaHelper from "redux-saga-testing";
import { takeLatest } from "redux-saga";
import { put, select, call, cps } from "redux-saga/effects";

import { initial } from "../../reducer";

import {
  delay,
  validate
} from "../";

describe("delay", () => {
  it("delays a result", async () => {
    let success = false;
    setTimeout(() => { success = true }, 10);
    await delay(11);
    expect(success).toBe(true);
  });
});

describe("validate", () => {
  describe("successful validation", () => {
    const it = sagaHelper(validate());
    it("requires initial seed data", () => ({
      give: { ...initial },
    }));

    it("formats the data in the store", result => {
      const mockedOrder = cps(() => {}, {
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
      });

      expect(result.CPS.fn.name).toBe("order");
      expect(result.CPS.args[0]).toEqual(mockedOrder.CPS.args[0]);

      return { url: "http://test.com/TOKEN" };
    });

    // XXX how to test the args of this
    it("tries to submit payment details with the data and url", result => {
      result.next();
      return null;
    });

    it("tries to submit payment details with the data and url", result => {
      const mockedOrder = cps(() => {}, "TOKEN", null, null);
      expect(result.CPS.fn.name).toBe("charge");
      expect(result.CPS.args).toEqual(mockedOrder.CPS.args);
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
      const mockedOrder = cps(() => {}, {
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
      });

      expect(result.CPS.fn.name).toBe("order");
      expect(result.CPS.args[0]).toEqual(mockedOrder.CPS.args[0]);

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
      const mockedOrder = cps(() => {}, {
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
      });

      expect(result.CPS.fn.name).toBe("order");
      expect(result.CPS.args[0]).toEqual(mockedOrder.CPS.args[0]);

      return { url: "http://test.com/TOKEN" };
    });

    // XXX how to test the args of this
    it("tries to submit payment details with the data and url", result => {
      result.next();
      return null;
    });

    it("tries to submit payment details with the data and url", result => {
      const mockedOrder = cps(() => {}, "TOKEN", null, null);
      expect(result.CPS.fn.name).toBe("charge");
      expect(result.CPS.args).toEqual(mockedOrder.CPS.args);
      return new Error("SAMPLE ERROR");
    });

    it("finally returns an object with faling status", ({ success, validationError }) => {
      expect(success).toBe(false);
      expect(validationError.message).toBe("SAMPLE ERROR");
    });
  });


});

