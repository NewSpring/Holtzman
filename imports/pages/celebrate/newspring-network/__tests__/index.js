import { shallow } from "enzyme";
import NewSpringNetwork from "../";

const generateComponent = () => (
  <NewSpringNetwork />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
