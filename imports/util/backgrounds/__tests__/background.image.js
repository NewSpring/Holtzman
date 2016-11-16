import backgroundImage from "../background.image";

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

it("returns blank string if no images", () => {
  const result = backgroundImage({});
  expect(result).toBeFalsy();
});

it("returns 1:1 by default", () => {
  const result = backgroundImage(defaultItem);
  expect(result).toBe(defaultItem.content.images[1].url);
});

it("handles old cloudfront urls", () => {
  const contentItem = {
    content: {
      images: [
        {
          fileLabel: "2:1",
          cloudfront: "http://test.com/2x1.jpg",
        },
        {
          fileLabel: "1:1",
          cloudfront: "http://test.com/1x1.jpg",
        },
        {
          fileLabel: "1:2",
          cloudfront: "http://test.com/1x2.jpg",
        },
      ],
    },
  };
  const result = backgroundImage(contentItem);
  expect(result).toBe(contentItem.content.images[1].cloudfront);
});

it("handles old s3 urls", () => {
  const contentItem = {
    content: {
      images: [
        {
          fileLabel: "2:1",
          s3: "http://test.com/2x1.jpg",
        },
        {
          fileLabel: "1:1",
          s3: "http://test.com/1x1.jpg",
        },
        {
          fileLabel: "1:2",
          s3: "http://test.com/1x2.jpg",
        },
      ],
    },
  };
  const result = backgroundImage(contentItem);
  expect(result).toBe(contentItem.content.images[1].s3);
});

it("returns custom label if provided", () => {
  const result = backgroundImage(defaultItem, { label: "2:1" });
  expect(result).toBe(defaultItem.content.images[0].url);
});

it("returns 2:1 if devotional", () => {
  const devoItem = {
    channelName: "devotionals",
    content: {
      images: [
        {
          fileLabel: "1:2",
          url: "http://test.com/1x2.jpg",
        },
        {
          fileLabel: "2:1",
          url: "http://test.com/2x1.jpg",
        },
      ],
    },
  };

  const result = backgroundImage(devoItem);
  expect(result).toBe(devoItem.content.images[1].url);
});

it("returns inline if devotional and no 2:1", () => {
  const devoItem = {
    channelName: "devotionals",
    content: {
      images: [
        {
          fileLabel: "1:2",
          url: "http://test.com/1x2.jpg",
        },
        {
          fileLabel: "inline",
          url: "http://test.com/2x1.jpg",
        },
      ],
    },
  };

  const result = backgroundImage(devoItem);
  expect(result).toBe(devoItem.content.images[1].url);
});

it("returns default if devotional and no 2:1 or inline", () => {
  const devoItem = {
    channelName: "devotionals",
    content: {
      images: [
        {
          fileLabel: "1:2",
          url: "http://test.com/1x2.jpg",
        },
        {
          fileLabel: "default",
          url: "http://test.com/2x1.jpg",
        },
      ],
    },
  };

  const result = backgroundImage(devoItem);
  expect(result).toBe(devoItem.content.images[1].url);
});

it("returns any image if devotional and no 2:1 or inline default", () => {
  const devoItem = {
    channelName: "devotionals",
    content: {
      images: [
        {
          fileLabel: "anything",
          url: "http://test.com/2x1.jpg",
        },
      ],
    },
  };

  const result = backgroundImage(devoItem);
  expect(result).toBe(devoItem.content.images[0].url);
});

it("returns any image any content type and no 1:1", () => {
  const devoItem = {
    channelName: "anytype",
    content: {
      images: [
        {
          fileLabel: "anything",
          url: "http://test.com/2x1.jpg",
        },
      ],
    },
  };

  const result = backgroundImage(devoItem);
  expect(result).toBe(devoItem.content.images[0].url);
});
