import renderer from "react-test-renderer";
import MiniCard from "../cards.MiniCard";

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

it("has a channelName of 'articles', an image, and a title of 'MiniCard Title'", () => {
  const tree = renderer.create(
    <MiniCard
      title={content.title}
      content={content}
    />
  );
  expect(tree).toMatchSnapshot();
});
