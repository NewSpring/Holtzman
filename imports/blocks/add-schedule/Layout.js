// $FlowMeteor
import { Meteor } from "meteor/meteor";
import Moment from "moment";
import { css } from "aphrodite";
import { Component, PropTypes } from "react";

import TertiaryPhrase from "./phrases";
import Forms from "../../components/forms";
import CheckoutButtons from "../checkout-buttons";
import Styles from "./styles-css";

type ILayout = {
    accounts: Object[],
    existing: Object,
    format: Function,
    onSubmitSchedule: Function,
    ready: boolean,
    save: Function,
    saveDate: Function,
    schedules: Object[],
    setFrequency: Function,
    setFund: Function,
    state: Object,
    text: string,
    total: number,
};

// this definition of Layout doesn't work
// const Layout = ({
//   accounts,
//   existing,
//   format,
//   onSubmitSchedule,
//   ready,
//   save,
//   saveDate,
//   schedules,
//   setFrequency,
//   setFund,
//   state,
//   text,
//   total,
// }: ILayout) => {

// this definition of Layout works
class Layout extends Component {

  static propTypes: ILayout;

  render() {
    const {
      accounts,
      existing,
      format,
      onSubmitSchedule,
      ready,
      save,
      saveDate,
      schedules,
      setFrequency,
      setFund,
      state,
      text,
      total,
    } = this.props;

/* end flip flop comment section */

    let disableCheckout = false;
    if (!total || total <= 0 || !ready) {
      disableCheckout = true;
    }

    let prefillFund = accounts[0].value;
    if (existing && existing.details && existing.details.length && existing.details[0].account) {
      prefillFund = existing.details[0].account.id;
    }

      // XXX: this was already commented out, should it be?
      // let defaultDate = Moment().add(1, "days")
    let defaultDate = null;
    if (existing && existing.next && new Date(existing.next) > new Date()) {
      defaultDate = new Date(existing.next);
    }

    let formInputDefaultValue = null;
    if (existing && existing.details && existing.details.length && existing.details[0].amount) {
      formInputDefaultValue = `$${existing.details[0].amount}`;
    }

    let formSelectDefaultValue = null;
    if (existing && existing.schedule) {
      formSelectDefaultValue = existing.schedule.value;
    }

    return (
      <div className="push-top@handheld soft-half-top@lap-and-up">
        <Forms.Form
          classes={["text-left", "hard"]}
          submit={(e) => { e.preventDefault(); }}
          id="add-to-cart"
        >
          <TertiaryPhrase
            additionalClasses="push-half-right"
            text="I'd like to give "
          />
          <Forms.Input
            id={state.fundId || -1}
            name={state.fundLabel || "primary-account"}
            hideLabel
            type={Meteor.isCordova ? "text" : "tel"}
            ref="primary-account"
            classes={["soft-bottom", "input--active", "display-inline-block"]}
            inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${css(Styles["show-placeholder"])}`}
            placeholder="$0.00"
            validate={save}
            format={format}
            style={{ width: "200px" }}
            defaultValue={formInputDefaultValue}
          />
          <TertiaryPhrase
            text="to "
          />
          <Forms.Select
            items={accounts}
            name="select-account"
            id={"select"}
            hideLabel
            ref="select-account"
            classes={["soft-bottom", "display-inline-block", css(Styles.select)]}
            inputClasses={"outlined--dotted outlined--light h3 hard-top flush-bottom text-light-tertiary"}
            placeholder="select fund here"
            onChange={setFund}
            defaultValue={prefillFund}
          />
          <TertiaryPhrase
            text=" "
          />
          <Forms.Select
            items={schedules}
            name="schedules"
            id={"schedules"}
            hideLabel
            ref="schedules"
            classes={["soft-bottom", "display-inline-block", css(Styles.select)]}
            inputClasses={"outlined--dotted outlined--light h3 hard-top flush-bottom text-light-tertiary"}
            includeBlank
            placeholder="choose frequency"
            onChange={setFrequency}
            defaultValue={formSelectDefaultValue}
          />
          <TertiaryPhrase
            text=" starting "
          />
          <Forms.Date
            id="start-date"
            name="start-date"
            hideLabel
            ref="start-date"
            classes={["soft-bottom", "input--active", "display-inline-block"]}
            inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${css(Styles["show-placeholder"])}`}
            placeholder="select date"
            past={false}
            today={false}
            format={value => (Moment(value).format("MMM D, YYYY"))} // eslint-disable-line
            validation={saveDate}
            defaultValue={defaultDate}
          />
          <div className="push-top">
            <CheckoutButtons
              disabled={disableCheckout}
              onClick={onSubmitSchedule}
              text={text || "Schedule Now"}
            />
          </div>
        </Forms.Form>
      </div>
    );
  }
}

export default Layout;
