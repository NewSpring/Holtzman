import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import NewSpringLeadershipCollege from "../newSpringLeadershipCollege";

const generateComponent = () => {
  return <NewSpringLeadershipCollege />;
};

describe("NewSpring Leadership College", () => {
  beforeEach(() => {
    reset();
    startBuffering();
  });

  afterEach(() => {
    reset();
  });

  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
