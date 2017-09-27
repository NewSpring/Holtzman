import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { nav } from "../../../../data/store";
import { reset } from "../../../../deprecated/methods/accounts/browser";

import { Error as Err, Loading } from "../../../../components/@primitives/UI/states";
import Success from "../Success";
import Layout from "./Layout";

class ChangePasswordWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    current: null,
    newP: null,
    newPDup: null,
    state: "default",
  }

  componentWillMount() {
    this.props.dispatch(nav.setLevel("BASIC_CONTENT"));
  }

  componentWillUnmount() {
    this.props.dispatch(nav.setLevel("TOP"));
  }

  submit = e => {
    e.preventDefault();
    this.setState({ state: "loading" });

    reset(this.state.current, this.state.newP, err => {
      if (err) {
        this.setState({ state: "error", err });
        setTimeout(() => {
          this.setState({ state: "default" });
        }, 5000);
        return;
      }


      this.setState({ state: "success" });

      setTimeout(() => {
        this.setState({ state: "default" });
      }, 5000);
    });
  }

  save = (value, input) => {
    const { id } = input;

    if (id === "newPDup" && this.state.newP && this.state.newP !== value) {
      return false;
    }

    if (id === "newP" && this.state.newPDup && this.state.newPDup !== value) {
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
          <div style={{ position: "fixed", top: 0, bottom: 0, width: "100%" }}>
            <Err error={err} msg="Looks like there was a problem" />;
          </div>
        );
      case "loading":
        return (
          <div style={{ position: "fixed", top: 0, bottom: 0, width: "100%" }}>
            <Loading msg="Updating your password..." />;
          </div>
        );
      case "success":
        return <Success msg="Your password has been updated!" />;
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

export default connect()(ChangePasswordWithoutData);

export {
  ChangePasswordWithoutData,
};
