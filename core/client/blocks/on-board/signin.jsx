import React, { PropTypes } from "react"
import ReactDom from "react-dom";
import { Controls, Forms } from "../../components"
import { Validate } from "../../../lib"

class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.email = "";
    this.password = "";
    this.terms = false;

    this.state = {
      hasAccount: true,
      hasErrors: false
    };
  }

  id = () => {
    if (this.state.hasAccount) {
      return "signin"
    }
    return "signup"
  }

  header = () => {
    return (
      <h4 className="text-center">
        Sign in or create your NewSpring profile
      </h4>
    )
  }

  toggle = (bool) => {
    this.setState({hasAccount: bool});
  }

  toggles = [
    { label: "Sign In" },
    { label: "Register" }
  ]

  isEmail = (value) => {
    const isValid = Validate.isEmail(value);
    if (!isValid && !this.state.hasErrors) {
      this.setState({hasErrors: true})
    } else if (isValid && this.state.hasErrors) {
      this.setState({hasErrors: false})
    }

    if (isValid && this.props.saveEmail) {
      this.email = value;
      this.props.saveEmail(value);
    }

    return isValid;
  }

  savePassword = (value) => {
    this.password = value;
    const isValid = value.length ? true : false;
    if (!isValid && !this.state.hasErrors) {
      this.setState({hasErrors: true})
    } else if (isValid && this.state.hasErrors) {
      this.setState({hasErrors: false})
    }

    return isValid
  }

  saveTerms = (event) => {
    this.terms = event.target.value === "on" ? true : false;
  }


  signin = () => {
    const form = ReactDOM.findDOMNode(this);

    const password = this.password;
    const email = this.email;

    if (!password || !email) {
      this.setState({hasErrors: true});
      return;
    }

    console.log(email, password)


  }

  signup = () => {
    const form = ReactDOM.findDOMNode(this);

    const password = this.password;
    const email = this.email;
    const terms = this.terms;

    if (!password || !email || !terms) {
      this.setState({hasErrors: true});
      return;
    }

    console.log(email, password, terms)
  }

  submit = (event) => {
    event.preventDefault();
    const form = event.target
    if (form.id === "signin") {
      this.signin();
      return;
    }

    this.signup();
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
          id={this.id()}
          fieldsetTheme="flush soft-top"
          submit={this.submit}
        >
          <Forms.Input
            name="email"
            placeholder="user@email.com"
            label="Email"
            errorText="Please enter a valid email"
            validation={this.isEmail}
            defaultValue={this.props.email}
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
          if (!this.state.hasAccount) {

            return (
              <Forms.Checkbox
                name="terms"
                checked="true"
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
                    <button className="text-primary" onClick={this.props.back}>Forgot Password?</button>
                  </small>
                </h7>
              </div>

            )

          }
        }()}


        <div>

          <a href="#" className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </a>

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
      </div>
    )
  }
}

export default SignIn;
