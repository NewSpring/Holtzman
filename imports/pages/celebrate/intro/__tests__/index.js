import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Intro from "../";

const generateComponent = () => (
  <Intro />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
