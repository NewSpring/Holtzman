/* eslint-disable */

import reducer, { initial } from "../reducer";
import actions from "../actions";

it("has a known initial state", () => {
  expect(initial).toMatchSnapshot();
});

const changed = reducer(initial, actions.save({
  person: {
    firstName: "Jeff",
    lastName: "Goldblum"
  },
  age: 55,
}));

it("allows saving data", () => {
  expect(changed).toMatchSnapshot();
});

it("doesn't change state when removing if missing info", () => {
  const cleared = reducer(changed, actions.clear("person", "firstNme" ));
  expect(cleared).toMatchSnapshot();
  expect(cleared).toEqual(changed);
});

it("allows clearing individual data fields", () => {
  const cleared = reducer(changed, actions.clear("person", "firstname"));
  expect(cleared).toMatchSnapshot();
  expect(cleared.person.firstName).toBeFalsy();
});

it("sets the account to a forgot password state", () => {
  const forgot = reducer(changed, actions.forgot());
  expect(forgot).toMatchSnapshot();
  expect(forgot.forgot).toBeTruthy();
});

it("can disable the users account", () => {
  expect(changed.account).toBeTruthy();
  const disable = reducer(changed, actions.setAccount(false));
  expect(disable).toMatchSnapshot();
  expect(disable.account).toBeFalsy();
});

it("saves indiviual data about a person", () => {
  expect(changed.data.email).toBeFalsy();
  const disable = reducer(changed, actions.save({ email: "web@newspring.cc" }));
  expect(disable).toMatchSnapshot();
  expect(disable.data.email).toEqual("web@newspring.cc")
});

it("can remove data from a persons account", () => {
  const remove = reducer(changed, actions.clear("age"));
  expect(remove).toMatchSnapshot();
  expect(remove.age).toBeFalsy();
});

it("will save an error to the state", () => {
  const errors = { tooslow: { message: "must go faster" }};
  const error = reducer(initial, actions.error({ errors }));
  expect(error).toMatchSnapshot();
});

it("can remove errors from the state", () => {
  const errors = { tooslow: { message: "must go faster" }};
  const data = { ...changed, ...{errors: errors}};
  const error = reducer(data, actions.fix("tooslow"));
  expect(error).toMatchSnapshot();
  expect(error.errors).toEqual({});
});

it("it can clear all errors from the state", () => {
  const errors = { tooslow: { message: "must go faster" }};
  const data = { ...changed, ...{ errors: errors }};
  const error = reducer(data, actions.reset());
  expect(error).toMatchSnapshot();
  expect(error.errors).toEqual({});
});

it("checks whether or not a user is logged in", () => {
  expect(changed.authorized).toBeFalsy();
  const auth = reducer(changed, actions.authorize(true));
  expect(auth).toMatchSnapshot();
  expect(auth.authorized).toBeTruthy();
});

it("shows a welcome message when its the first time", () => {
  expect(changed.showWelcome).toBeFalsy();
  const welcome = reducer(changed, actions.showWelcome());
  expect(welcome).toMatchSnapshot();
  expect(welcome.showWelcome).toBeTruthy();
});

it("setAlternateAccounts");
it("peopleWithoutAccountEmails");
