import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Shane } from "../";

const defaultProps = {
  dispatch: jest.fn(),
};

const generateComponent = () => {
  return <Shane { ...defaultProps } />;
};

describe("Shane", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});