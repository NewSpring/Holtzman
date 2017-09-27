import { Meteor } from "meteor/meteor";
import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { modal as modalActions, nav as navActions } from "../../../data/store";

import Modal from "./SideModal";
import PromptModal from "./PromptModal";

class SideModalContainerWithoutData extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    modal: PropTypes.object,
    navigation: PropTypes.object,
    path: PropTypes.string,
  };

  state = {
    previous: null,
  };

  componentDidMount() {
    if (!this.props.modal.props.keepNav && this.props.modal.visible) {
      this.props.dispatch(navActions.setLevel("MODAL"));
    }

    if (Meteor.isClient) {
      document.addEventListener("keydown", this.handleKeyPress, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.modal.visible &&
      nextProps.navigation.level !== "MODAL" &&
      nextProps.navigation.level !== "DOWN" &&
      nextProps.modal.props.keepNav !== true
    ) {
      this.props.dispatch(navActions.setLevel("MODAL"));
      this.setState({ previous: this.props.navigation.level });
    } else if (nextProps.modal.visible && nextProps.navigation.level === "DOWN") {
      this.setState({ previous: this.props.navigation.level });
    }

    if (
      !nextProps.modal.visible &&
      (nextProps.navigation.level === "MODAL" || nextProps.navigation.level === "DOWN") &&
      !this.props.modal.props.keepNav
    ) {
      let previous = this.state.previous;
      if (previous === "MODAL" || previous === "DOWN" || !previous) {
        previous = "TOP";
      }
      this.props.dispatch(navActions.setLevel(previous));
    }

    if (this.props.modal.visible && !nextProps.modal.visible) {
      // never stay in prompt modal mode on modal close
      this.props.dispatch(modalActions.update({ promptModal: false }));
    }

    if (!nextProps.modal.visible && this.props.path !== nextProps.path) {
      this.props.dispatch(modalActions.hide());
    }
  }

  componentWillUpdate(nextProps) {
    if (typeof document !== "undefined" && document !== null) {
      const root = document.documentElement;

      if (!nextProps.modal.visible) {
        root.className = root.className
          .split(" ")
          .filter(className => className !== "modal--opened")
          .join(" ");
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

  handleKeyPress = ({ keyCode }) => {
    // if key hit is `esc` or template is closed is clicked
    if (keyCode === 27) this.props.dispatch(modalActions.hide());

    // down arrow
    if (keyCode === 40 && this.scrollElement) this.scrollElement.scrollTop += 10;

    // up arrow
    if (keyCode === 38 && this.scrollElement) this.scrollElement.scrollTop -= 10;
  };

  close = e => {
    const { target } = e;
    const { id } = target;
    if (id !== "@@modal") return;
    if (this.props.modal.props.forceOpen) return;

    this.props.dispatch(modalActions.hide());
  };

  captureRef = ref => {
    this.scrollElement = ref;
  };

  render() {
    const { visible, content, props } = this.props.modal;
    if (props && props.promptModal) {
      const { profile, hero } = props;
      const userProfile = hero && !profile ? null : profile;
      return (
        <PromptModal
          close={this.close}
          profileImage={userProfile}
          heroImage={hero}
          component={content}
          visible={visible}
          {...this.props}
        />
      );
    }
    return (
      <Modal
        close={this.close}
        component={content}
        props={props}
        visible={visible}
        captureRef={this.captureRef}
        {...this.props}
      />
    );
  }
}

const map = state => ({
  navigation: state.nav,
  modal: state.modal,
  path: state.routing.path,
});

const withRedux = connect(map);

export default withRedux(SideModalContainerWithoutData);

export { SideModalContainerWithoutData, map, withRedux };
