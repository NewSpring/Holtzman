import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Success from "../Success";

const generateComponent = () => (
  <Success msg="test message" />
);

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
