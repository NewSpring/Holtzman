import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Finances } from "../"

const generateComponent = () => {
  return <Finances />;
};

describe("Finances", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});