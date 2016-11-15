import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { TemplateWithoutData as Template } from "../";

import {
  nav as navActions,
} from "../../../../store";

const defaultProps = {
  dispatch: jest.fn(),
  accounts: {
    loading: false,
    accounts: [
      { name: "Other Fund" },
      { name: "General Fund" },
    ],
  },
  params: {
    name: "General%20Fund",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Template { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders Loading if loading", () => {
  const wrapper = shallow(generateComponent({
    accounts: {
      loading: true,
      accounts: [
        { name: "Other Fund" },
        { name: "General Fund" },
      ],
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders Loading if account not found", () => {
  const wrapper = shallow(generateComponent({
    accounts: {
      loading: true,
      accounts: [
        { name: "Other Fund" },
      ],
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("sets nav level on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("BASIC_CONTENT");
});

it("sets nav level on unmount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.unmount();
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledWith("BASIC_CONTENT");
  expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
});

it("getAccount matches url param to account", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getAccount();
  expect(result).toEqual(defaultProps.accounts.accounts[1]);
});

it("getAccount returns false if no accounts", () => {
  const wrapper = shallow(generateComponent({
    accounts: {
      loading: false,
    },
  }));
  const result = wrapper.instance().getAccount();
  expect(result).toBe(false);
});

it("getAccount returns false if no param name", () => {
  const wrapper = shallow(generateComponent({
    params: {},
  }));
  const result = wrapper.instance().getAccount();
  expect(result).toBe(false);
});

it("getAccount returns false account not found", () => {
  const wrapper = shallow(generateComponent({
    params: {
      name: "Not an Account",
    },
  }));
  const result = wrapper.instance().getAccount();
  expect(result).toBe(false);
});
