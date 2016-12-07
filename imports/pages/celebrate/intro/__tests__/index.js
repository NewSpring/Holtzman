import { shallow } from "enzyme";
import Intro from "../";

const generateComponent = () => (
  <Intro />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
