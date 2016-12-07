import { shallow } from "enzyme";
import Closing from "../";

const generateComponent = () => (
  <Closing />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
