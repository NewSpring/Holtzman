import { shallow } from "enzyme";
import Success from "../Success";

const generateComponent = () => (
  <Success msg="test message" />
);

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
