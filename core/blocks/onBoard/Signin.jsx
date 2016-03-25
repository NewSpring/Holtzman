import React, { PropTypes } from "react"
import ReactDom from "react-dom"

import { Controls, Forms } from "../../components"
import Validate from "../../util/validate"


class SignIn extends React.Component {

  static propTypes = {
    setAccount: PropTypes.func.isRequired,
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

  static defaultProps = {
    toggles: ["Sign In", "Register"]
  }

  header = () => {
    return (
      <h4 className="text-center">
        Sign in or create your NewSpring profile
      </h4>
    )
  }

  toggle = (num) => {
    this.props.setAccount(num == 0)
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

  savePassword = (value) => {
    this.props.save({ password: value })
    return true
  }

  liveSavePassword = (value) => {
    const isValid = value.length ? true : false

    if (!isValid ) {
      this.props.clear("password")
    } else {
      this.props.save({ password: value })
    }

    return value
  }

  firstName = (value) => {
    const isValid = value.length ? true : false

    if (!isValid ) {
      this.props.clear("firstName")
    } else {
      this.props.save({ firstName: value })
    }

    return isValid
  }

  lastName = (value) => {
    const isValid = value.length ? true : false

    if (!isValid ) {
      this.props.clear("lastName")
    } else {
      this.props.save({ lastName: value })
    }

    return isValid
  }

  saveTerms = (event) => {
    this.props.save({ terms: event.target.checked })
  }

  changeEmails = (event) => {
    const { dataset } = event.currentTarget
    const { email } = dataset

    this.isEmail(email);
    this.props.setAccount(true)

    event.preventDefault()
  }

  submit = (event) => {
    event.preventDefault();
    const { refs } = this
    for (let input in refs) {
      const component = refs[input]
      if (component.validate) {
        component.validate()
      }
    }

    if (this.props.data.email && this.props.data.password) {
      this.props.submit();
    }

    return;
  }

  render () {
    return (
      <div>
        <div className="push-double">
          {this.props.header || this.header()}
        </div>

        <Controls.Toggle
          items={this.props.toggles}
          toggle={this.toggle}
          state={this.props.account ? 0 : 1 }
        />

        <Forms.Form
          id="onboard"
          fieldsetTheme="flush soft-top"
          submit={this.submit}
        >

        {() => {
          if (!this.props.account && this.props.alternateAccounts.length) {

            return (
              <div className="soft-sides push-back-half-top soft-double-bottom">
                <h6 className="flush-bottom">
                  It looks like you may have a NewSpring account already!
                  {() => {
                    if (this.props.alternateAccounts.length === 1) {

                      return (
                        <span>
                          &nbsp; Is this your email&nbsp;
                          <a
                            href="#"
                            onClick={this.changeEmails}
                            data-email={this.props.alternateAccounts[0]}
                          >
                            {this.props.alternateAccounts[0]}
                          </a>?
                        </span>
                      )
                    }

                    let count = 0
                    return (
                      <span>
                        &nbsp; Is one of these your email&nbsp;

                        {this.props.alternateAccounts.map((x) => {
                          count ++
                          return (
                            <a
                              href="#"
                              onClick={this.changeEmails}
                              data-email={x}
                            >
                              {x}{count != this.props.alternateAccounts.length ? ", " : ""}
                            </a>
                          )

                        })}
                        ?
                      </span>
                    )

                  }()}
                </h6>
              </div>
            )

          }
        }()}

          <Forms.Input
            name="email"
            type="email"
            placeholder="user@email.com"
            label="Email"
            errorText="Please enter a valid email"
            validation={this.isEmail}
            defaultValue={this.props.data.email}
            ref="email"
          />

          <Forms.Input
            name="password"
            placeholder="password"
            label="Password"
            type="password"
            errorText="Password may not be empty"
            validation={this.savePassword}
            format={this.liveSavePassword}
            ref="password"
          />

          {() => {
            if (!this.props.account) {
              return (
                <div>
                  <Forms.Input
                    name="firstName"
                    label="First Name"
                    errorText="Please enter your first name"
                    validation={this.firstName}
                    defaultValue={this.props.data.firstName}
                    ref="firstName"
                  />

                  <Forms.Input
                    name="lastName"
                    label="Last Name"
                    errorText="Please enter your last name"
                    validation={this.lastName}
                    defaultValue={this.props.data.lastName}
                    ref="lastName"
                  />
                </div>

              )

            }
          }()}


        {() => {
          if (!this.props.account) {

            return (
              <Forms.Checkbox
                name="terms"
                defaultValue={this.props.data.terms}
                clicked={this.saveTerms}
              >
                By signing up you agree to our <a href="//newspring.cc/terms" target="_blank">terms of use</a>
              </Forms.Checkbox>
            )
          } else {
            return (
              <div className="push-bottom">
                <h7 >
                  <small>
                    <a href="/profile/forgot-password"
                      className="text-primary"
                      onClick={this.props.forgot}
                    >
                      Forgot Password?
                    </a>
                  </small>
                </h7>
              </div>

            )

          }
        }()}


        <div>



          {() => {
            const { data } = this.props
            let btnClasses = [];

            if (data.email === null || data.password === null && !data.terms){
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
