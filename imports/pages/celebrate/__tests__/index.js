import { shallow } from "enzyme";
import { TemplateWithoutData as Template } from "../";

const generateComponent = () => (
  <Template />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
