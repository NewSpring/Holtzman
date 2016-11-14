import collectionClass from "../collections.class";

const contentItem = {
  content: {
    colors: [
      { description: "secondary", value: "ff0000" },
      { description: "primary", value: "0000ff" },
    ],
  },
};

it("should return the collection color as a css class name", () => {
  const result = collectionClass(contentItem);
  expect(result).toBe(`overlay-color--${contentItem.content.colors[1].value}`);
});
