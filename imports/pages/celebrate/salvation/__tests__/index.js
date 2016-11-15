import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Salvation from "../";

const generateComponent = () => (
  <Salvation />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
