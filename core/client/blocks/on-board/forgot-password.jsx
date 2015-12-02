import React, { PropTypes } from "react"
import { Controls, Forms } from "../../components"
import { Validate } from "../../../lib"


class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAccount: true,
      hasErrors: false
    };
  }

  isEmail = (value) => {
    const isValid = Validate.isEmail(value);
    if (!isValid && !this.state.hasErrors) {
      this.setState({hasErrors: true})
    } else if (isValid && this.state.hasErrors) {
      this.setState({hasErrors: false})
    }

    if (isValid && this.props.saveEmail) {
      this.props.saveEmail(value);
    }

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
          if (this.state.hasErrors){
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
