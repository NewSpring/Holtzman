import PropTypes from 'prop-types';
import { Component } from "react";
import { connect } from "react-redux";

import {
  modal as modalActions,
} from "../../../data/store";

import NavLayout from "./Layout";

class NavContainerWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    liked: PropTypes.object,
    state: PropTypes.object,
    modal: PropTypes.object,
    path: PropTypes.string,
  }

  handleAction = action => {
    this.props.dispatch(action(this.props));
  }

  reset = () => {
    // always hide modal on change
    this.props.dispatch(modalActions.hide());
  }

  render() {
    const { state, modal, liked, path } = this.props;
    if (!state.visible) return null;

    return (
      <NavLayout
        links={state.links}
        handleAction={this.handleAction}
        back={this.getBackLink}
        bgColor={state.bgColor}
        fgColor={state.fgColor}
        reset={this.reset}
        modal={modal}
        liked={liked}
        path={path}
        key="navigation"
      />
    );
  }
}

const map = state => ({
  state: state.nav,
  modal: state.modal,
  liked: state.liked,
  path: state.routing.location.pathname,
});
const withRedux = connect(map);

export default withRedux(NavContainerWithoutData);

export {
  NavContainerWithoutData,
};
