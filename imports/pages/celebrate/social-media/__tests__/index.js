import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import SocialMedia from "../";

const generateComponent = () => (
  <SocialMedia />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
