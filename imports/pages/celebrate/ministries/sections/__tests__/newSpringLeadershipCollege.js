import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import NewSpringLeadershipCollege from "../newSpringLeadershipCollege";

const generateComponent = () => {
  return <NewSpringLeadershipCollege />;
};

describe("NewSpring Leadership College", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});