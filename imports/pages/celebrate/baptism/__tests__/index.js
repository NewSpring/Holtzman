import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Baptism from "../";

const generateComponent = () => (
  <Baptism />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
