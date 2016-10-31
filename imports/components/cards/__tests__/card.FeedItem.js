import renderer from "react-test-renderer";
import FeedItem from "../cards.FeedItem";

const content = {
  channelName: "articles",
  content: {
    colors: [
      { description: "primary", id: null, value: "303030" },
    ],
    images: [
      { fileLabel: "2:1", url: "https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg" },
    ],
  },
  meta: {
    date: "10/31/2016",
  },
  title: "FeedItem Title",
};

it("should have styles based on a channelName of 'articles'", () => {
  const tree = renderer.create(
    <FeedItem
      item={content}
    />
  );
  expect(tree).toMatchSnapshot();
});

content.channelName = "series_newspring";

// this one should have different styles
it("should have styles based on a channelName of 'series_newspring'", () => {
  const tree = renderer.create(
    <FeedItem
      item={content}
    />
  );
  expect(tree).toMatchSnapshot();
});
