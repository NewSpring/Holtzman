import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import FloodSCWithLove from "../";

const generateComponent = () => (
  <FloodSCWithLove />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
