import { monetize } from "../";

const DEFAULT_VALUE = "$0.00";

it("returns `$0.00` if undefined", () => {
  const result = monetize(undefined);
  expect(result).toBe(DEFAULT_VALUE);
});

it("returns `$0.00` if null", () => {
  const result = monetize(null);
  expect(result).toBe(DEFAULT_VALUE);
});

it("returns `$12.34` if number 12.34", () => {
  const value = 12.34;
  const result = monetize(value);
  expect(result).toBe(`$${value}`);
});

it("returns `$12.34` if string `12.34`", () => {
  const value = "12.34";
  const result = monetize(value);
  expect(result).toBe(`$${value}`);
});

it("removes everything except numbers, dots, and dashes", () => {
  const value = "!@#$%^&*()12abcdefg.`~`~{}[]34";
  const result = monetize(value);
  expect(result).toBe("$12.34");
});

it("has no decimals by default", () => {
  const value = 24;
  const result = monetize(value);
  expect(result).toBe("$24");
});

it("fixes to two decimals if one decimal", () => {
  const value = 24.1;
  const result = monetize(value);
  expect(result).toBe("$24.10");
});

it("fixes to two decimals if greater than two", () => {
  const value = 24.2456788;
  const result = monetize(value);
  expect(result).toBe("$24.25");
});

it("fixes to two decimals if fixed is true", () => {
  const value = 12;
  const result = monetize(value, true);
  expect(result).toBe(`$${value}.00`);
});

it("adds commas for large values", () => {
  const value = 123456789;
  const result = monetize(value);
  expect(result).toBe("$123,456,789");
});
