import { shallow } from "enzyme";
import { Meteor } from "meteor/meteor";
import { TemplateWithoutData as Template } from "../";

const defaultProps = {
  breakpoints: [],
};
const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Template { ...newProps } />;
};

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("renders server version", () => {
  Meteor.isServer = true;
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
  Meteor.isServer = false;
});

it("renders lap-and-up version", () => {
  const wrapper = shallow(generateComponent({
    breakpoints: ["lap-and-up"],
  }));
  expect(wrapper).toMatchSnapshot();
});
