import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

import SmallButton from "../small";

const defaultProps = {
  text: "See All"
}

const generateComponent = (additionalProps) =>
  <SmallButton {...defaultProps} {...additionalProps} />

// since links are rendered with a different component
// I want to make sure props are passed properly to it too
const generateLinkedComponent = (additionalProps) =>
  generateComponent({linkUrl: "http://example.com" , ...additionalProps});

describe("SmallButton", () => {
  it("should render with minimal props", () => {
    const component = mount(<SmallButton />);
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it ("should accept text prop", () => {
    //text is a default prop
    const component = mount(generateComponent());
    const linkedComponent = mount(generateLinkedComponent());

    expect(component.text()).toEqual("See All");
    expect(linkedComponent.text()).toEqual("See All");

    expect(mountToJson(component)).toMatchSnapshot();
    expect(mountToJson(linkedComponent)).toMatchSnapshot();
  });

  it ("should accept disabled prop", () => {
    const component = mount(generateComponent({disabled: true}));
    const linkedComponent = mount(generateLinkedComponent({disabled: true}));

    expect(component.find("button").hasClass("btn--disabled")).toEqual(true);
    expect(linkedComponent.find("a").hasClass("btn--disabled")).toEqual(true);

    expect(mountToJson(component)).toMatchSnapshot();
    expect(mountToJson(linkedComponent)).toMatchSnapshot();
  });

  it ("should accept a linkUrl and render an anchor instead of button", () => {
    const component = mount(generateComponent({linkUrl: "http://example.com"}));

    expect(component.find("a").length).toEqual(1);
    expect(component.find("button").length).toEqual(0);
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it ("should accept an onClick handler", () => {
    const spy = jest.fn();
    const component = mount(generateComponent({onClick: spy}));

    const button = component.find("button");
    button.simulate("click");

    expect(spy).toBeCalled();
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it ("should accept a className prop", () => {
    const component = mount(generateComponent({className: "harambe"}));
    const linkedComponent = mount(generateLinkedComponent({className: "harambe"}));

    expect(component.find("button").hasClass("harambe")).toEqual(true);
    expect(linkedComponent.find("a").hasClass("harambe")).toEqual(true);

    expect(mountToJson(component)).toMatchSnapshot();
    expect(mountToJson(linkedComponent)).toMatchSnapshot();
  });

  it ("should accept a style prop", () => {
    const component = mount(generateComponent(
      {style: {textTransform: "capitalize"}}
    ));
    const linkedComponent = mount(generateLinkedComponent(
      {style: {textTransform: "capitalize"}}
    ));

    expect(mountToJson(component)).toMatchSnapshot();
    expect(mountToJson(linkedComponent)).toMatchSnapshot();
  });
});