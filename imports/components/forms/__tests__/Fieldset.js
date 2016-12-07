import { shallow } from "enzyme";
import FieldSet from "../Fieldset";

const defaultProps = {
  classes: null,
  theme: null,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return (
    <FieldSet { ...newProps }>
      <h1>test</h1>
    </FieldSet>
  );
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("appends classes if present", () => {
  const wrapper = shallow(generateComponent({
    classes: ["one", "two"],
  }));
  expect(wrapper).toMatchSnapshot();
});

it("overrides with theme if present", () => {
  const wrapper = shallow(generateComponent({
    theme: "override",
  }));
  expect(wrapper).toMatchSnapshot();
});
