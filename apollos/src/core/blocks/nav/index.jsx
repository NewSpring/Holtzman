import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import {
  nav as navActions,
  modal as modalActions
} from "../../store";

import NavLayout from "./Layout"

// We only care about the navigation state
const map = (state) => ({
  state: state.nav,
  modal: state.modal,
  liked: state.liked,
  path: state.routing.location.pathname
})

@connect(map)
export default class NavContainer extends Component {

  handleAction = (action) => {
    this.props.dispatch(action(this.props))
  }

  reset = () => {
    // always hide modal on change
    this.props.dispatch(modalActions.hide())
  }

  render () {
    const { state, modal, liked, path } = this.props
    if (!state.visible) return null

    return (
      <NavLayout
        links={ state.links }
        handleAction={this.handleAction}
        back={this.getBackLink}
        bgColor={ state.bgColor }
        fgColor={ state.fgColor }
        reset={this.reset}
        modal={modal}
        liked={liked}
        path={path}
        key="navigation"
      />
    )

  }
}
