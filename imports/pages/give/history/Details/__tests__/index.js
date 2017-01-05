import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { DetailsWithoutData as Details } from "../";
import {
  nav as navActions,
} from "../../../../../data/store";

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    transaction: {},
  },
  entries: {
    loading: false,
    entries: [{}, {}],
  },
  setRightProps: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Details { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("BASIC_CONTENT");
});

it("updates nav on unmount", () => {
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
