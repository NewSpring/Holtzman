import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Serving from "../";

const generateComponent = () => (
  <Serving />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
