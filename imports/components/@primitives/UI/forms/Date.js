
import PropTypes from 'prop-types';
import { Component } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
// import Moment from "moment";
// import ReactDOM from "react-dom";

import Input from "./Input";
// global styles
import Styles from "./styles/date";


export default class DateComponent extends Component {

  static propTypes = {
    format: PropTypes.func,
    defaultValue: PropTypes.string,
    today: PropTypes.bool,
    past: PropTypes.bool,
  };

  state = {
    showDatePicker: false,
    selectedDay: null,
  }

  componentDidMount() {
    window.addEventListener("resize", this.fixPickerPosition);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.fixPickerPosition);
  }

  onDayClick = (e, day, { selected, disabled }) => {
    if (disabled) return;
    this.setState({ selectedDay: selected ? null : day });
  }

  fixPickerPosition = () => {
    const picker = document.getElementById("datepicker");
    if (picker) {
      const child = picker.children[0];
      const globalTop = Number(child.getBoundingClientRect().top);
      if (globalTop < 0) {
        const marginTop = Number(child.style.marginTop.slice(0, -2));
        child.style.marginTop = `${marginTop + Math.abs(globalTop)}px`;
      } else {
        child.style.marginTop = "-250px";
      }
    }
  }

  toggle = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
    setTimeout(() => {
      this.fixPickerPosition();
    }, 200);
  }


  render() {
    const { selectedDay } = this.state;

    const WEEKDAYS_LONG = {
      en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    };
    const MONTHS = {
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    };
    const WEEKDAYS_SHORT = {
      en: ["S", "M", "T", "W", "T", "F", "S"],
    };


    const localUtils = {
      formatMonthTitle: (d, locale) => `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`,
      formatWeekdayShort: (i, locale) => WEEKDAYS_SHORT[locale][i],
      formatWeekdayLong: (i, locale) => WEEKDAYS_LONG[locale][i],
      getFirstDayOfWeek: () => 0,
      formatDay: (d) => d.toDateString(),
    };

    let formattedDay = selectedDay && selectedDay.toLocaleDateString();
    if (this.props.format && selectedDay) {
      formattedDay = this.props.format(selectedDay);
    }

    if (!selectedDay && this.props.defaultValue) {
      formattedDay = this.props.format(this.props.defaultValue);
    }


    return (
      <div className="display-inline-block" style={{ position: "relative" }}>
        <Styles />
        <div style={{ position: "relative" }}>
          <Input
            {...this.props}
            defaultValue={formattedDay}
            ref="input"
          />
          {/* eslint-disable */}
          <div className="locked-ends locked-sides" onClick={this.toggle} />
          {/* eslint-enable */}
        </div>


        {(() => {
          if (this.state.showDatePicker) {
            return (
              <div id="datepicker">
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    zIndex: 999,
                    margin: "0 auto",
                    left: 0,
                    right: 0,
                    maxWidth: "300px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "-250px",
                  }}
                >
                  <DayPicker
                    locale="en"
                    localeUtils={localUtils}
                    modifiers={{
                      selected: (day) => DateUtils.isSameDay(selectedDay, day),
                      disabled: (day) =>
                        (
                          (this.props.past === false && DateUtils.isPastDay(day)) ||
                          (this.props.today === false && DateUtils.isSameDay(day, new Date()))
                        )
                      ,
                    }}
                    onDayClick={this.onDayClick}
                  />
                  <div className="background--light-secondary soft text-center">
                    <button className="btn flush btn--small" onClick={this.toggle}>Done</button>
                  </div>
                </div>

                {/* eslint-disable */}
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    zIndex: 998,
                    backgroundColor: "rgba(0,0,0,.75)",
                    left: 0,
                    right: 0,
                  }}
                  onClick={this.toggle}
                />
                {/* eslint-enable */}
              </div>

            );
          }
          return undefined;
        })()}
      </div>
    );
  }
}
