import { shallow } from "enzyme";
import Fuse from "../";

const generateComponent = () => (
  <Fuse />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
