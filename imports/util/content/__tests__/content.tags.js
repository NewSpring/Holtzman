import tags from "../content.tags";

it("returns blank array if no tags", () => {
  const result = tags({
    content: {
      contentTags: [],
    },
  });
  expect(result).toEqual([]);
});

it("returns blank array if blank first item", () => {
  const result = tags({
    content: {
      contentTags: [""],
    },
  });
  expect(result).toEqual([]);
});

it("returns array with tags", () => {
  const result = tags({
    content: {
      contentTags: ["one", "two"],
    },
  });
  expect(result).toEqual(["#one", "#two"]);
});

it("can convert comman separated string", () => {
  const result = tags({
    content: {
      contentTags: "one,two,three",
    },
  });
  expect(result).toEqual(["#one", "#two", "#three"]);
});
