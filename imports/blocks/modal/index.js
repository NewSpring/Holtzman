import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { modal as modalActions, nav as navActions } from "../../store";

import Modal from "./Modal";

const map = (state) => ({
  navigation: state.nav,
  modal: state.modal,
  path: state.routing.path,
});

@connect(map)
export default class SideModalContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    modal: PropTypes.object, // eslint-disable-line
    navigation: PropTypes.object, // eslint-disable-line
    path: PropTypes.string,
  }

  state = {
    previous: null,
  }

  componentDidMount() {
    if (!this.props.modal.props.keepNav && this.props.modal.visible) {
      this.props.dispatch(navActions.setLevel("MODAL"));
    }

    if (Meteor.isClient) {
      document.addEventListener("keyup", this.bindEsc, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modal.visible && nextProps.navigation.level !== "MODAL" && nextProps.navigation.level !== "DOWN" && nextProps.modal.props.keepNav !== true) {
      this.props.dispatch(navActions.setLevel("MODAL"));
      this.setState({ previous: this.props.navigation.level });
    } else if (nextProps.modal.visible && nextProps.navigation.level === "DOWN") {
      this.setState({ previous: this.props.navigation.level });
    }

    if (!nextProps.modal.visible && (nextProps.navigation.level === "MODAL" || nextProps.navigation.level === "DOWN") && !this.props.modal.props.keepNav) {
      let previous = this.state.previous;
      if (previous === "MODAL" || previous === "DOWN" || !previous) {
        previous = "TOP";
      }
      this.props.dispatch(navActions.setLevel(previous));
    }

    if (!nextProps.modal.visible && (this.props.path !== nextProps.path)) {
      this.props.dispatch(modalActions.hide());
    }
  }

  componentWillUpdate(nextProps) {
    if (typeof document !== "undefined" && document !== null) {
      const root = document.documentElement;

      if (!nextProps.modal.visible) {
        root.className = root.className.split(" ").filter((className) =>
          className !== "modal--opened"
        ).join(" ");
      } else if (!this.props.modal.visible && nextProps.modal.visible) {
        root.className += " modal--opened";
      }
    }
  }

  componentWillUnmount() {
    if (Meteor.isClient) {
      document.removeEventListener("keyup", this.bindEsc, false);
    }
    this.props.dispatch(navActions.resetColor());
  }

  bindEsc = (event) => {
    // if key hit is `esc` or template is closed is clicked
    if (event.keyCode === 27) {
      this.props.dispatch(modalActions.hide());
    }
  }

  close = (e) => {
    const { target } = e;
    const { id } = target;
    if (id !== "@@modal") {
      return;
    }

    this.props.dispatch(modalActions.hide());
  }

  render() {
    const { visible, content, props } = this.props.modal;
    return (
      <Modal
        close={this.close}
        component={content}
        props={props}
        visible={visible}
        {...this.props}
      />
    );
  }
}
