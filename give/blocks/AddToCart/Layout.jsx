import { Component, PropTypes} from "react"

import { Forms } from "../../../core/components"

import GiveNow from "../ActionButtons"

import SubFund from "./Subfund"
import Styles from "./styles.css"

const Layout = ({
    accounts,
    primary,
    save,
    format,
    preFill,
    total,
    transactions,
    otherAccounts,
    monentize,
  }) => (
    <div className="push-top@handheld soft-half-top@lap-and-up">
      <Forms.Form
        classes={["text-left", "hard"]}
        submit={(e) => {e.preventDefault()}}
        id="add-to-cart"
      >
        <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
          I'd like to give
        </h3>

        <Forms.Input
          id={primary.id}
          name={primary.name}
          type="tel"
          hideLabel={true}
          classes={["soft-bottom", "input--active", "display-inline-block"]}
          inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
          placeholder="$0.00"
          validate={save}
          format={format}
          defaultValue={preFill(primary.id)}
          style={{maxWidth: "200px"}}
        />


        <div className="clearfix"></div>
        <div className="display-inline-block">
          {() => {
            if ((accounts && accounts.length > 1) || !accounts.length) {
              if (primary.id) {
                delete transactions[primary.id]
              } else {
                delete transactions[-1]
              }

              return (
                <div>
                  <SubFund accounts={otherAccounts} preFill={preFill} />
                  <div className="clearfix"></div>
                </div>

              )
            }

            return (
              <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
                {`to ${accounts[0].name}`}&nbsp;
              </h3>
            )

          }()}

          <h3 className="display-inline-block text-dark-tertiary push-half-bottom push-half-right">so my total is</h3>
          <h3 className="display-inline-block text-brand push-half-bottom">{monentize(total, true)}</h3>
        </div>

        <div className="push-top">
          <GiveNow
            disabled={total <= 0}
          />
        </div>

      </Forms.Form>
    </div>
)

export default Layout
