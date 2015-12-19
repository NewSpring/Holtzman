import React, { PropTypes } from "react"
import ReactDom from "react-dom"
import { connect } from "react-redux"
import { goBack } from "redux-router"

import { onBoard as onBoardActions } from "../../actions"

import { Controls, Forms } from "../../components"
import { Validate } from "../../../lib"


@connect()
class SignIn extends React.Component {

  static propTypes = {
    save: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    back: PropTypes.func.isRequired,
    forgot: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    account: PropTypes.bool.isRequired,
    state: PropTypes.string.isRequired,
    success: PropTypes.bool.isRequired,
    header: PropTypes.object,
    toggles: PropTypes.array
  }

  header = () => {
    return (
      <h4 className="text-center">
        Sign in or create your NewSpring profile
      </h4>
    )
  }


  toggles = [
    { label: "Sign In" },
    { label: "Register" }
  ]

  toggle = (bool) => {
    this.props.dispatch(onBoardActions.setAccount(bool))
  }


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

  savePassword = (value) => {
    const isValid = value.length ? true : false
    const noError = !this.props.errors["password"]

    if (!isValid && noError) {

      this.props.dispatch(onBoardActions.error({ password: {} }))

    } else if (isValid && !noError) {

      this.props.dispatch(onBoardActions.fix("password"))

    }

    if (isValid) { this.props.save({ password: value }) }
    return isValid
  }

  saveTerms = (event) => {
    this.props.save({ terms: event.target.checked })
  }


  submit = (event) => {
    event.preventDefault();
    this.props.submit();

    return;
  }

  render () {
    return (
      <div>
        <div className="push-double">
          {this.props.header || this.header()}
        </div>

        <Controls.Toggle
          items={this.props.toggles || this.toggles}
          toggle={this.toggle}
        />

        <Forms.Form
          id="onboard"
          fieldsetTheme="flush soft-top"
          submit={this.submit}
        >

          <Forms.Input
            name="email"
            placeholder="user@email.com"
            label="Email"
            errorText="Please enter a valid email"
            validation={this.isEmail}
            defaultValue={this.props.data.email}
          />

          <Forms.Input
            name="password"
            placeholder="password"
            label="Password"
            type="password"
            errorText="Password may not be empty"
            validation={this.savePassword}
          />


        {() => {
          if (!this.props.account) {

            return (
              <Forms.Checkbox
                name="terms"
                defaultValue={this.props.data.terms}
                clicked={this.saveTerms}
              >
                By signing up you agree to our <a href="#">terms and conditions</a>
              </Forms.Checkbox>
            )
          } else {
            return (
              <div className="push-bottom">
                <h7 >
                  <small>
                    <button
                      className="text-primary"
                      onClick={this.props.forgot}
                    >
                      Forgot Password?
                    </button>
                  </small>
                </h7>
              </div>

            )

          }
        }()}


        <div>
          <button onClick={goBack} className="btn--small btn--dark-tertiary display-inline-block">
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
      </div>
    )
  }
}

export default SignIn;
