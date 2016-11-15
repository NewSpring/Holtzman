import date from "../time.date";

it("should return formatted date", () => {
  const result = date({
    meta: {
      actualDate: "2016-11-14T20:42:29+00:00",
    },
  });
  expect(result).toBe("Nov 14, 2016");
});
