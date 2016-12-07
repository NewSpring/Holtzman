import { shallow } from "enzyme";
import SocialMedia from "../";

const generateComponent = () => (
  <SocialMedia />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
