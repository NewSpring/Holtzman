import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import CareRoom from "../";

const generateComponent = () => (
  <CareRoom />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
