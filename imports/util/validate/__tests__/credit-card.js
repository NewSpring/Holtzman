import {
  creditCard,
  creditExpiry,
  creditCVV,
} from "../credit-card";

describe("creditCard", () => {
  it("returns true for Visa, Mastercard, AmEx, and Discover", () => {
    const cards = [
      "4111-1111-1111-1111",
      "5555-5555-5555-4444",
      "3782-8224-6310-005",
      "6011-1111-1111-1117",
    ];
    cards.map((card) => {
      const result = creditCard(card);
      expect(result).toBe(true);
    });
  });

  it("returns false otherwise", () => {
    const result = creditCard("0000-0000-0000-0000");
    expect(result).toBe(false);
  });
});

describe("creditExpiry", () => {
  it("returns true for valid expiry", () => {
    const result = creditExpiry("12/2018");
    expect(result).toBe(true);
  });

  it("returns false for invalid expiry", () => {
    const result = creditExpiry("12/2006");
    expect(result).toBe(false);
  });
});

describe("creditCVV", () => {
  it("returns true for valid expiry", () => {
    const result = creditCVV("111");
    expect(result).toBe(true);
  });

  it("returns false for invalid expiry", () => {
    const result = creditCVV("11");
    expect(result).toBe(false);
  });
});
