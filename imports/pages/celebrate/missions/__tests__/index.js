import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Missions from "../";

const generateComponent = () => (
  <Missions />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
