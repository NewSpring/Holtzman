import { shallow } from "enzyme";
import Web from "../";

const generateComponent = () => (
  <Web />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
