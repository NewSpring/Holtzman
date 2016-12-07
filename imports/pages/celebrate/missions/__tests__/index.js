import { shallow } from "enzyme";
import Missions from "../";

const generateComponent = () => (
  <Missions />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
