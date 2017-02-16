// @flow

import Moment from "moment";
import { css } from "aphrodite";
import { Component } from "react";

import TertiaryPhrase from "./phrases";
import Forms from "../../@primitives/UI/forms";
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
  dataId: string | number,
};

// this definition of Layout works
class Layout extends Component {

  props: ILayout;

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
      dataId,
    } = this.props;

/* end flip flop comment section */
    const formClasses = [
      "flush-bottom",
      "h3",
      "hard-top",
      "outlined--dotted",
      "outlined--light",
    ];

    let disableCheckout = false;
    if (!total || total <= 0 || !ready) {
      disableCheckout = true;
    }

    if (!accounts || accounts.length === 0) {
      return null;
    }

    let prefillFund = accounts[0].value;
    if (existing && existing.details && existing.details.length && existing.details[0].account) {
      prefillFund = existing.details[0].account.id;
    }

    // require the user to choose a date instead of assuming current day
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
            text="I'd like to give&nbsp;"
          />
          <Forms.Input
            id={state.fundId || -1}
            name={state.fundLabel || "primary-account"}
            hideLabel
            type={Meteor.isCordova ? "text" : "tel"}
            ref="primary-account"
            classes={["soft-bottom", "input--active", "display-inline-block"]}
            inputClasses={`${formClasses.join(" ")} text-dark-primary ${css(Styles["show-placeholder"])}`}
            placeholder="$0.00"
            validate={save}
            format={format}
            style={{ width: "200px" }}
            defaultValue={formInputDefaultValue}
          />
          <TertiaryPhrase
            text="to&nbsp;"
          />
          <Forms.Select
            items={accounts}
            name="select-account"
            id={"select"}
            hideLabel
            ref="select-account"
            classes={["soft-bottom", "display-inline-block", css(Styles.select)]}
            inputClasses={`${formClasses.join(" ")} text-light-tertiary`}
            placeholder="select fund here"
            onChange={setFund}
            defaultValue={prefillFund}
          />
          <TertiaryPhrase
            text="&nbsp;"
          />
          <Forms.Select
            items={schedules}
            name="schedules"
            id={"schedules"}
            hideLabel
            ref="schedules"
            classes={["soft-bottom", "display-inline-block", css(Styles.select)]}
            inputClasses={`${formClasses.join(" ")} text-light-tertiary`}
            includeBlank
            placeholder="choose frequency"
            onChange={setFrequency}
            defaultValue={formSelectDefaultValue}
          />
          <TertiaryPhrase
            text="&nbsp;starting&nbsp;"
          />
          <Forms.Date
            id="start-date"
            name="start-date"
            hideLabel
            ref="start-date"
            classes={["soft-bottom", "input--active", "display-inline-block"]}
            inputClasses={`${formClasses.join(" ")} text-dark-primary ${css(Styles["show-placeholder"])}`}
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
              text={text || "Review Schedule"}
              dataId={dataId}
              disabledGuest
            />
          </div>
        </Forms.Form>
      </div>
    );
  }
}

export default Layout;
