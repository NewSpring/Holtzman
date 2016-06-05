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

        <div className="one-whole text-center">
          <Forms.Input
            id={primary.id}
            name={primary.name}
            type="tel"
            hideLabel={true}
            classes={["soft-bottom", "input--active", "text-center", "one-whole", "one-half@lap-and-up", "display-inline-block"]}
            inputClasses={`outlined--dotted outlined--light h1 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]} text-center`}
            placeholder="$0.00"
            validate={save}
            format={format}
            defaultValue={preFill(primary.id)}
            style={{fontSize: "72px"}}
          />

          <div className="clearfix"></div>
          <Forms.Select
            items={accounts}
            name="select-account"
            hideLabel={true}
            classes={["soft-ends", "display-inline-block", "four-fifths", "one-half@lap-and-up"]}
            inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-center`}
            placeholder="select fund"
            includeBlank={true}
          />

        </div>


        <div className="push-top text-center">
          <GiveNow
            disabled={total <= 0}
          />
        </div>

      </Forms.Form>
    </div>
)

export default Layout
