import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import EditSchedule from "../"

const generateComponent = () => (
  <EditSchedule.EditSchedule />
);

describe("Index", () => {
  it("renders", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("has routes", () => {
    expect(EditSchedule.Routes).toMatchSnapshot();
  });
})