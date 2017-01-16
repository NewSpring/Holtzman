import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import FunFacts from "../funFacts";

const generateComponent = () => {
  return <FunFacts />;
};

describe("Fun Facts", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});