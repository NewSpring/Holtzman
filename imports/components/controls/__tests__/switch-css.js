import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import SwitchCSS from "../switch-css";

it("is a json rep of css styles", () => {
  expect(SwitchCSS).toMatchSnapshot();
});
