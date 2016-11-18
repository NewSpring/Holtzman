import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Template } from "../";

const generateComponent = () => (
  <Template>
    <h1>test</h1>
  </Template>
);

it("renders with children", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
