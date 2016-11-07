
// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { css } from "aphrodite";

import Forms from "../../../components/forms";
import Styles from "../../add-schedule/styles-css";

type IPrimary = {
  classes: string,
  accounts: Object,
  state: Object,
  preFill: Function,
  saveFund: Function,
  format: Function,
  selectVal: Function,
}

const Primary = ({ classes, accounts, state, preFill, saveFund, format, selectVal }: IPrimary) => (
  <div>
    <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
      I&#39;d like to give
    </h3>

    <Forms.Input
      id={state.id || "secondary-account"}
      name={state.fund || "secondary-account"}
      hideLabel
      type={Meteor.isCordova ? "text" : "tel"}
      classes={["soft-bottom", "input--active", "display-inline-block"]}
      inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${css(Styles["show-placeholder"])}`}
      placeholder="$0.00"
      format={format}
      defaultValue={preFill(state.id)}
      style={{ maxWidth: "150px" }}
    />

    <h3 className={"text-dark-tertiary display-inline-block push-half-bottom push-half-right"}>
      to
    </h3>

    <Forms.Select
      items={accounts}
      name="select-account"
      id={`${state.id}_select`}
      hideLabel
      classes={["soft-bottom", "display-inline-block", css(Styles.select)]}
      inputClasses={`${classes || ""} outlined--dotted outlined--light h3 hard-top flush-bottom`}
      placeholder="select fund"
      onChange={saveFund}
      selected={selectVal}
      defaultValue={accounts.length === 1 ? accounts[0].value : null}
    />
  </div>
);

export default Primary;
