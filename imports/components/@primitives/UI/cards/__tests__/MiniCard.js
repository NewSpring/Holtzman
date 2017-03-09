import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import MiniCard, { hasImage } from "../MiniCard";

describe("MiniCard", () => {
  beforeEach(() => {
    reset();
    startBuffering();
  });

  afterEach(() => {
    reset();
  });

  it("should not error with no content", () => {
    expect(hasImage()).toEqual(false);
  });

  it("should render with no image and no content", () => {

    const tree = renderer.create(
      <MiniCard
        category="Devotionals"
        icon="icon-name"
        image=""
        link="/1234"
        title="title"
      />
    );

    expect(tree).toBeDefined();
    expect(tree).toMatchSnapshot();
  });

  it("has a channelName of 'articles', an image, and a title of 'MiniCard Title'", () => {
    const content = {
      channelName: "articles",
      content: {
        images: [{
          fileLabel: "2:1",
          url: "https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg",
        }],
      },
      title: "MiniCard Title",
    };

    const tree = renderer.create(
      <MiniCard
        title={content.title}
        content={content}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("doesn't have an image if one isn't passed", () => {
    const content = {
      channelName: "articles",
      content: {
        images: [],
      },
      title: "MiniCard Title",
    };

    const tree = renderer.create(
      <MiniCard
        title={content.title}
        content={content}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("has a video icon if it's a sermon", () => {
    const content = {
      channelName: "sermons",
      content: {
        images: [],
      },
      title: "MiniCard Title",
    };

    const tree = renderer.create(
      <MiniCard
        title={content.title}
        content={content}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
