
import { Component } from "react";
import moment from "moment";

import Checkbox from "../../../components/forms/Checkbox";
import Tag from "../../../components/tags";

type IScheduleProps = {
  authorized: boolean,
};

type IScheduleState = {
  checked: boolean;
};

const GIVING_SCHEDULES = [
  { label: "One time", value: "One-Time" },
  { label: "Every Month", value: "Monthly" },
  { label: "Every Week", value: "Weekly" },
  { label: "Every 2 Weeks", value: "Bi-Weekly" },
];

const nextMonth = moment().endOf("Month").add(1, "days");
const START_DATES = [
  { label: "Tomorrow", value: moment().add(1, "days") },
  { label: nextMonth.format("MMM D"), value: nextMonth },
  { label: "Custom", value: "" },
];

class Schedule extends Component {

  props: IScheduleProps;
  state: IScheduleState;

  state = {
    checked: false,
  }

  render() {
    const { authorized } = this.props;
    if (!authorized) return null;
    const { checked } = this.state;
    return (
      <div>
        <Checkbox
          name="schedule"
          classes={["soft-bottom"]}
          defaultValue={checked}
          clicked={() => { this.setState({ checked: !checked }); }}
        >
          <span className="soft-half-top">Schedule This Contribution</span>
        </Checkbox>
        {checked && (
          <div>
            <div className="display-block soft-half-ends">
              <h7>Frequency</h7>
              <div className="display-block soft-half-top">
                {GIVING_SCHEDULES.map(({ label, value }, key) => (
                  <Tag val={value} label={label} key={key} />
                ))}
              </div>
            </div>
            <div className="display-block soft-bottom">
              <h7>Start Date</h7>
              <div className="display-block soft-half-top">
                {START_DATES.map(({ label, value }, key) => (
                  <Tag val={value} label={label} key={key} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Schedule;
