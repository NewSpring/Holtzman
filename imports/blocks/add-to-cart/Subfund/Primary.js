import { PropTypes } from "react";
import { css } from "aphrodite";

import Forms from "../../../components/forms";
import Styles from "../../add-schedule/styles-css";

//
const Primary = ({ classes, accounts, state, preFill, saveFund, format, selectVal }) => (
  <div>
    <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
      I'd like to give
    </h3>

    <Forms.Input
      id={state.id || "secondary-account"}
      name={state.fund || "secondary-account"}
      hideLabel
      type="tel"
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

    {(() => (
      // if (accounts.length > 1) {
      <Forms.Select
        items={accounts}
        name="select-account"
        id={`${state.id}_select`}
        hideLabel
        classes={["soft-bottom", "display-inline-block", css(Styles.select)]}
        inputClasses={`${classes} outlined--dotted outlined--light h3 hard-top flush-bottom`}
        placeholder="select fund"
        onChange={saveFund}
        selected={selectVal}
      />
      // }
      // return (
      //   <h3 className="text-dark-primary display-inline-block push-half-bottom push-half-right">
      //     {accounts[0].label}
      //   </h3>
      // );
    ))()}
  </div>
);

Primary.propTypes = {
  classes: PropTypes.array, // eslint-disable-line
  accounts: PropTypes.object, // eslint-disable-line
  state: PropTypes.object, // eslint-disable-line
  preFill: PropTypes.func,
  saveFund: PropTypes.func,
  format: PropTypes.func,
  selectVal: PropTypes.func,
};

export default Primary;
