import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import KidSpring from "../";

const generateComponent = () => (
  <KidSpring />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
