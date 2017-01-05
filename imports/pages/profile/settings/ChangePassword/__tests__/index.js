import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { nav } from "../../../../../data/store";
import { ChangePasswordWithoutData as ChangePassword } from "../";

jest.mock("../../../../../deprecated/methods/accounts/browser", () => ({
  reset: jest.fn(),
}));

jest.mock("../../../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <ChangePassword { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders error version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    state: "error",
    err: Error,
  });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    state: "loading",
  });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders success version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    state: "success",
  });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  nav.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(nav.setLevel).toHaveBeenCalledTimes(1);
  expect(nav.setLevel).toHaveBeenCalledWith("BASIC_CONTENT");
});

it("updates nav on unmount", () => {
  const mockDispatch = jest.fn();
  nav.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.unmount();
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(nav.setLevel).toHaveBeenCalledTimes(2);
  expect(nav.setLevel).toHaveBeenCalledWith("TOP");
});

it("submit resets everyting", () => {
  const mockPreventDefault = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.instance().submit({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(wrapper.state().state).toBe("loading");
});

it("save returns false if newP is not value", () => {
  const wrapper = shallow(generateComponent());
  const mockInput = {
    id: "newPDup",
  };
  wrapper.setState({
    newP: "test",
  });
  const result = wrapper.instance().save("notTest", mockInput);
  expect(result).toBe(false);
});

it("save returns false if newPDup is not value", () => {
  const wrapper = shallow(generateComponent());
  const mockInput = {
    id: "newP",
  };
  wrapper.setState({
    newPDup: "test",
  });
  const result = wrapper.instance().save("notTest", mockInput);
  expect(result).toBe(false);
});

it("save updates the state and returns true", () => {
  const wrapper = shallow(generateComponent());
  const mockInput = {
    id: "newP",
  };
  wrapper.setState({
    newPDup: "test",
  });
  const result = wrapper.instance().save("test", mockInput);
  expect(wrapper.instance().state.newP).toBe("test");
  expect(result).toBe(true);
});
