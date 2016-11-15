import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Closing from "../";

const generateComponent = () => (
  <Closing />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
