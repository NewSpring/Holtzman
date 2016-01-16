import { PropTypes } from "react"

import { Forms } from "../../../../core/components"
import Styles from "../styles.css"

const Layout = ({ classes, accounts, state, preFill, showInputs, format }) => (
  <div>
    <div
      className={`display-inline-block push-half-bottom h3 push-half-right ${classes}`}>
      and give to
    </div>
    <Forms.Select
      items={accounts}
      name="select-account"
      id={`${state.id}_select`}
      hideLabel={true}
      classes={["soft-bottom", "display-inline-block"]}
      inputClasses={`${classes} outlined--dotted outlined--light h3 hard-top flush-bottom`}
      placeholder="select fund here"
      onChange={showInputs}
      includeBlank={true}
    />

    {() => {
      if (state.fund) {
        return (
          <div className="display-block">
            <h3 className={`${classes} push-half-bottom push-half-right display-inline-block`}>
              with
            </h3>
            <Forms.Input
              id={state.id}
              name={state.fund || "secondary-account"}
              hideLabel={true}
              type="tel"
              classes={["soft-bottom", "input--active", "display-inline-block"]}
              inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
              placeholder="$0.00"
              format={format}
              defaultValue={preFill(state.id)}
            />
          </div>
        )
      }
    }()}


  </div>
)


export default Layout
