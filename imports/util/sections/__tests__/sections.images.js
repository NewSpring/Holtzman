import sectionImage from "../sections.images";

it("should return blank string if no images", () => {
  const result = sectionImage([]);
  expect(result).toBe("");
});

it("should return 1:1 if available", () => {
  const images = [
    { fileLabel: "2:1", url: "http://test.com/2x1.jpg" },
    { fileLabel: "1:1", url: "http://test.com/1x1.jpg" },
  ];
  const result = sectionImage(images);
  expect(result).toBe(images[1].url);
});

it("should return first image if no 1:1", () => {
  const images = [
    { fileLabel: "2:1", url: "http://test.com/2x1.jpg" },
    { fileLabel: "1:2", url: "http://test.com/1x2.jpg" },
  ];
  const result = sectionImage(images);
  expect(result).toBe(images[0].url);
});
