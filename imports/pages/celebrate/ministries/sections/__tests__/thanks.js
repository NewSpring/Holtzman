import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Thanks from "../thanks";

const generateComponent = () => {
  return <Thanks />;
};

describe("Thanks", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});