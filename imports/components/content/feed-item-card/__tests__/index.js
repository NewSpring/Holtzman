import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { FeedItem } from "../";

// MOMENT IS AWESOME
const oneDayAgo = Moment().subtract(1, "days").format("LLL");

describe("FeedItem", () => {
  beforeEach(() => {
    reset();
    startBuffering();
  });

  afterEach(() => {
    reset();
  });

  it("should have styles based on a channelName of 'articles'", () => {
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

    const tree = renderer.create(
      <FeedItem
        item={content}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  // this one should have different styles
  it("should have styles based on a channelName of 'series_newspring'", () => {
    const content = {
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

    const tree = renderer.create(
      <FeedItem
        item={content}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should pull the parent color if the channelName is 'sermons'", () => {
    const content = {
      channelName: "sermons",
      content: {
        colors: [
          {
            description: "primary",
            id: null,
            value: "303030",
          },
        ],
        images: [
          { fileLabel: "2:1", url: "https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg" },
        ],
      },
      meta: {
        date: oneDayAgo,
      },
      parent: {
        content: {
          colors: [
            {
              description: "primary",
              id: null,
              value: "030303",
            },
          ],
        },
      },
      title: "FeedItem Title",
    };

    const tree = renderer.create(
      <FeedItem
        item={content}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should pull the parent image if the channelName is 'sermons' and there is an parent image", () => {
    const content = {
      channelName: "sermons",
      content: {
        colors: [
          {
            description: "primary",
            id: null,
            value: "303030",
          },
        ],
        images: [
          // { fileLabel: "2:1", url: "https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg" },
        ],
      },
      meta: {
        date: oneDayAgo,
      },
      parent: {
        content: {
          colors: [
            {
              description: "primary",
              id: null,
              value: "030303",
            },
          ],
          images: [
            { fileLabel: "2:1", url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71" },
          ],
        },
      },
      title: "FeedItem Title",
    };

    const tree = renderer.create(
      <FeedItem
        item={content}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should pull the regular image if the channelName is 'sermons' and there is an parent image AND a regular image", () => {
    const content = {
      channelName: "sermons",
      content: {
        colors: [
          {
            description: "primary",
            id: null,
            value: "303030",
          },
        ],
        images: [
          { fileLabel: "2:1", url: "https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg" },
        ],
      },
      meta: {
        date: oneDayAgo,
      },
      parent: {
        content: {
          colors: [
            {
              description: "primary",
              id: null,
              value: "030303",
            },
          ],
          images: [
            { fileLabel: "2:1", url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71" },
          ],
        },
      },
      title: "FeedItem Title",
    };

    const tree = renderer.create(
      <FeedItem
        item={content}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
