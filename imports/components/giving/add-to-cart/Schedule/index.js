
import { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { give as giveActions } from "../../../../data/store";

import Layout from "./Layout";

type IScheduleProps = {
  authorized: boolean,
  saveSchedule: Function,
  setCanCheckout: Function,
  preCheck: boolean,
  bindSubComponentReset: Function,
};

type IScheduleState = {
  checked: boolean;
  showDatePicker: boolean,
  start: string,
  frequency: string,
};

const GIVING_SCHEDULES = [
  { label: "One time", value: "One-Time" },
  { label: "Every Month", value: "Monthly" },
  { label: "Every Week", value: "Weekly" },
  { label: "Every 2 Weeks", value: "Bi-Weekly" },
];

const nextMonth = moment().endOf("Month").add(1, "days");
const START_DATES = [
  { label: "Tomorrow", value: moment().add(1, "days").toISOString() },
  { label: nextMonth.format("MMM D"), value: nextMonth.toISOString() },
  { label: "Custom", value: "custom" },
];


export class Schedule extends Component {

  props: IScheduleProps;
  state: IScheduleState;

  state = {
    checked: false,
    start: null,
    frequency: null,
    showDatePicker: false,
  }

  componentWillMount() {
    if (this.props.preCheck) this.setState({ checked: true });
    this.props.bindSubComponentReset(this.toggleSchedule);
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.fixPickerPosition);
    }
  }

  componentDidUpdate(_, { checked, start, frequency }) {
    if (this.state.checked && !checked) {
      this.props.setCanCheckout(false);
      return;
    }

    if (!this.state.checked && checked) {
      this.props.setCanCheckout(true);
      return;
    }

    if (
      (this.state.start && this.state.frequency) &&
      (!start || !frequency)
    ) {
      this.props.setCanCheckout(true);
      return;
    }

    if (
      (!this.state.start && start) ||
      (!this.state.frequency && frequency)
    ) {
      this.props.setCanCheckout(false);
      return;
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.fixPickerPosition);
    }
  }

  fixPickerPosition = () => {
    const picker = document.getElementById("datepicker");
    if (!picker) return;

    const child = picker.children[0];
    const globalTop = Number(child.getBoundingClientRect().top);
    if (globalTop < 0) {
      const marginTop = Number(child.style.marginTop.slice(0, -2));
      child.style.marginTop = `${marginTop + Math.abs(globalTop)}px`;
    }
  }

  toggleDatePicker = () => {
    this.setState(({ showDatePicker }) => ({ showDatePicker: !showDatePicker }));
    setTimeout(() => {
      this.fixPickerPosition();
    }, 200);
  }

  toggleSchedule = () => {
    this.setState(({ checked }) => {
      if (!checked) return { checked: true };

      this.props.saveSchedule({
        frequency: null,
        start: null,
      });

      return {
        frequency: null,
        start: null,
        checked: false,
      };
    });
  }

  /*
    if one is selected, and freqClick is called with the same one, disable it
    if one is selected, and freqClick is called with another one, SET THAT ONE
    if one is not selected, set it
  */
  frequencyClick = (value: string) => {
    let newValue = value;
    if (this.state.frequency === newValue) newValue = null;

    this.setState({ frequency: newValue });
    this.props.saveSchedule({
      frequency: newValue,
      start: this.state.start,
    });
  }

  startClick = (value: string) => {
    let newValue = value;
    if (this.state.start === newValue) newValue = null;

    if (this.state.start || value !== "custom") {
      this.setState({ start: newValue });
      this.props.saveSchedule({
        frequency: this.state.frequency,
        start: newValue,
      });
      return;
    }

    this.setState(({ showDatePicker }) => ({ showDatePicker: !showDatePicker }));
  }

  onDayClick = (e, day, { selected, disabled }) => {
    if (disabled) return;
    this.setState({ start: selected ? null : day });
    this.props.saveSchedule({
      frequency: this.state.frequency,
      start: day,
    });
  }

  render() {
    const { authorized } = this.props;
    if (!authorized) return null;
    const { checked, start, showDatePicker } = this.state;

    return (
      <Layout
        GIVING_SCHEDULES={GIVING_SCHEDULES}
        START_DATES={START_DATES}
        checked={checked}
        frequencyClick={this.frequencyClick}
        onDayClick={this.onDayClick}
        showDatePicker={showDatePicker}
        start={start}
        startClick={this.startClick}
        toggleDatePicker={this.toggleDatePicker}
        toggleSchedule={this.toggleSchedule}
      />
    );
  }
}

export const map = ({ routing: { location } }) => ({
  preCheck: location && location.query && location.query.schedule,
});

export const withGiveActions = connect(map, giveActions);

export default withGiveActions(Schedule);
