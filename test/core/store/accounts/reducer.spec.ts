import { assert } from "chai";

import { default as reducer, AccountState } from "./../../../../src/core/store/accounts/reducer";

describe("core/store/accounts/reducer", () => {

  describe("ACCOUNTS.SET_FORGOT", () => {

    it("sets forgot boolean", () => {
      let oldState = { forgot: false };
      let action = { forgot: true, type: "ACCOUNTS.SET_FORGOT" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.forgot, false);
      assert.equal(newState.forgot, true);
    });

    it("skips non boolean", () => {
      let oldState = { forgot: false };
      let action = { forgot: "true", type: "ACCOUNTS.SET_FORGOT" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.forgot, false);
      assert.equal(newState.forgot, false);
    });

  });

  describe("ACCOUNTS.SET_ACCOUNT_STATUS", () => {

    it("sets forgot boolean", () => {
      let oldState = { account: false };
      let action = { account: true, type: "ACCOUNTS.SET_ACCOUNT_STATUS" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.account, false);
      assert.equal(newState.account, true);
    });

    it("skips non boolean", () => {
      let oldState = { account: false };
      let action = { account: "true", type: "ACCOUNTS.SET_ACCOUNT_STATUS" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.account, false);
      assert.equal(newState.account, false);
    });

  });

});
