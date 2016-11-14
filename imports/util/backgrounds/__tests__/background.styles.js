import backgroundStyles from "../background.styles";

const defaultItem = {
  content: {
    images: [
      {
        fileLabel: "2:1",
        url: "http://test.com/2x1.jpg",
      },
      {
        fileLabel: "1:1",
        url: "http://test.com/1x1.jpg",
      },
      {
        fileLabel: "1:2",
        url: "http://test.com/1x2.jpg",
      },
    ],
  },
};

it("returns css url for 1:1 image by default", () => {
  const result = backgroundStyles(defaultItem);
  expect(result).toEqual({
    backgroundImage: `url('${defaultItem.content.images[1].url}')`,
  });
});

it("allows for specifying the label", () => {
  const result = backgroundStyles(defaultItem, "1:2");
  expect(result).toEqual({
    backgroundImage: `url('${defaultItem.content.images[2].url}')`,
  });
});
