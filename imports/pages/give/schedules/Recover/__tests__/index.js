import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import { TemplateWithoutData as Template } from "../";
import Confirm from "../../Details/Confirm";
import {
  modal as modalActions,
  give as giveActions,
  header as headerActions,
} from "../../../../../data/store";

jest.mock("../../../../../data/store", () => ({
  modal: {
    render: jest.fn(),
  },
  give: {
    setRecoverableSchedule: jest.fn(),
    deleteSchedule: jest.fn(),
    deleteRecoverableSchedules: jest.fn(),
  },
  header: {
    set: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    loading: false,
    transactions: [{}, {}],
    person: {},
  },
  accounts: {
    accounts: [{}],
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

it("renders without accounts", () => {
  const wrapper = shallow(generateComponent({
    accounts: {},
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without transactions", () => {
  const wrapper = shallow(generateComponent({
    data: {
      loading: false,
      transactions: null,
      person: {},
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without person", () => {
  const wrapper = shallow(generateComponent({
    data: {
      loading: false,
      transactions: [{}, {}],
      person: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("confirm sets the recoverable schedule and returns true", () => {
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

  expect(result).toBe(true);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.setRecoverableSchedule).toHaveBeenCalledTimes(1);
  expect(giveActions.setRecoverableSchedule).toHaveBeenCalledWith(1);
});

it("cancel renders modal and deletes schedules when finished", () => {
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
  giveActions.deleteRecoverableSchedules = jest.fn();
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

  expect(mockDispatch).toHaveBeenCalledTimes(4);
  expect(giveActions.deleteSchedule).toHaveBeenCalledTimes(2);
  expect(giveActions.deleteSchedule).toHaveBeenCalledWith("1");
  expect(giveActions.deleteSchedule).toHaveBeenCalledWith(1);
  expect(giveActions.deleteRecoverableSchedules).toHaveBeenCalledTimes(1);
  expect(giveActions.deleteRecoverableSchedules).toHaveBeenCalledWith(1);
  expect(Meteor.call).toHaveBeenCalledTimes(1);
  expect(Meteor.call.mock.calls[0][0]).toBe("give/schedule/cancel");
  expect(Meteor.call.mock.calls[0][1]).toEqual({ id: "1" });
});
