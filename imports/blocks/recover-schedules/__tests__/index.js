import { Meteor } from "meteor/meteor";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import moment from "moment";

import { RecoverSchedules } from "../";
import Remind from "../Remind";

jest.mock("moment");

beforeEach(() => {
  reset();
  startBuffering();
})
afterEach(() => {
  Meteor.call.mockClear();
  reset();
});

describe("RecoverSchedules", () => {
  const sampleProps = {
    dispatch: jest.fn(),
    give: {
      recoverableSchedules: {},
      reminderDate: "20200101",
    },
  };

  it("should be default if default props are passed", () => {
    const tree = shallow(
      <RecoverSchedules {...sampleProps} />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("has and calls the back method", () => {
    const wrapper = shallow(
      <RecoverSchedules {...sampleProps} />
    );
    const component = wrapper.instance();
    expect(component.back).toBeTruthy();
    const mockedEvent = {
      preventDefault: jest.fn(),
    };
    component.setState({ state: "something-else" });
    expect(wrapper.state()).toEqual({ state: "something-else" });
    component.back(mockedEvent);
    expect(mockedEvent.preventDefault).toBeCalled();
    expect(wrapper.state()).toEqual({ state: "default" });
  });

  it("has and calls the close method", () => {
    const wrapper = shallow(
      <RecoverSchedules {...sampleProps} />
    );
    const component = wrapper.instance();
    expect(component.close).toBeTruthy();
    sampleProps.dispatch.mockClear();
    component.close();
    expect(sampleProps.dispatch).toBeCalled();
    expect(sampleProps.dispatch.mock.calls[0]).toMatchSnapshot();
  });

  it("has and calls the onRemind method", () => {
    // set up document.getElementById for calling onRemind
    const originalGet = document.getElementById;
    document.getElementById = jest.fn(originalGet);
    document.getElementById.mockReturnValueOnce({ value: "tomorrow" });

    // you could do ^^ this way too
    // const input = document.createElement("INPUT");
    // input.id = "remind-frequency";
    // input.value = "MY TEST VALUE";
    // document.getElementsByTagName("body")[0].appendChild(input);

    const wrapper = shallow(
      <RecoverSchedules {...sampleProps} />
    );
    // make sure it passes the "remind" state to the Layout
    wrapper.setState({ state: "remind" });
    expect(shallowToJson(wrapper)).toMatchSnapshot()

    // make sure the onRemind function exists
    const component = wrapper.instance();
    expect(component.onRemind).toBeTruthy();

    // make sure the onRemind function has been called.
    const mockedEvent = {
      preventDefault: jest.fn(),
    }
    Meteor.userId = jest.fn(() => "test");
    Meteor.users = {
      update: jest.fn(Meteor.userId),
    };

    const toDate = jest.fn(() => "");
    const add = jest.fn(() => ({ toDate }));

    moment
      .mockReturnValueOnce({ add })
      .mockReturnValueOnce({ add })
      .mockReturnValueOnce({ add });

    toDate
      .mockReturnValueOnce("tomorrow")
      .mockReturnValueOnce("nextWeek")
      .mockReturnValueOnce("twoWeeks")

    sampleProps.dispatch.mockClear();
    component.onRemind(mockedEvent);

    expect(add).toBeCalledWith(1, "days");
    expect(add).toBeCalledWith(7, "days");
    expect(add).toBeCalledWith(14, "days");
    expect(mockedEvent.preventDefault).toBeCalled();
    expect(document.getElementById).toBeCalledWith("remind-frequency");
    expect(Meteor.users.update.mock.calls[0][0]).toEqual({
      "_id": "test",
    });

    expect(Meteor.users.update.mock.calls[0][1]).toEqual({
      "$set": {
        "profile.reminderDate": "tomorrow",
      },
    });

    expect(sampleProps.dispatch).toBeCalled();
    expect(sampleProps.dispatch).toHaveBeenCalledTimes(2);
    expect(wrapper.state()).toEqual({ state: "later" });
    document.getElementById = originalGet;
  });
});