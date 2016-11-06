import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Meta from "../index";
import generateData from "../metadata";

describe("Meta", () => {
  it("should have default data if nothing is passed to it.", () => {
    const wrapper = shallow(
      <Meta />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it("should have some stuff in it.", () => {
    const wrapper = shallow(
      <Meta
        title={"article.title"}
        image={"photo"}
        id={"article.id"}
        meta={[
          { property: "og:type", content: "article" },
        ]}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
