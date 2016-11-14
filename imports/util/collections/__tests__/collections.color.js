import collectionColor from "../collections.color";

it("returns 000 by default", () => {
  const result = collectionColor({});
  expect(result).toBe("000");
});

it("tries to return `primary` color if colors present", () => {
  const contentItem = {
    content: {
      colors: [
        { description: "secondary", value: "ff0000" },
        { description: "primary", value: "0000ff" },
      ],
    },
  };
  const result = collectionColor(contentItem);
  expect(result).toBe(contentItem.content.colors[1].value);
});

it("should return any color if no `primary`", () => {
  const contentItem = {
    content: {
      colors: [
        { description: "secondary", value: "ff0000" },
      ],
    },
  };
  const result = collectionColor(contentItem);
  expect(result).toBe(contentItem.content.colors[0].value);
});
