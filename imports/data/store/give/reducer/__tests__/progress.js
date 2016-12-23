import { initial } from "../";

import progress from "../progress";

it("doesn't change if not a valid action", () => {
  const changed = progress(initial, { incrment: "1" });
  expect(changed).toMatchSnapshot();
  expect(changed).toEqual(initial);
});

it("doesn't increment if not a number", () => {
  const changed = progress(initial, { increment: "1" });
  expect(changed).toMatchSnapshot();
  expect(changed).toEqual(initial);
});

it("does not change the step if less than 1", () => {
  const changed = progress(initial, { increment: -1 });
  expect(changed).toMatchSnapshot();
  expect(changed.step).toEqual(1);
});

it("increments the step", () => {
  const changed = progress(initial, { increment: 1 });
  expect(changed).toMatchSnapshot();
  expect(changed.step).toEqual(2);
});

it("allows setting the step", () => {
  const changed = progress(initial, { step: 4 });
  expect(changed).toMatchSnapshot();
  expect(changed.step).toEqual(4);
});
