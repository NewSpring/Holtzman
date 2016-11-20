import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import ComingSoon from "../content.ComingSoon";

const generateComponent = () => (
  <ComingSoon />
);

it("render", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
