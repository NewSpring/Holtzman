import siteLink from "../content.siteLink";

const defaultProps = {
  meta: {
    urlTitle: "test-slug",
  },
};

const getContentItem = (additionalProps = {}) => ({
  ...defaultProps,
  ...additionalProps,
});

it("returns external link for series", () => {
  const result = siteLink(getContentItem({
    channelName: "series_newspring",
  }));
  expect(result).toBe("https://newspring.cc/sermons/test-slug");
});

it("returns external link for sermons", () => {
  const result = siteLink(
  getContentItem({
    channelName: "sermons",
  }), {
    meta: {
      urlTitle: "parent-slug",
    },
  });
  expect(result).toBe("https://newspring.cc/sermons/parent-slug/test-slug");
});

it("returns external link for devotionals", () => {
  const result = siteLink(getContentItem({
    channelName: "devotionals",
  }));
  expect(result).toBe("https://newspring.cc/devotionals/test-slug");
});

it("returns external link for albums", () => {
  const result = siteLink(getContentItem({
    channelName: "newspring_albums",
  }));
  expect(result).toBe("https://newspring.cc/music/test-slug");
});

it("returns external link for articles", () => {
  const result = siteLink(getContentItem({
    channelName: "articles",
  }));
  expect(result).toBe("https://newspring.cc/articles/test-slug");
});

it("returns external link for stories", () => {
  const result = siteLink(getContentItem({
    channelName: "stories",
  }));
  expect(result).toBe("https://newspring.cc/stories/test-slug");
});

it("returns external link for news", () => {
  const result = siteLink(getContentItem({
    channelName: "news",
  }));
  expect(result).toBe("https://newspring.cc/news/test-slug");
});

it("gracefully fails if a study with no parent", () => {
  const result = siteLink(getContentItem({ channelName: "study_entries"}));
  expect(result).toBe("https://newspring.cc/studies/undefined/test-slug");
});
