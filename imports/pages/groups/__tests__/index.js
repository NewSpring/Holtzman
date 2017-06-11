import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Groups from "../";

// it("has a template for some reason", () => {
//   const wrapper = shallow(<Groups.Template />);
//   expect(shallowToJson(wrapper)).toMatchSnapshot();
// });

it("supplies the routes", () => {
  expect(Groups.Routes).toMatchSnapshot();
});
