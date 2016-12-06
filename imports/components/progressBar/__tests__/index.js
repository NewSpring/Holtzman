
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { getSingleSpecWrapper } from "../../../util/tests/data-spec";

import ProgressBar, { themeStyles } from "../";

const defaultProps = {
  title: "My Fund",
  total: 12345,
};

const generateComponent = (additionalProps) =>
  <ProgressBar {...defaultProps} {...additionalProps} />

describe ("ProgressBar", () => {
  it("should render with minimal props", () => {
    const component = mount(<ProgressBar />);

    expect(mountToJson(component)).toMatchSnapshot();
  });

  it ("should render a title", () => {
    // title is a default prop above
    const component = mount(generateComponent());
    const title = getSingleSpecWrapper(component, "title");

    expect(title.text()).toEqual("My Fund");
  });

  it ("should render a total value", () => {
    // total is a default prop above
    const component = mount(generateComponent());
    const total = getSingleSpecWrapper(component, "total");

    expect(total.text()).toEqual("12345");
  });

  it ("should generate a proper percentDone style", () => {
    const percentStylesDark = themeStyles("dark", 25);
    const percentStylesLight =  themeStyles("light", 20);

    expect(percentStylesDark).toMatchSnapshot();
    expect(percentStylesLight).toMatchSnapshot();
    expect(percentStylesDark.progress.width).toEqual("25%");
    expect(percentStylesLight.progress.width).toEqual("20%");
  });

  it ("should default to dark theme", () => {
    const percentStylesDark = themeStyles();
    expect(percentStylesDark.wrapper.color).toEqual("#fff");
  });

  it ("should accept custom styles as prop", () => {
    const component = mount(generateComponent({
      style: {
        color: "blue",
      }
    }));

    expect(component.prop("style")).toEqual({color: "blue"});
  });
});