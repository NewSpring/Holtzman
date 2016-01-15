import React, { PropTypes } from "react"

import { Controls, Forms } from "../../components"
import { Validate } from "../../util"


class ForgotPassword extends React.Component {

  static propTypes = {
    save: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    email: PropTypes.string,
    errors: PropTypes.obj.isRequired,
    back: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errors: {},
  }

  isEmail = (value) => {
    const isValid = Validate.isEmail(value)

    if (!isValid ) {
      this.props.clear("email")
    } else {
      this.props.save({ email: value })
    }

    return isValid;
  }

  render () {
    return (
      <Forms.Form
        id="forgot-password"
        fieldsetTheme="flush soft-top"
        classes={["push-double-top"]}
        submit={this.submit}
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
