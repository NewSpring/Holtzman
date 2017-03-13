
import { shallow, mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { getSingleSpecWrapper } from "../../../../../util/tests/data-spec";
import { ImageLoader } from "../../../UI/loading";
import { Link } from "react-router";

import
  Card,
  { Wrapper, createItemClasses, cardClasses, createStyles, imageStyles, preloader, renderActualElement, createImage, createWrapperClasses }
from "../Card";

describe("wrapper", () => {
  it("should render", () => {
    const component = mount(<Wrapper />);
    expect(component).toBeDefined();
    expect(mountToJson(component)).toMatchSnapshot();
  });
  it("should pass children", () => {
    const component = mount(<Wrapper><img /></Wrapper>);
    expect(component).toBeDefined();
    expect(component.find("img")).toBeDefined();
  });
  it("should pass props", () => {
    const component = mount(<Wrapper style={{color: "blue"}}/>);
    expect(component).toBeDefined();
    expect(component.find("div").props().style).toEqual({ color: "blue" });
  });
});

describe("createItemClasses", () => {
  it("should not error with no args", () => {
    expect(createItemClasses()).toBeDefined();
  });
  it("should append background style with linkAll", () => {
    expect(createItemClasses(null, true)).toContain("background--light-primary");
  });
  it("should append item classes", () => {
    expect(createItemClasses(["harambe"], true)).toContain("harambe");
    expect(createItemClasses(["harambe", "zoo"], true)).toContain("zoo");
    expect(createItemClasses("harambe", true)).toContain("harambe");
  });
});

describe("cardClasses", () => {
  it("should not error with no args", () => {
    expect(cardClasses()).toBeDefined();
  });
  it("should append classes", () => {
    expect(cardClasses(["harambe"])).toContain("harambe");
    expect(cardClasses(["harambe", "zoo"])).toContain("zoo");
    expect(cardClasses("harambe")).toContain("harambe");
  });
});

describe("createStyles", () => {
  it("should not error with no args", () => {
    expect(createStyles()).toBeDefined();
  });
  it("should merge color styles with linkAll", () => {
    expect(createStyles(true).color).toEqual("inherit");
  });
});

describe("imageStyles", () => {
  it("should not error with no args", () => {
    expect(imageStyles()).toEqual({});
  });
  it("should return empty obj with false full arg", () => {
    expect(imageStyles(false, null)).toEqual({});
  });
  it("should return style with url if true full arg", () => {
    expect(imageStyles(true, "//harambe")).toEqual({
      backgroundImage: "url('//harambe')",
    });
  });
  it("should not error with null or empty url", () => {
    expect(imageStyles(true)).toEqual({
      backgroundImage: "url('undefined')",
    });
    expect(imageStyles(true, "")).toEqual({
      backgroundImage: "url('')",
    });
  });
});

describe("preloader", () => {
  it("should return a function", () => {
    expect(preloader()).toBeDefined();
    expect(typeof preloader()).toEqual("function");
  });
  it("should not error with no args", () => {
    expect(preloader()()).toBeDefined();
  });
  it("should pass imageclasses to component", () => {
    const component = mount(preloader(["wow"])());
    expect(component.find("div.wow")).toHaveLength(1);
  });
});

describe("renderActualElement", () => {
  it("should return a function", () => {
    expect(renderActualElement()).toBeDefined();
  });
  it("should not error with no args", () => {
    expect(renderActualElement()).toBeDefined();
  });
  it("should pass imageclasses to component", () => {
    const component = mount(renderActualElement(["wow"]));
    expect(component.find("div.wow")).toHaveLength(1);
  });
});

describe("createImage", () => {
  beforeEach(() => {
    jest.mock("../../../UI/loading", (props) => <div />);
  });

  it("should not error with no args", () => {
    const component = mount(createImage());
    expect(component).toBeDefined();
  });
  it("should append ratio if defined", () => {
    const component = mount(createImage("triangle"));
    expect(component.find("ImageLoader").props().imageclasses)
      .toContain("ratio--triangle");
  });
  it("should append landscape ratio if one isn't defined", () => {
    const component = mount(createImage());
    expect(component.find("ImageLoader").props().imageclasses)
      .toContain("ratio--landscape");
  });
  it("should append imageclasses if passed in", () => {
    const component = mount(createImage(null, "ballin"));
    expect(component.find("ImageLoader").props().imageclasses)
      .toContain("ballin");
  });
  it("should pass url prop", () => {
    const component = mount(createImage(null, null, "//harambe"));
    expect(component.find("ImageLoader").props().src)
      .toEqual("//harambe");
  });
  it("should pass style prop if not full", () => {
    const component = mount(createImage(null, null, "//harambe", false));
    expect(component.find("ImageLoader").props().style.backgroundImage)
      .toEqual("url(\'//harambe\')");
  });
  it("should pass renderElement", () => {
    const component = mount(createImage(null, null, null, false, jest.fn()));
    expect(typeof component.find("ImageLoader").props().renderElement)
      .toEqual("function");
  });
  it("should pass preloader", () => {
    const preloader = jest.fn();
    const component = mount(createImage(null, null, null, false, null, preloader));
    expect(preloader).toBeCalled();
    expect(preloader.mock.calls[0][0].length).toBeTruthy();
  });
});

describe("createWrapperClasses", () => {
  it("should not error with nothing passed in", () => {
    expect(createWrapperClasses());
  });
  it("should hide if mobile is false", () => {
    expect(createWrapperClasses(false)).toContain("visuallyhidden");
  });
  it("should return properly with mobile true", () => {
    expect(createWrapperClasses(true)).toBeTruthy();
  });
});

describe("", () => {
  const generateComponent = (additionalProps={}) => (<Card {...additionalProps} />);
  beforeEach(() => {
    jest.mock("../../../UI/loading", (props) => <div />);
    // jest.mock("react-router", jest.fn(() => ({
    //   "Link": (props) => <div />,
    // }));
  });

  it("", () => {

  });

});
