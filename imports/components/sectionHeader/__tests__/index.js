
import { mount } from "enzyme";

import SectionHeader from "../";

const sampleLinkComponent = <a>More...</a>;

const generateComponent = (additionalProps) =>
  <SectionHeader {...additionalProps} />
  ;

describe ("SectionHeader", () => {
  it("should render with minimal props", () => {
    const component = mount(generateComponent());

    expect(component).toMatchSnapshot();
  });

  it ("should accept a title prop", () => {
    const component = mount(generateComponent({title: "hello world"}));

    expect(component.find("h6").text()).toEqual("hello world");
    expect(component).toMatchSnapshot();
  });

  it ("should accept a link prop", () => {
    const component = mount(generateComponent({link: sampleLinkComponent}));

    expect(component.find("a").length).toEqual(1);
    expect(component).toMatchSnapshot();
  });

  it ("should render properly with all props", () => {
    const component = mount(generateComponent(
      {
        title: "Harambe",
        link: sampleLinkComponent,
      }
    ));

    expect(component.find("h6").text()).toEqual("Harambe");
    expect(component.find("a").length).toEqual(1);
    expect(component).toMatchSnapshot();
  });
});