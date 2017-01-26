import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Web from "../web";

const generateComponent = () => {
  return <Web />;
};

describe("Web", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});