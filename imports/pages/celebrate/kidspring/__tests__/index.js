import { shallow } from "enzyme";
import { shallowToJson } from "";
import KidSpring from "../";

const generateComponent = () => (
  <KidSpring />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
