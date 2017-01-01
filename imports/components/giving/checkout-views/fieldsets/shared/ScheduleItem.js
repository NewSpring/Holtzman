// @flow
import moment from "moment";
import { monetize } from "../../../../../util/format";

type IScheduleItem = {
  schedule: Object,
  total: number,
};

const ScheduleItem = ({ schedule, total }: IScheduleItem) => (
  <div className="display-inline-block one-whole">
    <h5 className="text-dark-secondary text-left">
      Starting on {moment(schedule.start).format("MMM D, YYYY")},
      I will give <span className="text-primary"> {monetize(total)} </span>
      to {schedule.label}.
      This will occur {schedule.frequency.toLowerCase()}.
    </h5>
  </div>
);

export default ScheduleItem;
