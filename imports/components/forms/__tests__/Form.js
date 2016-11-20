import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Form from "../Form";

const defaultProps = {
  theme: null,
  classes: null,
  id: "2",
  submit: jest.fn(),
  action: true,
  method: "POST",
  style: {
    color: "green",
  },
  fieldsetTheme: "fieldsetTheme",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return (
    <Form { ...newProps }>
      <h1>test</h1>
    </Form>
  );
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("overrides with theme if theme", () => {
  const wrapper = shallow(generateComponent({
    theme: "override",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("appends classes if present", () => {
  const wrapper = shallow(generateComponent({
    classes: ["append", "me"],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
