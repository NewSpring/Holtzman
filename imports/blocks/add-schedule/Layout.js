// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";
import Moment from "moment";
import { css } from "aphrodite/no-important";

import TertiaryPhrase from "./phrases";
import Forms from "../../components/forms";
import CheckoutButtons from "../checkout-buttons";
import Styles from "./styles-css";

type ILayout = {
    schedules: Object[],
    save: Function,
    accounts: Object[],
    setFund: Function,
    state: Object,
    format: Function,
    total: number, // | string,
    saveDate: Function,
    setFrequency: Function,
    existing: string,
    ready: bool | string,
    text: string,
    prefillFund: Object,
    defaultDate: string,
    onSubmitSchedule: Function,
};

const Layout = ({
  state,
  save,
  format,
  existing,
  accounts,
  setFund,
  prefillFund,
  schedules,
  setFrequency,
  saveDate,
  defaultDate,
  total,
  ready,
  text,
  onSubmitSchedule,
}: ILayout): Object =>
  // if (!total) {
  //   total = 0;
  // }

  // let prefillFund = accounts[0].value;
  // if (existing && existing.details && existing.details.length && existing.details[0].account) {
  //   prefillFund = existing.details[0].account.id;
  // }

  // // let defaultDate = Moment().add(1, "days")
  // let defaultDate;
  // if (existing && existing.next && new Date(existing.next) > new Date()) {
  //   defaultDate = new Date(existing.next);
  // }

   (
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
           defaultValue={existing && existing.details && existing.details.length && existing.details[0].amount ? `$${existing.details[0].amount}` : null}
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
           defaultValue={existing && existing.schedule ? existing.schedule.value : null}
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
             disabled={total <= 0 || !ready}
             onClick={onSubmitSchedule}
             text={text || "Schedule Now"}
           />
         </div>
       </Forms.Form>
     </div>
  )
;

export default Layout;
