import { shallow } from "enzyme";
import Salvation from "../";

const generateComponent = () => (
  <Salvation />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
