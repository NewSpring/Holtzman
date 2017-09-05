
// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { css } from "aphrodite";

import Forms from "../../../@primitives/UI/forms";
import Styles from "../styles-css";

type IPrimary = {
  active: boolean,
  fundId: string,
  accounts: Object,
  preFill: Function,
  changeFund: Function,
  changeAmount: Function,
}

const Primary = ({ active, fundId, accounts, preFill, changeFund, changeAmount }: IPrimary) => (
  <div>
    <h3 className="text-dark-primary display-inline-block push-half-bottom push-half-right">
      I&#39;d like to give
    </h3>

    <Forms.Input
      hideLabel
      type={Meteor.isCordova ? "number" : "tel"}
      classes={["soft-bottom", "input--active", "display-inline-block"]}
      inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-brand ${css(Styles["show-placeholder"])}`}
      placeholder="$0.00"
      format={changeAmount}
      defaultValue={preFill(fundId)}
      style={{ maxWidth: "150px" }}
    />

    <h3 className={"text-dark-primary display-inline-block push-half-bottom push-half-right"}>
      to
    </h3>
    {/* temporary hack */}
    <style>{".input--active select { color: #6bac43 }"}</style>
    <Forms.Select
      items={accounts}
      name="select-account"
      hideLabel
      classes={["soft-bottom", "display-inline-block", css(Styles.select)]}
      inputClasses={`${active ? "text-primary" : "text-dark-tertiary"} outlined--dotted outlined--light h3 hard-top flush-bottom`}
      placeholder="select fund"
      onChange={changeFund}
      selected={fundId}
    />
  </div>
);

export default Primary;
