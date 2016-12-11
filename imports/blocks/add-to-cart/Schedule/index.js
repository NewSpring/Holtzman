
import { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { give as giveActions } from "../../../store";

import Layout from "./Layout";

type IScheduleProps = {
  authorized: boolean,
  saveSchedule: Function
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


class Schedule extends Component {

  props: IScheduleProps;
  state: IScheduleState;

  state = {
    checked: false,
    start: null,
    frequency: null,
    showDatePicker: false,
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.fixPickerPosition);
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
    this.setState(({ showDatePicker, start }) => {
      const newState = { showDatePicker: !showDatePicker };
      // if (!start) {
      //   console.log("how do i make the toggle reset?");
      // }
      return newState;
    });
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

  frequencyClick = (value: string) => {
    this.setState({ frequency: value });
    this.props.saveSchedule({
      frequency: value,
      start: this.state.start,
    });
  }

  startClick = (value: string) => {
    if (value !== "custom") {
      this.setState({ start: value });
      this.props.saveSchedule({
        frequency: this.state.frequency,
        start: value,
      });
      return;
    }

    if (this.state.start) {
      this.setState({ start: null });
    } else {
      this.setState(({ showDatePicker }) => ({ showDatePicker: !showDatePicker }));
    }
  }

  onDayClick = (e, day, { selected, disabled }) => {
    if (disabled) return;
    this.setState({ start: selected ? null : day });
  }

  render() {
    const { authorized } = this.props;
    if (!authorized) return null;
    const { checked, start } = this.state;

    return (
      <Layout
        GIVING_SCHEDULES={GIVING_SCHEDULES}
        START_DATES={START_DATES}
        checked={checked}
        frequencyClick={this.frequencyClick}
        onDayClick={this.onDayClick}
        showDatePicker={this.showDatePicker}
        start={start}
        startClick={this.startClick}
        toggleDatePicker={this.toggleDatePicker}
        toggleSchedule={this.toggleSchedule}
      />
    );
  }
}

const withGiveActions = connect(null, giveActions);

export default withGiveActions(Schedule);
