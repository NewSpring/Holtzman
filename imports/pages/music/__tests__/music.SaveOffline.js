import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Offline from "../music.SaveOffline";

const generateComponent = () => (
  <Offline />
);
it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
