import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import File from "../File";

const defaultProps = {
  defaultValue: null,
  autofocus: false,
  format: jest.fn(),
  validation: jest.fn(),
  status: null,
  disabled: false,
  errorTest: null,
  theme: null,
  classes: null,
  style: null,
  id: "2",
  name: "testname",
  label: "Test Name",
  hideLabel: false,
  placeholder: "testholder",
  inputClasses: null,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <File { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("overrides with theme", () => {
  const wrapper = shallow(generateComponent({
    theme: ["mytheme"],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("has focused state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ focused: true });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("has error state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ error: true });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("appends classes", () => {
  const wrapper = shallow(generateComponent({
    classes: ["append", "me"],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("hides the label", () => {
  const wrapper = shallow(generateComponent({
    hideLabel: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("makes active on mount if defaultValue", () => {
  const wrapper = shallow(generateComponent({
    defaultValue: "test",
  }));
  expect(wrapper.state().active).toBe(true);
});

it("updates state if next default value isn't the current", () => {
  const wrapper = mount(generateComponent({
    defaultValue: "test",
  }));
  wrapper.setState({ focused: true });
  wrapper.setProps({ defaultValue: "test2" });
  expect(wrapper.state().focused).toBe(false);
});

it("format call format", () => {
  const mockFormat = jest.fn();
  const mockEvent = {};
  const wrapper = mount(generateComponent({
    defaultValue: "hey",
    format: mockFormat,
  }));
  wrapper.instance().format(mockEvent);
  expect(mockFormat).toHaveBeenCalledTimes(1);
  expect(mockFormat.mock.calls[0][0]).toBe("hey");
  expect(mockFormat.mock.calls[0][2]).toBe(mockEvent);
});

it("validate resets state if no value", () => {
  const mockValidation = jest.fn(() => true);
  const wrapper = mount(generateComponent({
    validation: mockValidation,
  }));
  wrapper.setState({ active: true, error: true, focused: true });
  wrapper.instance().validate();
  expect(wrapper.state().active).toBe(false);
  expect(wrapper.state().error).toBe(false);
  expect(wrapper.state().focused).toBe(false);
});

it("validate sets error if not valid", () => {
  const mockValidation = jest.fn(() => false);
  const wrapper = mount(generateComponent({
    defaultValue: "test",
    validation: mockValidation,
  }));
  wrapper.instance().validate();
  // from default value on mount
  expect(wrapper.state().active).toBe(true);
  expect(wrapper.state().focused).toBe(false);
  expect(wrapper.state().error).toBe(true);
});

it("focus updates state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().focus();
  expect(wrapper.state().active).toBe(true);
  expect(wrapper.state().error).toBe(false);
  expect(wrapper.state().focused).toBe(true);
});

it("getValue calls focus and validation", () => {
  const mockValidation = jest.fn(() => true);
  const wrapper = mount(generateComponent({
    validation: mockValidation,
  }));
  wrapper.instance().setValue("test");
  expect(wrapper.state().active).toBe(true);
  expect(wrapper.state().error).toBe(false);
  expect(wrapper.state().focused).toBe(false);
  expect(mockValidation).toHaveBeenCalledTimes(1);
  // XXX this makes the test time out for some reason
  // expect(mockValidation).toHaveBeenCalledWith("test");
});

it("getValue retrives value from node", () => {
  const wrapper = mount(generateComponent({
    defaultValue: "test",
  }));
  const result = wrapper.instance().getValue();
  expect(result).toBe("test");
});

it("renderHelpText renders if error and error text", () => {
  const wrapper = mount(generateComponent({
    errorText: "error",
  }));
  wrapper.setState({ error: true });
  const result = wrapper.instance().renderHelpText();
  expect(result).toMatchSnapshot();
});

it("renderHelpText renders if status", () => {
  const wrapper = mount(generateComponent());
  wrapper.setState({ status: "status message" });
  const result = wrapper.instance().renderHelpText();
  expect(result).toMatchSnapshot();
});

it("renderHelpText returns undefined otherwise", () => {
  const wrapper = mount(generateComponent());
  const result = wrapper.instance().renderHelpText();
  expect(result).toBe(undefined);
});

it("style returns blank object if enabled", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().style();
  expect(result).toEqual({});
});

it("style returns disabled style if disabled", () => {
  const wrapper = shallow(generateComponent({
    disabled: true,
  }));
  const result = wrapper.instance().style();
  expect(result).toEqual({
    cursor: "inherit",
  });
});
