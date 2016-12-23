import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Accounts } from "meteor/accounts-base";
import Validate from "../../../util/validate";
import ForgotPassword from "../ForgotPassword";

jest.mock("../../../methods/accounts/browser", () => ({
  forceReset: jest.fn(),
}));

import { forceReset } from "../../../methods/accounts/browser";

const defaultProps = {
  save: jest.fn(),
  clear: jest.fn(),
  email: "test@test.com",
  errors: {},
  back: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <ForgotPassword { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders error version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ state: "error", err: "error message" });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ state: "loading" });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders success version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ state: "success" });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders disabled if errors from props", () => {
  const wrapper = shallow(generateComponent({
    errors: {
      message: "thing",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("isEmail saves the email if valid", () => {
  const mockSave = jest.fn();
  Validate.isEmail = jest.fn(() => true);
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().isEmail("test@gmail.com");
  expect(result).toBe(true);
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({ email: "test@gmail.com" });
});

it("isEmail clears the email if invalid", () => {
  const mockClear = jest.fn();
  Validate.isEmail = jest.fn(() => false);
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  const result = wrapper.instance().isEmail("test@gmail.com");
  expect(result).toBe(false);
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("email");
});

it("submit calls Accounts forgot password", () => {
  jest.useFakeTimers();
  Accounts.forgotPassword = jest.fn();
  const mockBack = jest.fn();
  const wrapper = shallow(generateComponent({
    back: mockBack,
  }));
  const mockPreventDefault = jest.fn();
  wrapper.instance().submit({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(Accounts.forgotPassword).toHaveBeenCalledTimes(1);
  expect(Accounts.forgotPassword.mock.calls[0][0]).toEqual({ email: defaultProps.email });
  expect(wrapper.state().state).toBe("loading");
  // simulate successful forgotPassword callback
  Accounts.forgotPassword.mock.calls[0][1](null);
  expect(wrapper.state().state).toBe("success");
  jest.runAllTimers();
  expect(wrapper.state().state).toBe("default");
  expect(mockBack).toHaveBeenCalledTimes(1);
});

it("submit updates with error when forgotPassword errors", () => {
  jest.useFakeTimers();
  Accounts.forgotPassword = jest.fn();
  const mockBack = jest.fn();
  const wrapper = shallow(generateComponent({
    back: mockBack,
  }));
  const mockPreventDefault = jest.fn();
  wrapper.instance().submit({
    preventDefault: mockPreventDefault,
  });
  // simulate error forgotPassword callback
  Accounts.forgotPassword.mock.calls[0][1]({ message: "test error" });
  expect(wrapper.state().state).toBe("error");
  expect(wrapper.state().err).toBe("test error");
  jest.runAllTimers();
  expect(wrapper.state().state).toBe("default");
});

it("submit tries force reset if 403 error", () => {
  jest.useFakeTimers();
  Accounts.forgotPassword = jest.fn();
  const mockBack = jest.fn();
  const wrapper = shallow(generateComponent({
    back: mockBack,
  }));
  const mockPreventDefault = jest.fn();
  wrapper.instance().submit({
    preventDefault: mockPreventDefault,
  });
  // simulate error forgotPassword callback
  Accounts.forgotPassword.mock.calls[0][1]({ error: 403 });
  expect(forceReset).toHaveBeenCalledTimes(1);
  expect(forceReset.mock.calls[0][0]).toBe(defaultProps.email);
  // simulate successful forceReset callback
  forceReset.mock.calls[0][1](null);
  expect(wrapper.state().state).toBe("success");
  jest.runAllTimers();
  expect(wrapper.state().state).toBe("default");
  expect(mockBack).toHaveBeenCalledTimes(1);
  forceReset.mockClear();
});

it("submit tries force reset if 403 error and then errors if error again", () => {
  jest.useFakeTimers();
  Accounts.forgotPassword = jest.fn();
  const mockBack = jest.fn();
  const wrapper = shallow(generateComponent({
    back: mockBack,
  }));
  const mockPreventDefault = jest.fn();
  wrapper.instance().submit({
    preventDefault: mockPreventDefault,
  });
  // simulate error forgotPassword callback
  Accounts.forgotPassword.mock.calls[0][1]({ error: 403 });
  expect(forceReset).toHaveBeenCalledTimes(1);
  expect(forceReset.mock.calls[0][0]).toBe(defaultProps.email);
  // simulate successful forceReset callback
  forceReset.mock.calls[0][1]({ message: "test error" });
  expect(wrapper.state().state).toBe("error");
  expect(wrapper.state().err).toBe("test error");
  jest.runAllTimers();
  expect(wrapper.state().state).toBe("default");
  forceReset.mockClear();
});
