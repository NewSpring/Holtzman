import creditCard from "../credit-card";

it("should return falsy if no value", () => {
  const result = creditCard();
  expect(result).toBeFalsy();
});

it("should group by 4 with dashes", () => {
  const result = creditCard("4111111111111111");
  expect(result).toBe("4111-1111-1111-1111");
});

it("should remove non numbers", () => {
  const result = creditCard("a4111111111111111#");
  expect(result).toBe("4111-1111-1111-1111");
});

it("should remove chars greater than 16", () => {
  const result = creditCard("411111111111111144114411");
  expect(result).toBe("4111-1111-1111-1111");
});
