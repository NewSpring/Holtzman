
import { Component, PropTypes } from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import Moment from "moment"
import ReactDOM from "react-dom"

import Input from "./Input"
import Styles from "./date.css"

console.log(Styles)

export default class Date extends Component {

  state = {
    showDatePicker: false,
    selectedDay: null
  }

  toggle = (e) => {
    this.setState({
      showDatePicker: !this.state.showDatePicker
    })
  }

  onDayClick = (e, day, modifiers) => {

    if (modifiers.indexOf("disabled") > -1) {
      return
    }

    this.setState({
      selectedDay: modifiers.indexOf("selected") > -1 ? null : day
    });
  }


  render () {

    const { selectedDay } = this.state

    let WEEKDAYS_SHORT = {
      "en": ["S", "M", "T", "W", "T", "F", "S"]
    }


    const localUtils = {
      formatWeekdayShort: (i, locale) => WEEKDAYS_SHORT[locale][i],
    }

    return (
      <span>
        <div style={{position: "relative"}}>
          <Input
            defaultValue={selectedDay && selectedDay.toLocaleDateString()}
            {...this.props}
            ref="input"
          />
        <div className="locked-ends locked-sides" onClick={this.toggle}></div>
        </div>


        {(()=>{
          if (this.state.showDatePicker) {
            return (
              <div>
                <DayPicker
                  locale="en"
                  localUtils={localUtils}
                  modifiers={{
                    selected: day => DateUtils.isSameDay(selectedDay, day),
                    disabled: DateUtils.isPastDay,
                  }}
                  onDayClick={this.onDayClick}
                  style={{
                    position: "absolute",
                    top: "30%",
                    zIndex: 999,
                    margin: "0 auto",
                    left: 0,
                    right: 0
                  }}
                />
                <div style={{
                  position: "fixed",
                  top: 0,
                  zIndex: 998,
                  backgroundColor: "rgba(0,0,0,.75)",
                  left: 0,
                  right: 0
                }}></div>
              </div>

            )
          }
        })()}
      </span>
    )
  }
}
