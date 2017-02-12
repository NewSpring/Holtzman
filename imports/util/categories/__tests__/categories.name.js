import categoryName from "../categories.name.js";

it("returns `Series` for `series_newspring`", () => {
  const result = categoryName({ channelName: "series_newspring" });
  expect(result).toBe("Series");
});

it("returns `Albums` for `newspring_albums`", () => {
  const result = categoryName({ channelName: "newspring_albums" });
  expect(result).toBe("Albums");
});

// XXX this handles the case of `articless` but not `articles`
// i think this is wrong
it("captilizes `articless` and removes the additional s", () => {
  const result = categoryName({ channelName: "articless" });
  expect(result).toBe("Articles");
});

it("captilizes `articles`", () => {
  const result = categoryName({ channelName: "articles" });
  expect(result).toBe("Articles");
});

it("returns `Events` for `newspring_now`", () => {
  const result = categoryName({ channelName: "newspring_now" });
  expect(result).toBe("Events");
});

it("returns `Need to Know` for `promotions_newspring`", () => {
  const result = categoryName({ channelName: "promotions_newspring" });
  expect(result).toBe("Need to Know");
});
