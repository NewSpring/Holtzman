import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { TemplateWithoutData as Template } from "../";

const generateComponent = () => (
  <Template />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
