import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import Back from "../Back";

const generateComponent = () => (
  <Back />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render on cordova", () => {
  Meteor.isCordova = true;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
