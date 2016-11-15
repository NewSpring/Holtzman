import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Web from "../";

const generateComponent = () => (
  <Web />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
