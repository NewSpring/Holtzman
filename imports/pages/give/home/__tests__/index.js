
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json"
import Home from "../";

describe("home index file", () => {
  it("has a template", () => {
    const wrapper = shallow(<Home.Home />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("has routes", () => {
    expect(Home.Routes).toMatchSnapshot();
  });
})