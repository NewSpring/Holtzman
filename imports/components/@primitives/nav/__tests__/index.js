import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  modal as modalActions,
} from "../../../../data/store";
import {
  NavContainerWithoutData as NavContainer,
} from "../";

jest.mock("../Link", () => jest.fn());

const defaultProps = {
  dispatch: jest.fn(),
  liked: {},
  state: {
    visible: true,
  },
  modal: {},
  path: "path",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <NavContainer { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("does not render if not visible", () => {
  const wrapper = shallow(generateComponent({
    state: {
      visible: false,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("handleAction calls action passed", () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const mockAction = jest.fn();
  wrapper.instance().handleAction(mockAction);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockAction).toHaveBeenCalledTimes(1);
});

it("reset hides the modal", () => {
  modalActions.hide = jest.fn();
  const mockDispatch = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().reset();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modalActions.hide).toHaveBeenCalledTimes(1);
});
