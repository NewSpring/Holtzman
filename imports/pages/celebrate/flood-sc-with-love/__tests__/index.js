import { shallow } from "enzyme";
import FloodSCWithLove from "../";

const generateComponent = () => (
  <FloodSCWithLove />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
