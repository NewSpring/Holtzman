import categoryIcon from "../categories.icon.js";

it("returns `icon-category-video` for `series_newspring`", () => {
  const result = categoryIcon({ channelName: "series_newspring" });
  expect(result).toBe("icon-category-video");
});

it("returns `icon-category-video` for `series`", () => {
  const result = categoryIcon({ channelName: "series" });
  expect(result).toBe("icon-category-video");
});

it("returns `icon-category-video` for `sermons`", () => {
  const result = categoryIcon({ channelName: "sermons" });
  expect(result).toBe("icon-category-video");
});

it("returns `icon-category-audio` for `newspring_albums`", () => {
  const result = categoryIcon({ channelName: "newspring_albums" });
  expect(result).toBe("icon-category-audio");
});

it("returns `icon-category-text` for `articles`", () => {
  const result = categoryIcon({ channelName: "articles" });
  expect(result).toBe("icon-category-text");
});

it("returns `icon-category-text` for `devotionals`", () => {
  const result = categoryIcon({ channelName: "devotionals" });
  expect(result).toBe("icon-category-text");
});

it("returns `icon-category-text` for `stories`", () => {
  const result = categoryIcon({ channelName: "stories" });
  expect(result).toBe("icon-category-text");
});

it("returns `icon-category-text` for `news`", () => {
  const result = categoryIcon({ channelName: "news" });
  expect(result).toBe("icon-category-text");
});

it("returns `icon-category-text` for `newspring_now`", () => {
  const result = categoryIcon({ channelName: "newspring_now" });
  expect(result).toBe("icon-category-text");
});

it("returns `icon-category-text` for anything else", () => {
  const result = categoryIcon({ channelName: "anythingelse" });
  expect(result).toBe("icon-category-text");
});
