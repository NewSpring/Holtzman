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

  describe("ACCOUNTS.SET_DATA", () => {

    it("sets all props", () => {
      let oldState = { data: {
        email: "the old email",
        password: "the old password",
        terms: false,
        firstName: "old first",
        lastName: "old last",
        personId: 1,
       }, };

      let action = { data: {
        email: "the new email",
        password: "the new password",
        terms: true,
        firstName: "new first",
        lastName: "new last",
        personId: 2,
      }, type: "ACCOUNTS.SET_DATA", };

      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.data.email, "the old email");
      assert.equal(oldState.data.password, "the old password");
      assert.equal(oldState.data.terms, false);
      assert.equal(oldState.data.firstName, "old first");
      assert.equal(oldState.data.lastName, "old last");
      assert.equal(oldState.data.personId, 1);

      assert.equal(newState.data.email, "the new email");
      assert.equal(newState.data.password, "the new password");
      assert.equal(newState.data.terms, true);
      assert.equal(newState.data.firstName, "new first");
      assert.equal(newState.data.lastName, "new last");
      assert.equal(newState.data.personId, 2);
    });

    it("sets some props", () => {
      let oldState = { data: {
        email: "the old email",
        password: "the old password",
        terms: false,
        firstName: null,
        lastName: null,
        personId: 1,
       }, };

      let action = { data: {
        terms: true,
        firstName: "new first",
        personId: 2,
      }, type: "ACCOUNTS.SET_DATA", };

      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.data.email, "the old email");
      assert.equal(oldState.data.password, "the old password");
      assert.equal(oldState.data.terms, false);
      assert.equal(oldState.data.firstName, null);
      assert.equal(oldState.data.lastName, null);
      assert.equal(oldState.data.personId, 1);

      assert.equal(newState.data.email, "the old email");
      assert.equal(newState.data.password, "the old password");
      assert.equal(newState.data.terms, true);
      assert.equal(newState.data.firstName, "new first");
      assert.equal(newState.data.lastName, null);
      assert.equal(newState.data.personId, 2);
    });

  });

  describe("ACCOUNTS.REMOVE_DATA", () => {

    it("does nothing without a field", () => {
      let oldState = { data: {
        email: "the old email",
        password: "the old password",
        terms: false,
        firstName: "old first",
        lastName: "old last",
        personId: 1,
       }, };

      let action = { field: null, type: "ACCOUNTS.REMOVE_DATA" };

      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.data.email, "the old email");
      assert.equal(oldState.data.password, "the old password");
      assert.equal(oldState.data.terms, false);
      assert.equal(oldState.data.firstName, "old first");
      assert.equal(oldState.data.lastName, "old last");
      assert.equal(oldState.data.personId, 1);

      assert.equal(newState.data.email, "the old email");
      assert.equal(newState.data.password, "the old password");
      assert.equal(newState.data.terms, false);
      assert.equal(newState.data.firstName, "old first");
      assert.equal(newState.data.lastName, "old last");
      assert.equal(newState.data.personId, 1);
    });

    it("does nothing if the field is already unset", () => {
      let oldState = { data: {
        email: null,
        password: "the old password",
        terms: false,
        firstName: "old first",
        lastName: "old last",
        personId: 1,
       }, };

      let action = { field: "email", type: "ACCOUNTS.REMOVE_DATA" };

      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.data.email, null);
      assert.equal(oldState.data.password, "the old password");
      assert.equal(oldState.data.terms, false);
      assert.equal(oldState.data.firstName, "old first");
      assert.equal(oldState.data.lastName, "old last");
      assert.equal(oldState.data.personId, 1);

      assert.equal(newState.data.email, null);
      assert.equal(newState.data.password, "the old password");
      assert.equal(newState.data.terms, false);
      assert.equal(newState.data.firstName, "old first");
      assert.equal(newState.data.lastName, "old last");
      assert.equal(newState.data.personId, 1);
    });

    it("clears the field", () => {
      let oldState = { data: {
        email: null,
        password: "the old password",
        terms: false,
        firstName: "old first",
        lastName: "old last",
        personId: 1,
       }, };

      let action = { field: "firstName", type: "ACCOUNTS.REMOVE_DATA" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.data.email, null);
      assert.equal(oldState.data.password, "the old password");
      assert.equal(oldState.data.terms, false);
      assert.equal(oldState.data.firstName, "old first");
      assert.equal(oldState.data.lastName, "old last");
      assert.equal(oldState.data.personId, 1);

      assert.equal(newState.data.email, null);
      assert.equal(newState.data.password, "the old password");
      assert.equal(newState.data.terms, false);
      assert.equal(newState.data.firstName, null);
      assert.equal(newState.data.lastName, "old last");
      assert.equal(newState.data.personId, 1);
    });

  });

});
