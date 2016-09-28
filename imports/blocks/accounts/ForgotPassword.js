import React, { PropTypes } from "react";

import Forms from "../../components/forms";
import { Error, Loading, Success } from "../../components/states";

import Validate from "../../util/validate";
import { forceReset } from "../../methods/accounts/browser";

class ForgotPassword extends React.Component {

  static propTypes = {
    save: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    email: PropTypes.string,
    errors: PropTypes.object.isRequired, // eslint-disable-line
    back: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errors: {},
  }

  state = {
    state: "default",
  }

  isEmail = (value) => {
    const isValid = Validate.isEmail(value);

    if (!isValid) {
      this.props.clear("email");
    } else {
      this.props.save({ email: value });
    }

    return isValid;
  }

  submit = (e) => {
    e.preventDefault();

    this.setState({
      state: "loading",
    });

    Accounts.forgotPassword({
      email: this.props.email,
    }, (err) => {
      if (err) {
        if (err.error === 403) {
          // this user may exist in Rock but not in Apollos
          // we fire a server side check with Rock then on the server
          // we create a user (if they exist in Rock) and email them the reciept
          forceReset(this.props.email, (error) => {
            if (error) {
              this.setState({ state: "error", err: error.message });
              setTimeout(() => {
                this.setState({ state: "default" });
              }, 3000);
              return;
            }

            this.setState({ state: "success" });

            setTimeout(() => {
              this.setState({ state: "default" });
              this.props.back();
            }, 3000);
          });

          return;
        }
        this.setState({ state: "error", err: err.message });
        setTimeout(() => {
          this.setState({ state: "default" });
        }, 3000);
        return;
      }

      this.setState({ state: "success" });

      setTimeout(() => {
        this.setState({ state: "default" });
        this.props.back();
      }, 3000);
    });
  }

  render() {
    const { err } = this.state;

    switch (this.state.state) {
      case "error":
        return <Error msg="Looks like there was a problem" error={err || " "} />;
      case "loading":
        return <Loading msg="Sending email to reset your password..." />;
      case "success":
        return (
          <Success
            msg={
              `An email has been sent to ${this.props.email} ` +
              "with instructions on how to reset your password!"
            }
          />
        );
      default:
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
              <a
                onClick={this.props.back}
                tabIndex={-1}
                className="btn--small btn--dark-tertiary display-inline-block"
              >
                Back
              </a>

              {(() => {
                const btnClasses = ["push-left"];
                if (Object.keys(this.props.errors).length) {
                  btnClasses.push("btn--disabled");
                } else {
                  btnClasses.push("btn");
                }

                return (
                  <button className={btnClasses.join(" ")} type="submit">
                    Enter
                  </button>
              );
              })()}

            </div>
          </Forms.Form>
        );
    }
  }
}

export default ForgotPassword;
