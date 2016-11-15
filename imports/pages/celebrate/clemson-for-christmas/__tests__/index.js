import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import ClemsonForChristmas from "../";

const generateComponent = () => (
  <ClemsonForChristmas />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
