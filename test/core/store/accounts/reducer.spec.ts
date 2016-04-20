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

  describe("ACCOUNTS.SET_STATE", () => {

    it("ignores bad state values", () => {
      let oldState = { state: "the old state" };
      let action = { type: "ACCOUNTS.SET_STATE", state: null };
      let newState = reducer(oldState, action) as AccountState;
      assert.equal(newState.state, "the old state");
      assert.equal(oldState.state, "the old state");

      oldState = { state: "the old state" };
      action = { type: "ACCOUNTS.SET_STATE", state: "drew" };
      newState = reducer(oldState, action) as AccountState;
      assert.equal(newState.state, "the old state");
      assert.equal(oldState.state, "the old state");

      oldState = { state: "the old state" };
      action = { type: "ACCOUNTS.SET_STATE", state: "LOADING" };
      newState = reducer(oldState, action) as AccountState;
      assert.equal(newState.state, "the old state");
      assert.equal(oldState.state, "the old state");
    });

    it("allows trimmable whitespace in state", () => {
      let oldState = { state: "the old state" };
      let action = { type: "ACCOUNTS.SET_STATE", state: "  submit  " };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.state, "the old state");
      assert.equal(newState.state, "submit");
    });

    it("sets additional things for signout", () => {
      let oldState = {
        state: "the old state",
        authorized: true,
        person: { age: 50, firstName: "old first name" },
      };
      let action = { type: "ACCOUNTS.SET_STATE", state: "signout" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.state, "the old state");
      assert.equal(oldState.authorized, true);
      assert.equal(oldState.person.age, 50);
      assert.equal(oldState.person.firstName, "old first name");

      assert.equal(newState.state, "default");
      assert.equal(newState.authorized, false);
      assert.equal(newState.person.age, null);
      assert.equal(newState.person.firstName, null);
    });

  });

  describe("ACCOUNTS.SET_ERROR", () => {
    it("ignores actions with no error", () => {
      let oldState = {
        errors: {
          errorA: "A",
          errorB: "B",
        },
      };
      let action = { type: "ACCOUNTS.SET_ERROR", error: null };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.errors["errorA"], "A");
      assert.equal(oldState.errors["errorB"], "B");
      assert.equal(Object.keys(oldState.errors).length, 2);

      assert.equal(newState.errors["errorA"], "A");
      assert.equal(newState.errors["errorB"], "B");
      assert.equal(Object.keys(newState.errors).length, 2);
    });

    it("adds error", () => {
      let oldState = {
        errors: {
          errorA: "A",
          errorB: "B",
        },
      };
      let action = { type: "ACCOUNTS.SET_ERROR", error: { errorC: "C" } };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.errors["errorA"], "A");
      assert.equal(oldState.errors["errorB"], "B");
      assert.equal(Object.keys(oldState.errors).length, 2);

      assert.equal(newState.errors["errorA"], "A");
      assert.equal(newState.errors["errorB"], "B");
      assert.equal(newState.errors["errorC"], "C");
      assert.equal(Object.keys(newState.errors).length, 3);
    });

    it("overwrites error", () => {
      let oldState = {
        errors: {
          errorA: "A",
          errorB: "B",
        },
      };
      let action = { type: "ACCOUNTS.SET_ERROR", error: { errorB: "B2" } };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.errors["errorA"], "A");
      assert.equal(oldState.errors["errorB"], "B");
      assert.equal(Object.keys(oldState.errors).length, 2);

      assert.equal(newState.errors["errorA"], "A");
      assert.equal(newState.errors["errorB"], "B2");
      assert.equal(Object.keys(newState.errors).length, 2);
    });

  });

  describe("ACCOUNTS.REMOVE_ERROR", () => {
    it("ignores actions with no error", () => {
      let oldState = {
        errors: {
          errorA: "A",
          errorB: "B",
        },
      };
      let action = { type: "ACCOUNTS.REMOVE_ERROR", error: null };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.errors["errorA"], "A");
      assert.equal(oldState.errors["errorB"], "B");
      assert.equal(Object.keys(oldState.errors).length, 2);

      assert.equal(newState.errors["errorA"], "A");
      assert.equal(newState.errors["errorB"], "B");
      assert.equal(Object.keys(newState.errors).length, 2);
    });

    it("is okay with removing a non existant error", () => {
      let oldState = {
        errors: {
          errorA: "A",
          errorB: "B",
        },
      };
      let action = { type: "ACCOUNTS.REMOVE_ERROR", error: "errorC" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.errors["errorA"], "A");
      assert.equal(oldState.errors["errorB"], "B");
      assert.equal(Object.keys(oldState.errors).length, 2);

      assert.equal(newState.errors["errorA"], "A");
      assert.equal(newState.errors["errorB"], "B");
      assert.equal(Object.keys(newState.errors).length, 2);
    });

    it("removes the error", () => {
      let oldState = {
        errors: {
          errorA: "A",
          errorB: "B",
        },
      };
      let action = { type: "ACCOUNTS.REMOVE_ERROR", error: "errorB" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.errors["errorA"], "A");
      assert.equal(oldState.errors["errorB"], "B");
      assert.equal(Object.keys(oldState.errors).length, 2);

      assert.equal(newState.errors["errorA"], "A");
      assert.equal(Object.keys(newState.errors).length, 1);
    });
  });

  describe("ACCOUNTS.SET_ERRORS", () => {
    it("merges the errors", () => {
      let oldState = {
        errors: {
          errorA: "A",
          errorB: "B",
        },
      };
      let action = { type: "ACCOUNTS.SET_ERRORS", errors: {
        errorC: "C",
        errorD: "D",
      }, };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.errors["errorA"], "A");
      assert.equal(oldState.errors["errorB"], "B");
      assert.equal(Object.keys(oldState.errors).length, 2);

      assert.equal(newState.errors["errorA"], "A");
      assert.equal(newState.errors["errorB"], "B");
      assert.equal(newState.errors["errorC"], "C");
      assert.equal(newState.errors["errorD"], "D");
      assert.equal(Object.keys(newState.errors).length, 4);
    });
  });

  describe("ACCOUNTS.REMOVE_ERRORS", () => {
    it("removes the errors", () => {
      let oldState = {
        errors: {
          errorA: "A",
          errorB: "B",
        },
      };
      let action = { type: "ACCOUNTS.REMOVE_ERRORS" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.errors["errorA"], "A");
      assert.equal(oldState.errors["errorB"], "B");
      assert.equal(Object.keys(oldState.errors).length, 2);

      assert.equal(Object.keys(newState.errors).length, 0);
    });
  });

  describe("ACCOUNTS.SET_SUCCESS", () => {
    it("ignores non booleans", () => {
      let oldState = {
        success: false,
      };
      let action = { type: "ACCOUNTS.SET_SUCCESS", success: "true" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.success, false);
      assert.equal(newState.success, false);
    });

    it("sets success", () => {
      let oldState = {
        success: false,
      };
      let action = { type: "ACCOUNTS.SET_SUCCESS", success: true };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.success, false);
      assert.equal(newState.success, true);
    });
  });

  describe("ACCOUNTS.IS_AUTHORIZED", () => {
      it("ignores non booleans", () => {
      let oldState = {
        authorized: false,
      };
      let action = { type: "ACCOUNTS.IS_AUTHORIZED", authorized: "true" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.authorized, false);
      assert.equal(newState.authorized, false);
    });

    it("sets success", () => {
      let oldState = {
        authorized: false,
      };
      let action = { type: "ACCOUNTS.IS_AUTHORIZED", authorized: true };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.authorized, false);
      assert.equal(newState.authorized, true);
    });
  });

  describe("ACCOUNTS.SET_PERSON", () => {
    it("does nothing if no person in action", () => {
      let oldState = {
        person: { firstName: "the first name" },
      };
      let action = { type: "ACCOUNTS.SET_PERSON", person: false };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.person.firstName, "the first name");
      assert.equal(Object.keys(oldState.person).length, 1);

      assert.equal(newState.person.firstName, "the first name");
      assert.equal(Object.keys(newState.person).length, 1);
    });

    it("updates the person with defaults from initial state", () => {
      let oldState = {
        person: {
          firstName: "the first name",
          home: "the home",
          campus: "the campus",
        },
        authorized: false,
      };
      let action = { type: "ACCOUNTS.SET_PERSON", person: {
        firstName: "new first name",
      }, };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.person.firstName, "the first name");
      assert.equal(oldState.person.campus, "the campus");
      assert.equal(oldState.person.home, "the home");
      assert.equal(oldState.authorized, false);
      assert.equal(Object.keys(oldState.person).length, 3);

      assert.equal(newState.person.firstName, "new first name");
      assert.deepEqual(newState.person.campus, { name: null, shortcode: null });
      assert.deepEqual(newState.person.home, {
        city: null,
        country: null,
        id: null,
        zip: null,
        state: null,
        street1: null,
        street2: null,
      });
      assert.equal(newState.authorized, true);
      assert.equal(Object.keys(newState.person).length, 3);
    });

    it("updates the person", () => {
      let oldState = {
        person: {
          firstName: "the first name",
          home: { city: "old city" },
          campus: { shortcode: "old" },
        },
        authorized: false,
      };
      let action = { type: "ACCOUNTS.SET_PERSON",
        person: {
          firstName: "new first name",
          home: {
            city: "new city",
          },
          campus: {
            shortCode: "new",
          },
        },
      };
      let newState = reducer(oldState, action) as AccountState;

      assert.deepEqual(oldState.person, {
        firstName: "the first name",
          home: {
            city: "old city",
          },
          campus: {
            shortcode: "old",
          },
      });

      assert.deepEqual(newState.person, {
        firstName: "new first name",
        home: {
          city: "new city",
        },
        campus: {
          shortCode: "new",
        },
      });
    });

  });

  describe("ACCOUNTS.SHOW_WELCOME", () => {
    it("sets show welcome", () => {
      let oldState = {
        showWelcome: false,
      };
      let action = { type: "ACCOUNTS.SHOW_WELCOME" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.showWelcome, false);
      assert.equal(newState.showWelcome, true);
    });
  });

  describe("ACCOUNTS.SET_ALTERNATE_ACCOUNTS", () => {
    it("sets alt accounts", () => {
      let oldState = {
        alternateAccounts: {
          account1: "1",
        },
      };
      let action = { type: "ACCOUNTS.SET_ALTERNATE_ACCOUNTS", alternateAccounts: {
        account2: "2",
      }, };
      let newState = reducer(oldState, action) as AccountState;

      assert.deepEqual(oldState.alternateAccounts, { account1: "1" });
      assert.deepEqual(newState.alternateAccounts, { account2: "2" });
    });
  });

  describe("ACCOUNTS.SET_PEOPLE_WITHOUT_ACCOUNTS", () => {
    it("sets people without accounts", () => {
      let oldState = {
        peopleWithoutAccountEmails: {
          person1: "1",
        },
      };
      let action = { type: "ACCOUNTS.SET_PEOPLE_WITHOUT_ACCOUNTS", peopleWithoutAccountEmails: {
        person2: "2",
      }, };
      let newState = reducer(oldState, action) as AccountState;

      assert.deepEqual(oldState.peopleWithoutAccountEmails, { person1: "1" });
      assert.deepEqual(newState.peopleWithoutAccountEmails, { person2: "2" });
    });
  });

  describe("ACCOUNTS.COMPLETE_ACCOUNT", () => {
    it("sets show welcome", () => {
      let oldState = {
        resettingAccount: false,
      };
      let action = { type: "ACCOUNTS.COMPLETE_ACCOUNT" };
      let newState = reducer(oldState, action) as AccountState;

      assert.equal(oldState.resettingAccount, false);
      assert.equal(newState.resettingAccount, true);
    });
  });

  describe("ACCOUNTS.RESET_ACCOUNT", () => {
    it("sets defaults", () => {
      let oldState = { resettingAccount: true };
      let action = { type: "ACCOUNTS.RESET_ACCOUNT" };
      let newState = reducer(oldState, action) as AccountState;

      assert.deepEqual(oldState, { resettingAccount: true });
      assert.deepEqual(newState, {
        resettingAccount: false,
        peopleWithoutAccountEmails: [],
        alternateAccounts: [],
        account: true,
      });
    });
  });
});
