import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Ministries } from "../"

const generateComponent = () => {
  return <Ministries />;
};

describe("Ministries", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});