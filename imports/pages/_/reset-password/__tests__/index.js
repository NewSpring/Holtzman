import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset } from "../../../../methods/accounts/browser";
import { ChangePasswordWithoutData as ChangePassword } from "../";

const defaultProps = {
  params: {
    token: "test",
  },
  dispatch: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <ChangePassword { ...newProps } />;
};

it("renders Layout by default", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders error when error", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    state: "error",
    err: {
      message: "test error",
    },
  });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading when loading", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    state: "loading",
  });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders success when success", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    state: "success",
  });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("submit calls Accounts.resetPassword", () => {
  const mockPreventDefault = jest.fn();
  const mockResetPassword = jest.fn();
  global.Accounts = {
    resetPassword: mockResetPassword,
  };
  const wrapper = shallow(generateComponent());
  wrapper.setState({ newP: "password" });

  wrapper.instance().submit({
    preventDefault: mockPreventDefault,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);

  expect(mockResetPassword).toHaveBeenCalledTimes(1);
  expect(mockResetPassword.mock.calls[0][0]).toBe(defaultProps.params.token);
  expect(mockResetPassword.mock.calls[0][1]).toBe("password");
});

it("save returns false if newP is not value", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    newP: "password",
  });
  const mockTarget = document.createElement("input");
  mockTarget.id = "newPDup";

  const result = wrapper.instance().save("notpassword", mockTarget);
  expect(result).toBeFalsy();
});

it("save returns false if newPDup is not value", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    newPDup: "password",
  });
  const mockTarget = document.createElement("input");
  mockTarget.id = "newP";

  const result = wrapper.instance().save("notpassword", mockTarget);
  expect(result).toBeFalsy();
});

it("save returns true when everything is in order", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    newPDup: "password",
  });
  const mockTarget = document.createElement("input");
  mockTarget.id = "newP";

  const result = wrapper.instance().save("password", mockTarget);
  expect(result).toBeTruthy();
  expect(wrapper.state().newP).toBe("password");
});
