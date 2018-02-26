// @flow
import PropTypes from "prop-types";

import { Component } from "react";
import moment from "moment";

import TagSelect from "../../../components/@primitives/UI/forms/TagSelect";
import Tag from "../../../components/@primitives/UI/tags";
import Date from "../../../components/giving/add-to-cart/Schedule/Date";

const DATE_RANGES = [
  {
    label: moment()
      .subtract(1, "year")
      .format("Y"),
    value: "LastYear",
  },
  { label: "Last Month", value: "LastMonth" },
  { label: "Year To Date", value: "YearToDate" },
  { label: "All Time", value: "AllTime" },
];

const scheduleIcon = (
  <span className="icon-calendar push-half-left" style={{ position: "relative", top: "-2px" }} />
);

export default class Filter extends Component {
  static propTypes = {
    family: PropTypes.array.isRequired,
    filterTransactions: PropTypes.func.isRequired,
  };

  state = {
    customDateDisabled: false,
    customEndActive: false,
    customEndLabel: "End Date",
    customStartActive: false,
    customStartLabel: "Start Date",
    dateRangeActive: "",
    end: "",
    expanded: false,
    limit: 20,
    overrideActive: false,
    people: [],
    showEndDatePicker: false,
    showStartDatePicker: false,
    start: "",
  };

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.fixPickerPosition);
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.family.length !== nextProps.family.length) {
      this.setState({ people: nextProps.family.map(x => x.person.id) });
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.fixPickerPosition);
    }
  }

  onClick = ({ id }: Object) => {
    const people = [...this.state.people];
    const index = people.indexOf(id);
    if (index > -1) {
      people.splice(index, 1);
      this.setState({ people });
      return;
    }

    people.push(id);
    this.setState({ people });
  };

  toggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  dateRangeClick = (clickedValue: string) => {
    this.setState(({ /* start, end, limit, */ dateRangeActive }) => {
      // toggle values if clicked is same as current
      const value = dateRangeActive === clickedValue ? "" : clickedValue;

      let startDate;
      let endDate;
      let transactionLimit;

      if (value === "LastYear") {
        startDate = moment()
          .subtract(1, "year")
          .startOf("year");
        endDate = moment()
          .subtract(1, "year")
          .endOf("year");
      } else if (value === "LastMonth") {
        startDate = moment().subtract(30, "days");
        endDate = moment();
      } else if (value === "YearToDate") {
        startDate = moment().startOf("year");
        endDate = moment();
      } else if (value === "AllTime") {
        startDate = "";
        endDate = "";
        transactionLimit = 0;
      } else {
        // default
        startDate = "";
        endDate = "";
        transactionLimit = 20;
      }

      return {
        customDateDisabled: value !== "",
        dateRangeActive: value,
        end: endDate,
        limit: transactionLimit,
        start: startDate,
      };
    });
  };

  fixPickerPosition = () => {
    const interval = setInterval(() => {
      const picker = document.getElementById("datepicker");
      if (!picker) return;

      clearInterval(interval);
      const child = picker.children[0];
      const globalTop = Number(child.getBoundingClientRect().top);
      if (globalTop < 0) {
        const marginTop = Number(child.style.marginTop.slice(0, -2)) + 40;
        child.style.marginTop = `${marginTop + Math.abs(globalTop)}px`;
      }
    }, 50);
  };

  toggleStartDatePicker = () => {
    this.setState(({ showStartDatePicker }) => {
      if (!showStartDatePicker) this.fixPickerPosition();
      return { showStartDatePicker: !showStartDatePicker };
    });
  };

  toggleEndDatePicker = () => {
    this.setState(({ showEndDatePicker }) => {
      if (!showEndDatePicker) this.fixPickerPosition();
      return { showEndDatePicker: !showEndDatePicker };
    });
  };

  startClick = (value: string) => {
    if (value === "StartDate") {
      this.setState(({ start, end, showStartDatePicker, overrideActive }) => {
        if (start !== "") {
          const newState = {
            start: "",
            customStartLabel: "Start Date",
            customStartActive: false,
            overrideActive,
          };

          if (end === "") newState.overrideActive = false;

          return newState;
        }

        if (!showStartDatePicker) this.fixPickerPosition();
        return {
          showStartDatePicker: !showStartDatePicker,
        };
      });
    }

    if (value === "EndDate") {
      this.setState(({ end, start, showEndDatePicker, overrideActive }) => {
        if (end !== "") {
          const newState = {
            end: "",
            customEndLabel: "End Date",
            customEndActive: false,
            overrideActive,
          };

          if (start === "") newState.overrideActive = false;

          return newState;
        }

        if (!showEndDatePicker) this.fixPickerPosition();
        return {
          showEndDatePicker: !showEndDatePicker,
        };
      });
    }
  };

  onStartDayClick = (e: Event, day: string, { selected, disabled }: Object) => {
    if (disabled) return;
    this.setState({
      start: selected ? "" : day,
      customStartLabel: selected ? "Start Date" : moment(day).format("ll"),
      customStartActive: !selected,
      overrideActive: !selected,
    });
  };

  onEndDayClick = (e: Event, day: string, { selected, disabled }: Object) => {
    if (disabled) return;
    this.setState({
      end: selected ? "" : day,
      customEndLabel: selected ? "End Date" : moment(day).format("ll"),
      customEndActive: !selected,
      overrideActive: !selected,
    });
  };

  filterResults = () => {
    this.props.filterTransactions({
      people: this.state.people,
      start: !this.state.start ? "" : moment(this.state.start).format("L"),
      end: !this.state.end ? "" : moment(this.state.end).endOf("day"),
      limit: this.state.limit,
    });
    this.toggle();
  };

  render() {
    const { family } = this.props;
    const { expanded } = this.state;

    return (
      <div style={{ position: "relative" }}>
        <div
          onClick={this.toggle}
          className={
            "one-whole background--light-primary " +
            "soft-half-ends soft-sides soft-double-sides@lap-and-up"
          }
        >
          <h7 className="text-dark-secondary flush-bottom push-half-left display-inline-block">
            Filter Transactions
          </h7>
          <span
            className={`float-right flush ${expanded ? "icon-close" : "icon-filter"}`}
            style={{ marginTop: expanded ? "0px" : "0px", cursor: "pointer" }}
          />
        </div>
        <div className="one-whole outlined--bottom outlined--light" />
        {expanded && (
          <div
            className={
              "one-whole outlined--light outlined--bottom background--light-primary " +
              "soft-half-ends soft-sides soft-double-sides@lap-and-up push-half-left"
            }
          >
            {family &&
              family.length > 1 && (
                <div>
                  <h7 className="push-top text-dark-secondary display-inline-block">
                    Family Members
                  </h7>

                  {family.map(({ person }, key) => {
                    const active = this.state.people.indexOf(person.id) > -1;
                    return (
                      <div
                        key={key}
                        style={{ cursor: "pointer" }}
                        className=""
                        onClick={() => this.onClick(person)}
                      >
                        <div
                          className={
                            `${active ? "checkbox-checked" : ""} ` +
                            "display-inline-block outlined checkbox"
                          }
                        />
                        <h6 className="soft-half-left display-inline-block">
                          {person.nickName || person.firstName} {person.lastName}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              )}

            <h7 className="soft-half-top push-half-top text-dark-secondary display-inline-block">
              Date Range
            </h7>
            <div className="grid one-whole flush-left@palm">
              <div className={"hard-left@palm grid__item one-whole"}>
                <TagSelect
                  items={DATE_RANGES}
                  onClick={this.dateRangeClick}
                  overrideActive={this.state.overrideActive}
                  currentActive={this.state.dateRangeActive}
                />
              </div>
            </div>

            <h7 className="soft-half-top push-half-top text-dark-secondary display-inline-block">
              Custom Dates
            </h7>
            <div className="grid one-whole flush-left@palm">
              <div className={"hard-left@palm grid__item one-whole display-inline-block"}>
                <Tag
                  key={1}
                  label={this.state.customStartLabel}
                  val={"StartDate"}
                  onClick={this.startClick}
                  active={
                    this.state.customStartLabel !== "Start Date" && this.state.customStartActive
                  }
                  className={this.state.customDateDisabled && "tag--disabled"}
                  icon={
                    this.state.customStartLabel === "Start Date" &&
                    !this.state.showStartDatePicker &&
                    !this.state.customStartActive &&
                    scheduleIcon
                  }
                  clickAble={!this.state.dateRangeActive}
                />
                <Tag
                  key={2}
                  label={this.state.customEndLabel}
                  val={"EndDate"}
                  onClick={this.startClick}
                  active={this.state.customEndLabel !== "End Date" && this.state.customEndActive}
                  className={this.state.customDateDisabled && "tag--disabled"}
                  icon={
                    this.state.customEndLabel === "End Date" &&
                    !this.state.showEndDatePicker &&
                    !this.state.customEndActive &&
                    scheduleIcon
                  }
                  clickAble={!this.state.dateRangeActive}
                />
              </div>
            </div>
            <div className="push-top">
              <button className={"btn one-whole@handheld"} onClick={this.filterResults}>
                {"Filter Results"}
              </button>
            </div>
            {/* eslint-disable */}
            {this.state.showStartDatePicker && (
              <Date
                start={this.state.start}
                onDayClick={this.onStartDayClick}
                toggleDatePicker={this.toggleStartDatePicker}
                allTime={true}
              />
            )}
            {this.state.showEndDatePicker && (
              <Date
                start={this.state.end}
                onDayClick={this.onEndDayClick}
                toggleDatePicker={this.toggleEndDatePicker}
                allTime={true}
              />
            )}
            {/* eslint-enable */}
          </div>
        )}
      </div>
    );
  }
}
