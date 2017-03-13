
import { mount } from "enzyme"
import { mountToJson } from "enzyme-to-json";

import { Link } from "react-router";

import MiniCard from "../MiniCard";

describe("MiniCard", () => {
  const generateComponent = (additionalProps) =>
    <MiniCard {...additionalProps} />;

  it("should render with no props", () => {
    const component = mount(generateComponent());
    expect(component).toBeDefined();
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it("should render title", () => {
    const component = mount(generateComponent({
      title: "Harambe",
    }));
    expect(component).toBeDefined();
    expect(component.find("h6").text()).toEqual("Harambe");
  });

  it("should render description", () => {
    const component = mount(generateComponent({
      description: "my description",
    }));
    expect(component).toBeDefined();
    expect(component.find("p")).toHaveLength(1);
    expect(component.find("p").text()).toEqual("my description");
  });

  it("should render with icon", () => {
    const component = mount(generateComponent({
      icon: "my-icon",
    }));
    expect(component).toBeDefined();
    expect(component.find("span")).toHaveLength(1);
    expect(component.find("span.my-icon")).toHaveLength(1);
  });

  it("should render with category", () => {
    const component = mount(generateComponent({
      category: "conspiracy",
    }));
    expect(component).toBeDefined();
    expect(component.find("h7")).toHaveLength(1);
    expect(component.find("h7").text()).toEqual("conspiracy");
  });

  it("should render with link", () => {
    const component = mount(generateComponent({
      link: "/wow",
    }));
    expect(component).toBeDefined();
    expect(component.find("Link")).toHaveLength(1);
    expect(component.find("Link").props().to).toEqual("/wow");
  });

  it("should render with image", () => {
    const component = mount(generateComponent({
      image: "/img",
    }));
    expect(component).toBeDefined();
    expect(component.find("div.card__item").props().className).toContain("two-thirds");
    expect(component.find("div.card__image").props().style.backgroundImage).toContain("/img");
  });

  it("should render full width with no image", () => {
    const component = mount(generateComponent());
    expect(component).toBeDefined();
    expect(component.find("div.card__item").props().className).toContain("one-whole");
  });
});
