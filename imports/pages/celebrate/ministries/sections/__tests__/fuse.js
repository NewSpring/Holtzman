import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Fuse from "../fuse";

const generateComponent = () => {
  return <Fuse />;
};

describe("Fuse", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});