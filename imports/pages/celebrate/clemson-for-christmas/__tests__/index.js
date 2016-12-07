import { shallow } from "enzyme";
import ClemsonForChristmas from "../";

const generateComponent = () => (
  <ClemsonForChristmas />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
