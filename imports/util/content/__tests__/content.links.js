import contentLink from "../content.links";

const defaultProps = {
  entryId: "1",
};

const getContentItem = (additionalProps = {}) => ({
  ...defaultProps,
  ...additionalProps,
});

it("returns null by default", () => {
  const result = contentLink({});
  expect(result).toBe(null);
});

it("returns the link for series", () => {
  const result = contentLink(getContentItem({
    channelName: "series_newspring",
  }));
  expect(result).toBe("/series/1");
});

it("returns the link for sermons", () => {
  const result = contentLink(getContentItem({
    channelName: "sermons",
    parent: {
      entryId: "2",
    },
  }));
  expect(result).toBe("/series/2/sermon/1");
});

it("returns the link for devotionals", () => {
  const result = contentLink(getContentItem({
    channelName: "devotionals",
  }));
  expect(result).toBe("/devotions/1");
});

it("returns the link for albums", () => {
  const result = contentLink(getContentItem({
    channelName: "newspring_albums",
  }));
  expect(result).toBe("/music/1");
});

it("returns the link for articles", () => {
  const result = contentLink(getContentItem({
    channelName: "articles",
  }));
  expect(result).toBe("/articles/1");
});

it("returns the link for stories", () => {
  const result = contentLink(getContentItem({
    channelName: "stories",
  }));
  expect(result).toBe("/stories/1");
});

it("returns the link for news", () => {
  const result = contentLink(getContentItem({
    channelName: "news",
  }));
  expect(result).toBe("/news/1");
});

it("works with id as well", () => {
  const result = contentLink(getContentItem({
    channelName: "news",
    entryId: null,
    id: "3",
  }));
  expect(result).toBe("/news/3");
});

it("returns the link for events", () => {
  const result = contentLink(getContentItem({
    channelName: "newspring_now",
  }));
  expect(result).toBe("/events/1");
});
