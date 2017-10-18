
import DayPicker, { DateUtils } from "react-day-picker";
import DateStyles from "../../../@primitives/UI/forms/styles/date";

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
  formatDay: d => d.toDateString(),
};

type IDateProps = {
  start: string,
  onDayClick: Function,
  toggleDatePicker: Function,
  allTime: boolean,
};

export default ({
  start,
  onDayClick,
  toggleDatePicker,
  allTime,
}: IDateProps) => (
  <div>
    <DateStyles />
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
        }}
      >
        <DayPicker
          locale="en"
          localeUtils={localUtils}
          modifiers={{
            selected: day => DateUtils.isSameDay(start, day),
            disabled: day => (
              !allTime && (DateUtils.isPastDay(day) || DateUtils.isSameDay(day, new Date()))
            ),
          }}
          onDayClick={onDayClick}
        />
        <div className="background--light-secondary soft text-center">
          <button className="btn flush btn--small" onClick={toggleDatePicker}>Done</button>
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
        onClick={toggleDatePicker}
      />
      {/* eslint-enable */}
    </div>
  </div>
);
