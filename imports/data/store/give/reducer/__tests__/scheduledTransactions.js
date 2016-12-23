
import { initial } from "../";

import {
  setRecoverableSchedule,
  deleteRecoverableSchedule,
  setRecoverableSchedules,
  deleteRecoverableSchedules,
} from "../scheduledTransactions";

it("allows for setting a recovered schedule", () => {
  const recoverableSchedule = { 1: "TEST" };
  const changed = setRecoverableSchedule(initial, { recoverableSchedule });
  expect(changed).toMatchSnapshot();
  expect(changed.scheduleToRecover).toEqual(recoverableSchedule);
});

it("allows for removing all recovered schedule", () => {
  const changed = deleteRecoverableSchedule({...initial, ...{ scheduleToRecover: { 1: "TEST" } }});
  expect(changed).toMatchSnapshot();
  expect(changed.scheduleToRecover).toBe(null);
});

it("allows for setting multiple recoverable schedules", () => {
  const recoverableSchedules = { 1: "TEST", 2: "TESTING" };
  const changed = setRecoverableSchedules(initial, { recoverableSchedules });
  expect(changed).toMatchSnapshot();
  expect(changed.recoverableSchedules).toEqual(recoverableSchedules);
});


it("allows for deleting recoverable schedules by 1", () => {
  const recoverableSchedules = { 1: "TEST", 2: "TESTING" };
  const changed = deleteRecoverableSchedules({...initial, ...{ recoverableSchedules }}, { id: 1 });
  expect(changed).toMatchSnapshot();
  expect(changed.recoverableSchedules).toEqual({ 2: "TESTING" });
});

it("doesn't delete anything if no id is found", () => {
  const recoverableSchedules = { 1: "TEST", 2: "TESTING" };
  const changed = deleteRecoverableSchedules({...initial, ...{ recoverableSchedules }}, { id: "1" });
  expect(changed).toMatchSnapshot();
  expect(changed.recoverableSchedules).toEqual(recoverableSchedules);
});
