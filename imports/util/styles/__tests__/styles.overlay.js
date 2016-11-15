import overlayStyles from "../styles.overlay";

const contentItem = {
  content: {
    colors: [
      { description: "secondary", value: "ff0000" },
      { description: "primary", value: "0000ff" },
    ],
  },
};

it("should return css class for content color gradient backgrounds", () => {
  const result = overlayStyles(contentItem);
  expect(result).toMatchSnapshot();
});
