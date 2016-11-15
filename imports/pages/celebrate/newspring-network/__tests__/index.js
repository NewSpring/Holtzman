import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import NewSpringNetwork from "../";

const generateComponent = () => (
  <NewSpringNetwork />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
