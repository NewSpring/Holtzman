import { shallow } from "enzyme";
import CareRoom from "../";

const generateComponent = () => (
  <CareRoom />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
