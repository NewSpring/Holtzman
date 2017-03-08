
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import Hero, { isReady, getIconClasses, getImage, HeroLink } from "../";
import { Meteor } from "meteor/meteor";

jest.mock("../../../../../util/categories", () => ({
  icon: jest.fn(() => "categories.icon"),
  name: jest.fn(() => "categories.name"),
}));

jest.mock("../../../../../util/time");

const generateComponent = (additionalProps) =>
  <Hero {...additionalProps} />;

const mockContent = {
  meta: { urlTitle: "/harambe" },
  title: "hello",
  content: {
    images: [
      {fileLabel: "2:1", url: "harambe.jpg"},
      {fileLabel: "1:1", url: "harambe-square.jpg"}
    ],
  }
};

describe("helpers", () => {

  it("should detect when content ready", () => {
    expect(isReady({hello: "harambe"})).toBeTruthy();
    expect(isReady({})).toBeFalsy();
  });

  it("should return proper icon classes", () => {
    expect(getIconClasses({})).toEqual(null);
    expect(getIconClasses({harambe: "hero"}))
      .toEqual("text-light-primary soft-half-right categories.icon");
  });

  it("getImage should return proper image", () => {
    expect(getImage(mockContent.content.images, "1:1")).toEqual("harambe-square.jpg");
    expect(getImage(mockContent.content.images, "2:1")).toEqual("harambe.jpg");
    expect(getImage(mockContent.content.images)).toEqual("harambe.jpg");
  });
});

describe("Hero", () => {
  it("should render with no props", () => {
    const component = mount(generateComponent());
    expect(component).toBeDefined();
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it("should render with content object passed in", () => {
    const component = mount(generateComponent({content: mockContent}));
    expect(component).toBeDefined();
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it("should render with data passed as separate props", () => {
    const component = mount(generateComponent({
      title: "miss you",
      hideDate: false,
      link: "/harambe",
      image: "harambe.jpg",
    }));
    expect(component).toBeDefined();
    expect(mountToJson(component)).toMatchSnapshot();
  });
});

describe("HeroLink", () => {
  it("should show Link element if cordova", () => {
    Meteor.isCordova = true;
    const external1 = mount(<HeroLink to="https://harambe.gorilla" />);
    expect(external1.find("Link").length).toEqual(1);
  });

  it("should show `a` element if cordova", () => {
    Meteor.isCordova = false;
    const external1 = mount(<HeroLink to="https://harambe.gorilla" />);
    expect(external1.find("Link").length).toEqual(0);
    expect(external1.find("a").length).toEqual(1);
  });

  it("should pass children", () => {
    const component = mount(<HeroLink><p>harambe was an inside job</p></HeroLink>);
    expect(component.html().includes("harambe")).toEqual(true);
  });
});
