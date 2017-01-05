import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import {
  modal as modalActions,
  header as headerActions,
  give as giveActions,
} from "../../../../data/store";
import Confirm from "../Details/Confirm";
import { TemplateWithoutData as Template } from "../";

jest.mock("../../../../data/store", () => ({
  modal: {
    render: jest.fn(),
  },
  header: {
    set: jest.fn(),
  },
  give: {
    setRecoverableSchedule: jest.fn(),
    deleteSchedule: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  schedules: {
    loading: false,
    schedules: [],
  },
  accounts: {
    loading: false,
    accounts: [],
  },
  give: {
    recoverableSchedules: [],
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

it("confirm sets the recoverable schedule", () => {
  const mockEvent = {
    currentTarget: {
      dataset: {
        id: "1",
      },
    },
  };
  const mockDispatch = jest.fn();
  giveActions.setRecoverableSchedule = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  const result = wrapper.instance().confirm(mockEvent);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.setRecoverableSchedule).toHaveBeenCalledTimes(1);
  expect(giveActions.setRecoverableSchedule).toHaveBeenCalledWith(1);
  expect(result).toBe(true);
});

it("cancel deletes the recoverable schedule", () => {
  const mockEvent = {
    currentTarget: {
      dataset: {
        id: "1",
      },
    },
  };
  const mockDispatch = jest.fn();
  modalActions.render = jest.fn();
  giveActions.deleteSchedule = jest.fn();
  Meteor.call = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.instance().cancel(mockEvent);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modalActions.render).toHaveBeenCalledTimes(1);
  expect(modalActions.render.mock.calls[0][0]).toBe(Confirm);

  // call onFinished callback
  modalActions.render.mock.calls[0][1].onFinished();

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(giveActions.deleteSchedule).toHaveBeenCalledTimes(1);
  expect(giveActions.deleteSchedule).toHaveBeenCalledWith("1");
  expect(Meteor.call.mock.calls[0][0]).toBe("give/schedule/cancel");
  expect(Meteor.call.mock.calls[0][1]).toEqual({
    id: "1",
  });
});
