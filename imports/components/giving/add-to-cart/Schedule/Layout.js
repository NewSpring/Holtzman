
import Checkbox from "../../../@primitives/UI/forms/Checkbox";
import TagSelect from "../../../@primitives/UI/forms/TagSelect";

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
  GIVING_SCHEDULES,
  START_DATES,
  checked,
  frequencyClick,
  onDayClick,
  showDatePicker,
  start,
  startClick,
  toggleDatePicker,
  toggleSchedule,
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
        <div id="frequency" className="display-block soft-half-ends">
          <h7>Frequency</h7>
          <div className="display-block soft-half-top">
            <TagSelect items={GIVING_SCHEDULES} onClick={frequencyClick} />
          </div>
        </div>
        <div id="start" className="display-block soft-bottom">
          <h7>Start Date</h7>
          <div className="display-block soft-half-top">
            <TagSelect items={START_DATES} onClick={startClick} />
          </div>
        </div>
      </div>
    )}
    {checked && showDatePicker && (
      <Date start={start} onDayClick={onDayClick} toggleDatePicker={toggleDatePicker} />
    )}
  </div>
);
