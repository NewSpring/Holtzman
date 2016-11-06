import renderer from "react-test-renderer";
import Meta from "../index";
import generateData from "../metadata";

describe("Meta", () => {
  it("should have default data if nothing is passed to it.", () => {
    const tree = renderer.create(
      <Meta />
    );
    expect(tree).toMatchSnapshot();
  });
  it("should have some stuff in it.", () => {
    const tree = renderer.create(
      <Meta
        title={"article.title"}
        image={"photo"}
        id={"article.id"}
        meta={[
          { property: "og:type", content: "article" },
        ]}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it("should have default data if nothing is passed to it.", () => {
    const props = {};
    const tree = generateData(props);
    expect(tree).toMatchSnapshot();
  });
  it("should have a different title.", () => {
    const props = {title: "Some Test Title"};
    const tree = generateData(props);
    expect(tree).toMatchSnapshot();
  });
});
