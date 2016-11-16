import collectionBackgroundStyles from "../collections.backgroundStyles";

const contentItem = {
  content: {
    colors: [
      { description: "secondary", value: "ff0000" },
      { description: "primary", value: "0000ff" },
    ],
  },
};

it("returns a css class defintion with collection color", () => {
  const result = collectionBackgroundStyles(contentItem);
  const color = contentItem.content.colors[1].value;
  expect(result).toBe(`
    .overlay-color--${color} {
      background-color: #${color};
    }
  `);
});
