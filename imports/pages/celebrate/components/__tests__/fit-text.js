import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { FitTextWithoutData as FitText } from "../fit-text";

const generateComponent = (props) => (
  <FitText { ...props }>
    <h1>test</h1>
  </FitText>
);

it("renders", () => {
  const wrapper = mount(generateComponent());
  expect(mountToJson(wrapper)).toMatchSnapshot();
});

it("calculates font size based on props", () => {
  const wrapper = mount(generateComponent({
    compressor: 2.0,
    minFontSize: 10,
    maxFontSize: 20,
  }));
  expect(mountToJson(wrapper)).toMatchSnapshot();
});
