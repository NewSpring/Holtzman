import { Component, PropTypes} from "react"

import SubFund from "./Subfund"

const Layout = ({
    accounts,
    primary,
    save,
    format,
    preFill,
    total,
    transactions,
    otherAccounts
  }) => (
    <div className="push-top@handheld soft-half-top@lap-and-up">
      <Forms.Form
        classes={["text-left", "hard"]}
        submit={(e) => {e.preventDefault()}}
        id="add-to-cart"
      >
        <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
          I'd like to {() => {
            if (accounts.length > 1) {
              return "tithe"
            }

            return `give`
          }()}
        </h3>

        <Forms.Input
          id={primary.Id}
          name={primary.Name}
          type="tel"
          hideLabel={true}
          ref="primary-account"
          classes={["soft-bottom", "input--active", "display-inline-block"]}
          inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
          placeholder="$0.00"
          validate={save}
          format={}
          defaultValue={preFill(primary.Id)}
        />


        <div className="clearfix"></div>
        <div className="display-inline-block">
          {() => {

            if ((accounts && accounts.length > 1) || !accounts.length) {
              if (primary.Id) {
                delete transactions[primary.Id]
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
                {`to ${accounts[0].PublicName || accounts[0].Name} `}&nbsp;
              </h3>
            )

          }()}

          <h3 className="display-inline-block text-dark-tertiary push-half-bottom push-half-right">so my gift total is</h3>
          <h3 className="display-inline-block text-brand push-half-bottom">{this.monentize(total, true)}</h3>
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
