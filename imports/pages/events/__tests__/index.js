import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Event from "../";

describe("Event", () => {
  it("1. renders with props", () => {
    const wrapper = shallow(<Event.Event />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("2. pulls the route and snapshots it", () => {
    const wrapper = Event.Routes;
    expect(wrapper).toMatchSnapshot();
  });
})
