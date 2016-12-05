
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

import ProgressBar from "../";

const generateComponent = (additionalProps) =>
  <ProgressBar {...additionalProps} />

describe ("ProgressBar", () => {
  it("should render with minimal props", () => {
    const component = mount(generateComponent());

    expect(mountToJson(component)).toMatchSnapshot();
  });
});