import { shallow } from "enzyme";
import Groups from "../";

it("has a template for some reason", () => {
  const wrapper = shallow(<Groups.Template />);
  expect(wrapper).toMatchSnapshot();
});

it("supplies the routes", () => {
  expect(Groups.Routes).toMatchSnapshot();
});
