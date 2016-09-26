import { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import { reset } from "../../../methods/accounts/browser";
import { routeActions } from "../../../store/routing";
import { Error, Loading } from "../../../components/states";
import Success from "./Success";
import Layout from "./Layout";

@connect()
export default class ChangePassword extends Component {

  state = {
    newP: null,
    newPDup: null,
    state: "default",
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({ state: "loading" });
    Accounts.resetPassword(this.props.params.token, this.state.newP, (err) => {
      if (err) {
        this.setState({ state: "error", err });
        setTimeout(() => {
          this.setState({ state: "default" });
        }, 5000);
        return;
      }

      reset(false, this.state.newP, (err, result) => {
        if (err) {
          this.setState({ state: "error", err });
          setTimeout(() => {
            this.setState({ state: "default" });
          }, 5000);
          return;
        }


        this.setState({ state: "success" });

        setTimeout(() => {
          // this.setState({ state: "default"})
          this.props.dispatch(routeActions.push("/profile"));
        }, 1000);
      });
    });
  }

  save = (value, input) => {
    const { id } = input;

    if (id === "newPDup" && this.state.newP && this.state.newP != value) {
      return false;
    }

    if (id === "newP" && this.state.newPDup && this.state.newPDup != value) {
      return false;
    }

    this.setState({ [id]: value });

    return true;
  }


  render() {
    const { state, err } = this.state;
    switch (state) {
      case "error":
        return (
          <div className="fixed-ends fixed-sides">
            <Error msg="Looks like there was a problem" error={err && err.message ? err.message : " "} />
          </div>
        );
      case "loading":
        return (
          <div className="fixed-ends fixed-sides">
            <Loading msg="Updating your password..." />
          </div>
        );
      case "success":
        return (
          <div className="fixed-ends fixed-sides">
            <Success msg="Your password has been updated!" />
          </div>
        );
      default:
        return (
          <Layout
            submit={this.submit}
            save={this.save}
            state={this.state}
          />
        );
    }
  }
}
