import { shallow } from "enzyme";
import Baptism from "../";

const generateComponent = () => (
  <Baptism />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
