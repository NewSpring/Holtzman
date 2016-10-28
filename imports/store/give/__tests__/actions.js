
import actions from "../actions";

it("includes types in the export", () => {
  expect(actions.types).toMatchSnapshot();
});

it("sets progress", () => {
  expect(actions.setProgress(1)).toMatchSnapshot();
});

it("goes to next", () => {
  expect(actions.next()).toMatchSnapshot();
});

it("setAccount", () => {
  expect(actions.setAccount({ 1: { name: "test" }})).toMatchSnapshot();
});

it("clearAccount", () => {
  expect(actions.clearAccount()).toMatchSnapshot();
});

it("setAccounts", () => {
  expect(actions.setAccounts([{ 1: { name: "TEST" }}])).toMatchSnapshot();
});

it("setTransactionType", () => {
  expect(actions.setTransactionType("default")).toMatchSnapshot();
});

it("addTransactions", () => {
  expect(actions.addTransactions([])).toMatchSnapshot();
});

it("clearTransaction", () => {
  expect(actions.clearTransaction(1)).toMatchSnapshot();
});

it("save", () => {
  expect(actions.save({ personal: { firstName: "James "}})).toMatchSnapshot();
});

it("clear", () => {
  expect(actions.clear("personal", "firstName")).toMatchSnapshot();
});

it("clearData", () => {
  expect(actions.clearData()).toMatchSnapshot();
});

it("setRecoverableSchedule", () => {
  expect(actions.setRecoverableSchedule({})).toMatchSnapshot();
});

it("saveSchedules", () => {
  expect(actions.saveSchedules({})).toMatchSnapshot();
});

it("deleteSchedule", () => {
  expect(actions.deleteSchedule(1)).toMatchSnapshot();
});

it("deleteRecoverableSchedules", () => {
  expect(actions.deleteRecoverableSchedules(1)).toMatchSnapshot();
});

it("saveSchedule", () => {
  expect(actions.saveSchedule(1, {})).toMatchSnapshot();
});

it("removeSchedule", () => {
  expect(actions.removeSchedule(1)).toMatchSnapshot();
});

it("clearSchedule", () => {
  expect(actions.clearSchedule(1, "field")).toMatchSnapshot();
});

it("clearAllSchedulesExcept", () => {
  expect(actions.clearAllSchedulesExcept(1)).toMatchSnapshot();
});

it("setState", () => {
  expect(actions.setState("thinking")).toMatchSnapshot();
});

it("submit", () => {
  expect(actions.submit()).toMatchSnapshot();
});

it("loading", () => {
  expect(actions.loading()).toMatchSnapshot();
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

it("setDetails", () => {
  expect(actions.setDetails("http://example.com/TOKEN")).toMatchSnapshot();
});

it("setReminder", () => {
  expect(actions.setReminder("20201001")).toMatchSnapshot();
});

it("setUserId", () => {
  expect(actions.setUserId("1")).toMatchSnapshot();
});
