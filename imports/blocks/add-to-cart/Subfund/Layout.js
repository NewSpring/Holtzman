
// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { css } from "aphrodite";

import Forms from "../../../components/forms";
import Styles from "../../add-schedule/styles-css";

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
    <div className={`display-inline-block push-half-bottom h3 push-half-right ${active ? "text-dark-tertiary" : "text-light-tertiary"}`}>
      and give to
    </div>

    <Forms.Select
      classes={["soft-bottom", "display-inline-block", `${css(Styles.select)}`]}
      inputClasses={`${active ? "text-dark-tertiary" : "text-light-tertiary"} outlined--dotted outlined--light h3 hard-top flush-bottom`}
      items={accounts}
      onChange={changeFund}
      placeholder="select fund"
      selected={fundId}
      deselect
      hideLabel
      includeBlank
    />

    {active && (
      <div className="display-block">
        <h3 className={`${active ? "text-dark-tertiary" : "text-light-tertiary"} push-half-bottom push-half-right display-inline-block`}>
          with
        </h3>
        <Forms.Input
          classes={["soft-bottom", "input--active", "display-inline-block"]}
          defaultValue={preFill(fundId)}
          format={changeAmount}
          hideLabel
          inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${css(Styles["show-placeholder"])}`}
          placeholder="$0.00"
          style={{ maxWidth: "150px" }}
          type={Meteor.isCordova ? "text" : "tel"}
          value={inputVal}
        />
      </div>
    )}
  </div>
);

export default Layout;
