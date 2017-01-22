import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import NewSpringNetwork from "../newSpringNetwork";

const generateComponent = () => {
  return <NewSpringNetwork />;
};

describe("NewSpring Network", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});