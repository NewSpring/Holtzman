import { shallow } from "enzyme";
import GauntletX from "../";

const generateComponent = () => (
  <GauntletX />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
