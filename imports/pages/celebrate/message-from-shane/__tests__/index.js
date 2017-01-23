import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Shane } from "../"

const generateComponent = () => {
  return <Shane />;
};

describe("Shane", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});