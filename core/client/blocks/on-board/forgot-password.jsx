import React, { PropTypes } from "react"
import { Controls, Forms } from "../../components"
import { Validate } from "../../../lib"


class ForgotPassword extends React.Component {

  isEmail = (value) => {
    const isValid = Validate.isEmail(value)
    const noError = !this.props.errors["email"]

    if (!isValid && noError) {

      this.props.dispatch(onBoardActions.error({ email: {} }))

    } else if (isValid && !noError) {

      this.props.dispatch(onBoardActions.fix("email"))

    }

    if (isValid) { this.props.save({ email: value }) }
    return isValid;
  }


  render () {
    return (
      <Forms.Form
        id="forgot-password"
        fieldsetTheme="flush soft-top"
        classes={["push-double-top"]}
      >
        <legend className="push-half-bottom">
          Reset Password
        </legend>
        <h6 className="push-double-bottom">
          confirm your email to send the reset link
        </h6>

        <Forms.Input
          name="email"
          placeholder="user@email.com"
          label="Email"
          errorText="Email does not exist"
          validation={this.isEmail}
          defaultValue={this.props.email}
        />

      <div>
        <button
          onClick={this.props.back}
          className="btn--small btn--dark-tertiary display-inline-block"
        >
          Back
        </button>

        {() => {
          let btnClasses = ["push-left"];
          if (Object.keys(this.props.errors).length){
            btnClasses.push("btn--disabled");
          } else {
            btnClasses.push("btn");
          }

          return (
            <button className={btnClasses.join(" ")} type="submit">
              Enter
            </button>
          )
        }()}

        </div>

    </Forms.Form>
    )
  }
}

export default ForgotPassword;
