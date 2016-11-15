import capitalize from "../strings";

it("should return capitalized string", () => {
  const result = capitalize("thing");
  expect(result).toBe("Thing");
});
