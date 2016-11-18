import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { ConfirmWithoutData as Confirm } from "../Confirm";

import { modal as modalActions } from "../../../../../store";

jest.mock("../../../../../store", () => ({
  modal: {
    hide: jest.fn(),
  },
}));

const defaultProps = {
  onFinished: jest.fn(),
  dispatch: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Confirm { ...newProps } />
};

it("render with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("back hides modal", () => {
  const mockDispatch = jest.fn();
  modalActions.hide = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().back();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modalActions.hide).toHaveBeenCalledTimes(1);
});

it("onClick calls onFinished, and thus dipatch and back", () => {
  const mockDispatch = jest.fn();
  const mockOnFinished = jest.fn();
  modalActions.hide = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    onFinished: mockOnFinished,
  }));
  wrapper.instance().onClick();
  expect(mockOnFinished).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modalActions.hide).toHaveBeenCalledTimes(1);
});
