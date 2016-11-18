import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Fuse from "../";

const generateComponent = () => (
  <Fuse />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
