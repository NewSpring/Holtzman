import { shallow } from "enzyme";
import SwitchCSS from "../switch-css";

it("is a json rep of css styles", () => {
  expect(SwitchCSS).toMatchSnapshot();
});
