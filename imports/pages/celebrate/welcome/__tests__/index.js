import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Welcome } from "../";

const defaultProps = {
  dispatch: jest.fn(),
};

const generateComponent = () => {
  return <Welcome { ...defaultProps } />;
};

describe("Welcome", () => {
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});