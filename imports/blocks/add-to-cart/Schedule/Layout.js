
import Checkbox from "../../../components/forms/Checkbox";
import TagSelect from "../../../components/forms/TagSelect";

import Date from "./Date";

type ILayoutProps = {
  GIVING_SCHEDULES: [Object],
  START_DATES: [Object],
  checked: boolean,
  frequencyClick: Function,
  onDayClick: Function,
  showDatePicker: boolean,
  start: string,
  startClick: Function,
  toggleDatePicker: Function,
  toggleSchedule: Function,
}

export default ({
  start,
  checked,
  GIVING_SCHEDULES,
  START_DATES,
  showDatePicker,
  toggleSchedule,
  frequencyClick,
  startClick,
  onDayClick,
  toggleDatePicker,
}: ILayoutProps) => (
  <div>
    <Checkbox
      name="schedule"
      classes={["soft-bottom"]}
      defaultValue={checked}
      clicked={toggleSchedule}
    >
      <span className="soft-half-top">Schedule This Contribution</span>
    </Checkbox>
    {checked && (
      <div>
        <div className="display-block soft-half-ends">
          <h7>Frequency</h7>
          <div className="display-block soft-half-top">
            <TagSelect items={GIVING_SCHEDULES} onClick={frequencyClick} />
          </div>
        </div>
        <div className="display-block soft-bottom">
          <h7>Start Date</h7>
          <div className="display-block soft-half-top">
            <TagSelect items={START_DATES} onClick={startClick} />
          </div>
        </div>
      </div>
    )}
    {showDatePicker && (
      <Date start={start} onDayClick={onDayClick} toggleDatePicker={toggleDatePicker} />
    )}
  </div>
);
