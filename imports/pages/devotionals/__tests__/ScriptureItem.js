import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import ScriptureItem from "../ScriptureItem";

const defaultProps = {
  scripture: "Job 2",
};

const generateComponent = () => (
  <ScriptureItem { ...defaultProps } />
);

it("renders loading without scriptureData", () => {
  Meteor.call = jest.fn();
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("calls getScripture meteor method", () => {
  Meteor.call = jest.fn();
  const wrapper = shallow(generateComponent());
  expect(Meteor.call).toHaveBeenCalledTimes(1);
  expect(Meteor.call.mock.calls[0][0]).toBe("getScripture");
  expect(Meteor.call.mock.calls[0][1]).toBe(defaultProps.scripture);
});

it("renders scripture when state updated", () => {
  Meteor.call = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    scriptureData: "<h1>scipture</h1>",
  });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
