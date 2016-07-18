import { Component, PropTypes} from "react"
import Moment from "moment"
import { css } from "aphrodite";

import { Forms, Loading } from "../../../core/components"
import GiveNow from "../ActionButtons"
import Styles from "./styles-css"

export default class Layout extends Component {

  render () {

    let {
      schedules,
      setFrequency,
      accounts,
      setFund,
      state,
      save,
      format,
      total,
      saveDate,
      existing,
      date,
      ready,
    } = this.props;

    total || (total = 0)

    let prefillFund = accounts[0].value
    if (existing && existing.details && existing.details.length && existing.details[0].account) {
      prefillFund = existing.details[0].account.id
    }

    // let defaultDate = Moment().add(1, "days")
    let defaultDate;
    if (existing && existing.next && new Date(existing.next) > new Date()) {
      defaultDate = new Date(existing.next)
    }

    return (
      <div className="push-top@handheld soft-half-top@lap-and-up">
        <Forms.Form
          classes={["text-left", "hard"]}
          submit={(e) => {e.preventDefault()}}
          id="add-to-cart"
        >

          <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
            I'd like to give &nbsp;
          </h3>
          <Forms.Input
            id={state.fundId || -1}
            name={state.fundLabel || "primary-account"}
            hideLabel={true}
            ref="primary-account"
            classes={["soft-bottom", "input--active", "display-inline-block"]}
            inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${css(Styles["show-placeholder"])}`}
            placeholder="$0.00"
            validate={save}
            format={format}
            style={{width: "200px"}}
            defaultValue={existing && existing.details && existing.details.length && existing.details[0].amount ? "$" + existing.details[0].amount : null}

          />
          <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
            to&nbsp;
          </h3>
          <Forms.Select
            items={accounts}
            name="select-account"
            id={`select`}
            hideLabel={true}
            ref="select-account"
            classes={["soft-bottom", "display-inline-block", css(Styles.select)]}
            inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-light-tertiary`}
            placeholder="select fund here"
            onChange={setFund}
            defaultValue={prefillFund}
          />
          <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
            &nbsp;
          </h3>
          <Forms.Select
            items={schedules}
            name="schedules"
            id={`schedules`}
            hideLabel={true}
            ref="schedules"
            classes={["soft-bottom", "display-inline-block", css(Styles.select)]}
            inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-light-tertiary`}
            includeBlank={true}
            placeholder="choose frequency"
            onChange={setFrequency}
            defaultValue={existing && existing.schedule ? existing.schedule.value : null}
          />
          <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
            &nbsp; starting &nbsp;
          </h3>

          <Forms.Date
            id="start-date"
            name="start-date"
            hideLabel={true}
            ref="start-date"
            classes={["soft-bottom", "input--active", "display-inline-block"]}
            inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${css(Styles["show-placeholder"])}`}
            placeholder="select date"
            past={false}
            today={false}
            format={(value) => (Moment(value).format("MMM D, YYYY"))}
            validation={saveDate}
            defaultValue={defaultDate}
          />

          <div className="push-top">
            <GiveNow
              disabled={total <= 0 || !ready}
              disabledGuest={true}
              text={this.props.text || "Schedule Now"}
              onClick={this.props.onSubmitSchedule}
              dataId={this.props.dataId}
            />
          </div>

        </Forms.Form>
      </div>
    )
  }
}
