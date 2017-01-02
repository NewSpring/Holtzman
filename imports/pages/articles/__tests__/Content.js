import renderer from "react-test-renderer";
import ArticlesContent from "../Content";

const defaultProps = {
  article: {
    authors: null,
    title: "test",
    content: {
      body: "<h1>test</h1>",
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <ArticlesContent { ...newProps } />;
};

it("renders without authors", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});

it("renders with authors", () => {
  const result = renderer.create(generateComponent({
    article: {
      authors: ["jim", "bob"],
      title: "test",
      content: {
        body: "<h1>test</h1>",
      },
    },
  }));
  expect(result).toMatchSnapshot();
});
