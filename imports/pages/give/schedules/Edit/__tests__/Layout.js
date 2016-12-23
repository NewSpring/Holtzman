import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Layout from "../Layout";

const generateComponent = () => (
  <Layout />
);

describe("Layout", () => {
  it("renders", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
})