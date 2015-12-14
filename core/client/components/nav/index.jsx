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


// https://github.com/rackt/react-redux/blob/v4.0.0/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
@connect(mapStateToProps, nav, null, {
  pure: false
})
export default class NavContainer extends Component {

  handleAction = (action) => {
    this.dispatch(action())
  }

  render () {

    const { state } = this.props

    if (!state.visible) {
      return null
    }

    return (
      <NavLayout links={ state.links } handleAction={this.handleAction}/>
    )

  }
}
