import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Meta from "../index";
// import generateData from "../metadata";

describe("Meta", () => {
  // beforeEach(() => {
  //   global.ga = "UA-7130289-25";
  //   ga = jest.fn();
  // });

  it("should have default data if nothing is passed to it", () => {
    const wrapper = shallow(
      <Meta />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it("should override the default title", () => {
    const wrapper = shallow(
      <Meta
        title={"This is a Test Title"}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it("should override the default image", () => {
    const wrapper = shallow(
      <Meta
        image={"link to the test image"}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it("should have an id", () => {
    const wrapper = shallow(
      <Meta
        id={"article.id"}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it("should have an og:type meta property", () => {
    const wrapper = shallow(
      <Meta
        meta={[
          { property: "og:type", content: "article" },
        ]}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it("should call the ga function one time", () => {
    global.ga = jest.fn();
    const wrapper = mount(
      <Meta />
    );
    expect(ga).toHaveBeenCalledTimes(1);
    delete global.ga;
  });
  it("should call the fabric function", () => {
    window.fabric = {
      Answers: {
        sendContentView: jest.fn(),
      }
    }
    const wrapper = mount(
      <Meta title="foo" />
    );
    expect(window.fabric.Answers.sendContentView).toHaveBeenCalledTimes(1);
    delete window.fabric;
  });
});
