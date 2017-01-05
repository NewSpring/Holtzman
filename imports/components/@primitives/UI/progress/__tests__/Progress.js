
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

import ProgressBar, { themeStyles } from "../Progress";

const generateComponent = (additionalProps) =>
  <ProgressBar {...additionalProps} />

describe ("ProgressBar", () => {
  it("should render with minimal props", () => {
    const component = mount(<ProgressBar />);

    expect(mountToJson(component)).toMatchSnapshot();
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
    expect(percentStylesDark.progressBackground.backgroundColor).toEqual("#2a4930");
  });

  it ("should accept custom height as prop", () => {
    const component = mount(generateComponent({
      height: "10px",
    }));

    expect(component.find(".one-whole").html()).toMatchSnapshot();
  });
});
