import renderer from "react-test-renderer";
import FeedItem from "../cards.FeedItem";

// MOMENT IS AWESOME
const oneDayAgo = Moment().subtract(1, "days").format("LLL");

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
    date: oneDayAgo,
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

const content2 = {
  channelName: "series_newspring",
  content: {
    colors: [
      { description: "primary", id: null, value: "303030" },
    ],
    images: [
      { fileLabel: "2:1", url: "https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg" },
    ],
  },
  meta: {
    date: oneDayAgo,
  },
  title: "FeedItem Title",
};

// this one should have different styles
it("should have styles based on a channelName of 'series_newspring'", () => {
  const tree = renderer.create(
    <FeedItem
      item={content2}
    />
  );
  expect(tree).toMatchSnapshot();
});
