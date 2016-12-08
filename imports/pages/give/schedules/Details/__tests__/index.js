import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { DetailsWithoutData as Details } from "../";
import Confirm from "../Confirm";

import {
  nav as navActions,
  modal as modalActions,
  give as giveActions,
  header as headerActions,
} from "../../../../../store";

jest.mock("../../../../../store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
  modal: {
    render: jest.fn(),
  },
  give: {
    deleteSchedule: jest.fn(),
  },
  header: {
    set: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  cancel: jest.fn(),
  data: {
    loading: false,
    transaction: {
      id: "1",
      gateway: "testGateway",
      next: "2012-12-12",
      schedule: {
        value: "test",
      },
    },
  },
  entries: {},
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

it("renders without transaction", () => {
  const wrapper = shallow(generateComponent({
    data: {
      loading: false,
      transaction: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders when complete", () => {
  const wrapper = shallow(generateComponent({
    data: {
      loading: false,
      transaction: {
        next: "2012-12-12",
        schedule: {
          value: "One-Time",
        },
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("adjusts nav level on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("BASIC_CONTENT");
});

it("adjusts nav level on unmount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.unmount();
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
});

it("adjusts state on unmount if removed", () => {
  const mockDispatch = jest.fn();
  giveActions.deleteSchedule = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setState({ removed: true });
  wrapper.unmount();

  expect(giveActions.deleteSchedule).toHaveBeenCalledTimes(1);
  expect(giveActions.deleteSchedule).toHaveBeenCalledWith(true);
});

it("stop renders the modal with Confirm", () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  const mockCancel = jest.fn();
  modalActions.render = jest.fn();

  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    cancel: mockCancel
  }));

  wrapper.instance().stop({
    preventDefault: mockPreventDefault,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(modalActions.render).toHaveBeenCalledTimes(1);
  expect(modalActions.render.mock.calls[0][0]).toEqual(Confirm);

  // call onFinished callback
  modalActions.render.mock.calls[0][1].onFinished();
  expect(wrapper.state().isActive).toBe(false);
  expect(wrapper.state().removed).toBe(defaultProps.data.transaction.id);
  expect(mockCancel).toHaveBeenCalledWith(defaultProps.data.transaction.id);
});
