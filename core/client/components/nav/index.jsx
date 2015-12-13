import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import { nav } from "../../actions"

import NavLayout from "./nav.layout"

// We only care about the navigation state
function mapStateToProps(state) {
  return {
    state: state.nav
  }
}

@connect(mapStateToProps, nav)
export default class NavContainer extends Component {

  render () {
    const { state } = this.props

    if (!state.visible) {
      return null
    }

    return (
      <NavLayout links={ state.links }/>
    )

  }
}
