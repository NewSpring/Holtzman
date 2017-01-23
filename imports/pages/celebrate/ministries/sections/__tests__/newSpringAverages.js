import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import NewSpringAverages from "../newSpringAverages";

const generateComponent = () => {
  return <NewSpringAverages />;
};

describe("NewSpring Averages", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});