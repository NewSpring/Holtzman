/* eslint-disable */

import actions from "../actions";

it("includes types in the export", () => {
  expect(actions.types).toMatchSnapshot();
});

it("setAccount", () => {
  expect(actions.setAccount({ 1: { name: "test" }})).toMatchSnapshot();
});

it("save", () => {
  expect(actions.save({ personal: { firstName: "James "}})).toMatchSnapshot();
});

it("clear", () => {
  expect(actions.clear("personal", "firstName")).toMatchSnapshot();
});

it("setState", () => {
  expect(actions.setState("thinking")).toMatchSnapshot();
});

it("signin", () => {
  expect(actions.signin()).toMatchSnapshot();
});

it("loading", () => {
  expect(actions.loading()).toMatchSnapshot();
});

it("signout", () => {
  expect(actions.signout()).toMatchSnapshot();
});

it("error", () => {
  expect(actions.error(new Error())).toMatchSnapshot();
});

it("fix", () => {
  expect(actions.fix(new Error())).toMatchSnapshot();
});

it("reset", () => {
  expect(actions.reset()).toMatchSnapshot();
});

it("setErrors", () => {
  expect(actions.setErrors([])).toMatchSnapshot();
});

it("success", () => {
  expect(actions.success()).toMatchSnapshot();
});

it("fail", () => {
  expect(actions.fail()).toMatchSnapshot();
});

it("forgot", () => {
  expect(actions.forgot()).toMatchSnapshot();
});

it("remember", () => {
  expect(actions.remember()).toMatchSnapshot();
});

it("authorize", () => {
  expect(actions.authorize({ "authorized": true })).toMatchSnapshot();
});

it("person", () => {
  expect(actions.person({ "person": { "firstName": "John", "lastName": "Doe" }})).toMatchSnapshot();
});

it("showWelcome", () => {
  expect(actions.showWelcome()).toMatchSnapshot();
});

it("setAlternateAccounts", () => {
  expect(actions.setAlternateAccounts([])).toMatchSnapshot();
});

it("peopleWithoutAccountEmails", () => {
  expect(actions.peopleWithoutAccountEmails([{ "email": "web@newspring.cc", "person": "John Doe" }])).toMatchSnapshot();
});

it("completeAccount", () => {
  expect(actions.completeAccount()).toMatchSnapshot();
});

it("resetAccount", () => {
  expect(actions.resetAccount()).toMatchSnapshot();
});


