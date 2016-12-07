import { shallow } from "enzyme";
import Serving from "../";

const generateComponent = () => (
  <Serving />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
