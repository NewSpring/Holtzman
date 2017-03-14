import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { clone } from "ramda";
import TextArea from "../TextArea";

const defaultProps = {
  defaultValue: null,
  status: null,
  disabled: false,
  validation: jest.fn(),
  errorText: null,
  theme: null,
  error: null,
  classes: null,
  id: "2",
  label: "myLabel",
  name: "myName",
  inputClasses: "input classes",
  hideLabel: false,
  autofocus: false,
  onChange: jest.fn(),
  onBlur: jest.fn(),
  style: {
    color: "green",
  },
  placeholder: "myPlaceholder",
  rows: 10,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <TextArea { ...newProps } />;
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("overrides with theme if present", () => {
  const wrapper = shallow(generateComponent({
    theme: ["override"],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("has active state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ active: true });
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

it("appends extra classes", () => {
  const wrapper = shallow(generateComponent({
    classes: ["append", "me"],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("can hide the label", () => {
  const wrapper = shallow(generateComponent({
    hideLabel: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates state on mount if default value", () => {
  const wrapper = shallow(generateComponent({
    defaultValue: "2",
  }));
  expect(wrapper.state().active).toBe(true);
});

it("sets value of node on did mount", () => {
  const wrapper = mount(generateComponent({
    defaultValue: "2",
  }));
  expect(wrapper.instance().getValue()).toBe("2");
  expect(wrapper.instance().interval).toBeTruthy();
});

it("updates state on will update", () => {
  const wrapper = mount(generateComponent({
    defaultValue: "2",
  }));
  const nextProps = clone(defaultProps);
  nextProps.defaultValue = "3";
  wrapper.setState({ focused: true });
  wrapper.instance().componentWillUpdate(nextProps);
  expect(wrapper.state().focused).toBe(false);
});

it("removes interval on unmount", () => {
  const mockClearInterval = jest.fn();
  global.clearInterval = mockClearInterval;
  const wrapper = mount(generateComponent({
    defaultValue: "2",
  }));
  wrapper.instance().componentWillUnmount();
  expect(mockClearInterval).toHaveBeenCalledTimes(1);
});

it("format calls onChange and validation function", () => {
  const mockFormat = jest.fn((x) => x);
  const mockOnChange = jest.fn();
  const mockEvent = {};
  const wrapper = mount(generateComponent({
    defaultValue: "2",
    format: mockFormat,
    onChange: mockOnChange,
  }));
  wrapper.instance().format(mockEvent);
  expect(mockFormat).toHaveBeenCalledTimes(1);
  expect(mockFormat.mock.calls[0][0]).toBe("2");
  expect(mockFormat.mock.calls[0][2]).toBe(mockEvent);
  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(mockOnChange.mock.calls[0][0]).toBe("2");
  expect(mockOnChange.mock.calls[0][2]).toBe(mockEvent);
});

it("validate updates state when no value", () => {
  const mockValidation = jest.fn(() => true);
  const wrapper = mount(generateComponent({
    validation: mockValidation,
  }));
  wrapper.setState({ active: true, error: true, focused: true });
  wrapper.instance().validate();
  expect(mockValidation).toHaveBeenCalledTimes(1);
  expect(wrapper.state().active).toBe(false);
  expect(wrapper.state().error).toBe(false);
  expect(wrapper.state().focused).toBe(false);
});

it("validate sets error when invalid", () => {
  const mockValidation = jest.fn(() => false);
  const mockOnBlur = jest.fn();
  const mockEvent = jest.fn();
  const wrapper = mount(generateComponent({
    defaultValue: "1",
    validation: mockValidation,
    onBlur: mockOnBlur,
  }));
  wrapper.instance().validate(mockEvent);
  expect(wrapper.state().error).toBe(true);
  expect(mockOnBlur).toHaveBeenCalledTimes(1);
  expect(mockOnBlur.mock.calls[0][0]).toBe("1");
  expect(mockOnBlur.mock.calls[0][2]).toBe(mockEvent);
});

it("focus changes the state", () => {
  const wrapper = mount(generateComponent());
  wrapper.setState({ error: true });
  wrapper.instance().focus();
  expect(wrapper.state().active).toBe(true);
  expect(wrapper.state().error).toBe(false);
  expect(wrapper.state().focused).toBe(true);
});

it("disabled returns disabled when set", () => {
  const wrapper = shallow(generateComponent({
    disabled: true,
  }));
  const result = wrapper.instance().disabled();
  expect(result).toBe(true);
});

it("disabled returns undefined when not set", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().disabled();
  expect(result).toBe(undefined);
});

it("renderHepText returns undefined when no error or status", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().renderHelpText();
  expect(result).toBe(undefined);
});

it("renderHepText returns when error and error text", () => {
  const wrapper = shallow(generateComponent({
    errorText: "error",
  }));
  wrapper.setState({ error: true });
  const result = wrapper.instance().renderHelpText();
  expect(result).toMatchSnapshot();
});

it("renderHepText returns when status", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ status: "some status" });
  const result = wrapper.instance().renderHelpText();
  expect(result).toMatchSnapshot();
});

it("style returns blank object whe no style and not disabled", () => {
  const wrapper = shallow(generateComponent({
    style: null,
  }));
  const result = wrapper.instance().style();
  expect(result).toEqual({});
});

it("style returns styles in props", () => {
  const style = {
    color: "red",
  };
  const wrapper = shallow(generateComponent({
    style,
  }));
  const result = wrapper.instance().style();
  expect(result).toEqual(style);
});

it("style returns styles in props plus disabled state", () => {
  const style = {
    color: "red",
  };
  const wrapper = shallow(generateComponent({
    style,
    disabled: true,
  }));
  const result = wrapper.instance().style();
  expect(result).toEqual({
    ...style,
    ...{
      cursor: "inherit",
    },
  });
});
