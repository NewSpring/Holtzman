import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import { connect } from "react-redux";

import { give as giveActions } from "../../../../store";

import { Schedule, withGiveActions } from "../";

jest.useFakeTimers();

jest.mock("react-redux", () => ({
  connect: jest.fn(() => (component) => <component />),
}));

jest.mock("moment", () => (date) => ({
  endOf: (time) => ({
    add: (amount, time) => ({
      format: (style) => `${date || "now"}.endOf(${time}).add(${amount}, ${time}).format(${style})`,
      toISOString: () => `${date || "now"}.endOf(${time}).add(${amount}, ${time}).toISOString()`,
    }),
  }),
  add: (amount, time) => ({
    toISOString: (style) => `${date || "now"}.endOf(${time}).add(${amount}, ${time}).toISOString()`,
  }),
}));

jest.mock("../Layout", () => jest.fn(() => <div />));

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    authorized: true,
    saveSchedule: jest.fn(),
    setCanCheckout: jest.fn(),
  };
  return (
    <Schedule {...defaultProps} {...additionalProps} />
  );
};

it("is mapped to the store as expected", () => {
  expect(connect).toBeCalledWith(null, giveActions);
});

it("should render with minimal props", () => {
  const component = shallow(generateComponent());
  expect(shallowToJson(component)).toMatchSnapshot();
});

it("should render nothing if not authorized", () => {
  const component = shallow(generateComponent({ authorized: false }));
  expect(shallowToJson(component)).toEqual(null);
});


describe("Class", () => {
  describe("lifecycle events", () => {
    it("attaches to window a listener on mount", () => {
      const spy = jest.fn();
      const originalListen = window.addEventListener;
      window.addEventListener = jest.fn(window.addEventListener);
      const wrapper = mount(generateComponent());
      const { fixPickerPosition } = wrapper.instance();

      expect(window.addEventListener).toBeCalledWith("resize", fixPickerPosition);
      window.addEventListener = originalListen;
    });
    it("disables checkout from state change", () => {
      const spy = jest.fn();
      const wrapper = mount(generateComponent({
        setCanCheckout: spy,
      }));
      wrapper.setState({ checked: true });
      expect(spy).toBeCalledWith(false);
    });
    it("enables checkout if start and frequency are set", () => {
      const spy = jest.fn();
      const wrapper = mount(generateComponent({
        setCanCheckout: spy,
      }));
      wrapper.setState({ start: "now", frequency: "one-time" });
      expect(spy).toBeCalledWith(true);
    });
    it("disableds checkout if start or frequency are missing", () => {
      const spy = jest.fn();
      const wrapper = mount(generateComponent({
        setCanCheckout: spy,
      }));
      wrapper.setState({ start: "now" });
      wrapper.setState({ start: null });
      expect(spy).toBeCalledWith(false);

      wrapper.setState({ frequency: "now" });
      wrapper.setState({ frequency: null });
      expect(spy).toBeCalledWith(false);
    });
    it("unbinds the window listener on unmount", () => {
      const spy = jest.fn();
      const originalRemove = window.removeEventListener;
      window.removeEventListener = jest.fn(window.removeEventListener);
      const wrapper = mount(generateComponent());
      const { fixPickerPosition } = wrapper.instance();
      wrapper.unmount();
      expect(window.removeEventListener).toBeCalledWith("resize", fixPickerPosition);
      window.removeEventListener = originalRemove;
    });
  });

  describe("fixPickerPosition", () => {
    xit("does something? who even knows");
  });

  describe("toggleDatePicker", () => {
    it("toggles the state of the date picker", () => {
      const wrapper = mount(generateComponent());
      const { toggleDatePicker } = wrapper.instance();
      expect(wrapper.state().showDatePicker).toBe(false);
      toggleDatePicker();
      expect(wrapper.state().showDatePicker).toBe(true);
      toggleDatePicker();
      expect(wrapper.state().showDatePicker).toBe(false);
    });
    it("fixes the picker position", () => {
      const wrapper = mount(generateComponent());
      const { toggleDatePicker, fixPickerPosition } = wrapper.instance();
      wrapper.instance().fixPickerPosition = jest.fn(wrapper.fixPickerPosition);
      expect(wrapper.state().showDatePicker).toBe(false);
      toggleDatePicker();
      jest.runAllTimers();
      expect(wrapper.instance().fixPickerPosition).toBeCalled();
    });
  });

  describe("toggleSchedule", () => {
    it("sets checked true if not previously", () => {
      const wrapper = mount(generateComponent());
      const { toggleSchedule } = wrapper.instance();
      toggleSchedule();
      expect(wrapper.state().checked).toEqual(true);
    });
    it("resets a schedule", () => {
      const saveSchedule = jest.fn();
      const wrapper = mount(generateComponent({
        saveSchedule,
      }));
      const { toggleSchedule } = wrapper.instance();
      wrapper.setState({ checked: true });

      toggleSchedule();
      expect(saveSchedule).toBeCalledWith({
        frequency: null,
        start: null,
      });
    });
    it("resets the state and makes checked true", () => {
      const saveSchedule = jest.fn();
      const wrapper = mount(generateComponent({
        saveSchedule,
      }));
      const { toggleSchedule } = wrapper.instance();
      wrapper.setState({ checked: true });

      toggleSchedule();
      expect(wrapper.state()).toEqual({
        checked: false,
        start: null,
        frequency: null,
        showDatePicker: false,
      });
    });
  });

  describe("frequencyClick", () => {
    it("updates the state for frequency", () => {
      const wrapper = mount(generateComponent());
      const { frequencyClick } = wrapper.instance();
      frequencyClick("one-time");
      expect(wrapper.state().frequency).toEqual("one-time");
    });
    it("saves the schedule", () => {
      const saveSchedule = jest.fn();
      const wrapper = mount(generateComponent({ saveSchedule }));
      const { frequencyClick } = wrapper.instance();
      wrapper.setState({ start: "now" });
      frequencyClick("one-time");
      expect(saveSchedule).toBeCalledWith({
        frequency: "one-time",
        start: "now",
      });
    });
    it("removes the frequency", () => {
      const saveSchedule = jest.fn();
      const wrapper = mount(generateComponent({ saveSchedule }));
      const { frequencyClick } = wrapper.instance();
      wrapper.setState({ start: "now", frequency: "one-time" });
      frequencyClick("one-time");
      expect(saveSchedule).toBeCalledWith({
        frequency: null,
        start: "now",
      });
      expect(wrapper.state().frequency).toEqual(null);
    });
  });

  describe("startClick", () => {
    it("updates the state for start", () => {
      const wrapper = mount(generateComponent());
      const { startClick } = wrapper.instance();
      startClick("one-time");
      expect(wrapper.state().start).toEqual("one-time");
    });
    it("saves the schedule", () => {
      const saveSchedule = jest.fn();
      const wrapper = mount(generateComponent({ saveSchedule }));
      const { startClick } = wrapper.instance();
      wrapper.setState({ frequency: "one-time" });
      startClick("now");
      expect(saveSchedule).toBeCalledWith({
        frequency: "one-time",
        start: "now",
      });
    });
    it("removes the start", () => {
      const saveSchedule = jest.fn();
      const wrapper = mount(generateComponent({ saveSchedule }));
      const { startClick } = wrapper.instance();
      wrapper.setState({ start: "now", frequency: "one-time" });
      startClick("now");
      expect(saveSchedule).toBeCalledWith({
        frequency: "one-time",
        start: null,
      });
      expect(wrapper.state().start).toEqual(null);
    });
    it("toggles the date picker (true)", () => {
      const wrapper = mount(generateComponent());
      const { startClick } = wrapper.instance();
      startClick("custom");
      expect(wrapper.state().showDatePicker).toEqual(true);
    });
    it("removes the state when it was custom", () => {
      const saveSchedule = jest.fn();
      const wrapper = mount(generateComponent({ saveSchedule }));
      const { startClick } = wrapper.instance();
      wrapper.setState({ start: "custom", frequency: "one-time" });
      startClick("custom");
      expect(saveSchedule).toBeCalledWith({
        frequency: "one-time",
        start: null,
      });
      expect(wrapper.state().start).toEqual(null);
    });
    it("toggles the date picker (false)", () => {
      const wrapper = mount(generateComponent());
      const { startClick } = wrapper.instance();
      wrapper.setState({ showDatePicker: true });
      startClick("custom");
      expect(wrapper.state().showDatePicker).toEqual(false);
    });
  });

  describe("onDayClick", () => {
    it("early returns if disabled", () => {
      const wrapper = mount(generateComponent());
      const { onDayClick } = wrapper.instance();
      const originalState = wrapper.state();
      onDayClick(null, null, { disabled: true });
      expect(wrapper.state()).toEqual(originalState);
    });
    it("sets the start state", () => {
      const wrapper = mount(generateComponent());
      const { onDayClick } = wrapper.instance();
      onDayClick(null, "tuesday", { selected: false });
      expect(wrapper.state().start).toEqual("tuesday");
    });
  });
});
