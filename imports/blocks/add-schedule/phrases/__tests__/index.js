import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import TertiaryPhrase from "../";

const defaulProps = {
  additionalClasses: null,
  text: "test",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaulProps,
    ...additionalProps,
  };
  return <TertiaryPhrase { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("appends additional classes", () => {
  const wrapper = shallow(generateComponent({
    additionalClasses: "one two three",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
