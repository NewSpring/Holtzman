
// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { css } from "aphrodite";

import Forms from "../../../@primitives/UI/forms";
import Styles from "../styles-css";

type ILayout = {
  accounts: Object,
  active: boolean,
  changeAmount: Function,
  changeFund: Function,
  fundId: number,
  inputVal: string,
  preFill: Function,
}

const Layout = ({
  accounts,
  active,
  changeAmount,
  changeFund,
  fundId,
  inputVal,
  preFill,
}: ILayout) => (
  <div>
    <div className="display-inline-block push-half-bottom h3 push-half-right text-dark-primary">
      and give
    </div>

    <Forms.Input
      classes={["soft-bottom", "input--active", "display-inline-block"]}
      defaultValue={preFill(fundId)}
      format={changeAmount}
      hideLabel
      inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-brand ${css(Styles["show-placeholder"])}`}
      placeholder="$0.00"
      style={{ maxWidth: "150px" }}
      type={Meteor.isCordova ? "text" : "tel"}
      value={inputVal}
    />

    <div className="display-block">
      <h3 className="text-dark-primary push-half-bottom push-half-right display-inline-block">
        to
      </h3>
      <Forms.Select
        classes={["soft-bottom", "display-inline-block", `${css(Styles.select)}`]}
        inputClasses={`${active ? "text-brand" : "text-dark-tertiary"} outlined--dotted outlined--light h3 hard-top flush-bottom`}
        items={accounts}
        defaultValue={accounts[0].value}
        onChange={changeFund}
        placeholder="select fund"
        selected={fundId}
        hideLabel
        includeBlank
      />
    </div>
  </div>
);

export default Layout;
