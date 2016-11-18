import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import GauntletX from "../";

const generateComponent = () => (
  <GauntletX />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
