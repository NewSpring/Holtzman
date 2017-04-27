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
    const result = creditExpiry("12/30"); // 12/2030
    expect(result).toBe(true);
  });

  it("returns false for invalid expiry", () => {
    const result = creditExpiry("12/06"); // 12/2006
    expect(result).toBe(false);
  });

  it("returns false for dates beyond 15 years", () => {
    const result = creditExpiry("12/99"); // 12/2099
    expect(result).toBe(false);
  });

  it("returns false for not having a valid month", () => {
    const result = creditExpiry("15/30"); // 15/2099
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
