import renderer from "react-test-renderer";
import MiniCard from "../cards.MiniCard";

describe("MiniCard", () => {
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
