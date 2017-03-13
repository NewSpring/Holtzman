import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { clone } from "ramda";
import Select from "../Select";

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
  style: {
    color: "green",
  },
  placeholder: null,
  selected: null,
  includeBlank: false,
  deselect: false,
  items: [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
  ],
  optionClasses: "one two",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Select { ...newProps } />;
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

it("is active if selected prop", () => {
  const wrapper = shallow(generateComponent({
    selected: "2",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("can hide the label", () => {
  const wrapper = shallow(generateComponent({
    hideLabel: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("includes placeholder", () => {
  const wrapper = shallow(generateComponent({
    placeholder: "myPlaceholder",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("includes blank", () => {
  const wrapper = shallow(generateComponent({
    includeBlank: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("allows deselect", () => {
  const wrapper = shallow(generateComponent({
    deselect: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates state on mount if default value", () => {
  const wrapper = shallow(generateComponent({
    defaultValue: "2",
  }));
  expect(wrapper.state().active).toBe(true);
});

it("calls onChange and validation function on did mount", () => {
  const mockOnChange = jest.fn();
  const mockValidation = jest.fn();
  const wrapper = mount(generateComponent({
    defaultValue: "2",
    onChange: mockOnChange,
    validation: mockValidation,
  }));
  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(mockOnChange.mock.calls[0][0]).toBe("2");
  expect(mockValidation).toHaveBeenCalledTimes(1);
  expect(mockValidation.mock.calls[0][0]).toBe("2");
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

it("change calls onCheck and validation", () => {
  const mockEvent = {
    currentTarget: {
      value: "test",
    },
  };
  const mockOnChange = jest.fn();
  const mockValidation = jest.fn();
  const wrapper = shallow(generateComponent({
    onChange: mockOnChange,
    validation: mockValidation,
  }));
  wrapper.instance().change(mockEvent);
  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(mockOnChange).toHaveBeenCalledWith(
    mockEvent.currentTarget.value,
    mockEvent.currentTarget,
  );
  expect(mockValidation).toHaveBeenCalledTimes(1);
  expect(mockValidation).toHaveBeenCalledWith(
    mockEvent.currentTarget.value,
    mockEvent.currentTarget,
  );
});

it("validate updates state when no value", () => {
  const mockValidation = jest.fn(() => true);
  const wrapper = mount(generateComponent({
    includeBlank: true,
    validation: mockValidation,
  }));
  wrapper.setState({ active: true, error: true, focused: true });
  wrapper.instance().validate();
  expect(wrapper.state().active).toBe(false);
  expect(wrapper.state().error).toBe(false);
  expect(wrapper.state().focused).toBe(false);
});

it("validate sets error when invalid", () => {
  const mockValidation = jest.fn(() => false);
  const wrapper = mount(generateComponent({
    defaultValue: "1",
    validation: mockValidation,
  }));
  wrapper.instance().validate();
  expect(wrapper.state().error).toBe(true);
});
