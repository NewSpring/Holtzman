import toDateString from "../dates";

it("should return formatted date string", () => {
  const date = new Date("December 13, 1912");
  const result = toDateString(date);
  expect(result).toBe("December 13, 1912");
});

it("should return abbreviated month date string", () => {
  const date = new Date("December 13, 1912");
  const result = toDateString(date, true);
  expect(result).toBe("Dec 13, 1912");
});
