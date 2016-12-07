import { shallow } from "enzyme";
import Offline from "../music.SaveOffline";

const generateComponent = () => (
  <Offline />
);
it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
