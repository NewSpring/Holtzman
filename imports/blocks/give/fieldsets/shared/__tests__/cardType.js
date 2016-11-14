import { cardType } from "../";

it("should return null if nothing found", () => {
  const result = cardType({}, {});
  expect(result).toBeFalsy();
});

it("should return saved payment if present", () => {
  const mockSavedAccount = {
    payment: {
      paymentType: "test",
    },
  };
  const result = cardType({}, mockSavedAccount);
  expect(result).toBe(mockSavedAccount.payment.paymentType);
});

it("should return `Bank` for an ach type", () => {
  const mockPayment = {
    type: "ach",
  };
  const result = cardType(mockPayment, {});
  expect(result).toBe("Bank");
});

it("should return null if cc type but no card match", () => {
  const mockPayment = {
    type: "cc",
    cardNumber: "0000-0000-0000-0000",
  };
  const result = cardType(mockPayment, {});
  expect(result).toBeFalsy();
});

it("should return `Visa` for Visa cards", () => {
  const mockPayment = {
    type: "cc",
    cardNumber: "4111-1111-1111-1111",
  };
  const result = cardType(mockPayment, {});
  expect(result).toBe("Visa");
});

it("should return `MasterCard` for MasterCard cards", () => {
  const mockPayment = {
    type: "cc",
    cardNumber: "5555-5555-5555-4444",
  };
  const result = cardType(mockPayment, {});
  expect(result).toBe("MasterCard");
});

it("should return `AmEx` for AmEx cards", () => {
  const mockPayment = {
    type: "cc",
    cardNumber: "3782-8224-6310-005",
  };
  const result = cardType(mockPayment, {});
  expect(result).toBe("AmEx");
});

it("should return `Discover` for Discover cards", () => {
  const mockPayment = {
    type: "cc",
    cardNumber: "6011-1111-1111-1117",
  };
  const result = cardType(mockPayment, {});
  expect(result).toBe("Discover");
});
