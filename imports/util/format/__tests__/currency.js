import { monetize } from "../currency";

describe ("Monetize", () => {
  it("should handle blank and null input", () => {
    expect(monetize("")).toEqual("$0.00");
    expect(monetize()).toEqual("$0.00");
  });

  it ("should handle normal string inputs with", () => {
    expect(monetize("100")).toEqual("$100");
    expect(monetize("100.50")).toEqual("$100.50");
    expect(monetize("0")).toEqual("$0");
  });

  it ("should handle normal number inputs", () => {
    expect(monetize(100)).toEqual("$100");
    expect(monetize(100.5)).toEqual("$100.5");
    expect(monetize(0.0)).toEqual("$0");
  });

  it ("should return 2 decimal places with fixed arg set", () => {
    expect(monetize("100", true)).toEqual("$100.00");
    expect(monetize(100, true)).toEqual("$100.00");
    expect(monetize("100.50", true)).toEqual("$100.50");
    expect(monetize(100.5, true)).toEqual("$100.50");
    expect(monetize("0", true)).toEqual("$0.00");
    expect(monetize(0.0, true)).toEqual("$0.00");
  });
});