import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Loading from "../Loading";

describe("Loading", () => {
  const defaultProps = {
    type: "update"
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Loading { ...newProps }/>
  };

  it("renders with default props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders with a different type", () => {
    const wrapper = shallow(generateComponent({ type: "ohheckno" }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
})