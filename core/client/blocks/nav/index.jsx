import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import {NavActions} from "../../actions/nav"
import NavLayout from "./nav.layout"

// We only care about the navigation state
const map = (state) => ({
  state: state.nav,
  // router: state.routing
})

@connect(map)
export default class NavContainer extends Component {

  handleAction = (action) => {
    this.props.dispatch(action(this.props))
  }

  render () {
    const { state, router } = this.props
    if (!state.visible) {
      return null
    }

    // console.log(this.props.router)

    return (
      <NavLayout
        links={ state.links }
        handleAction={this.handleAction}
        back={this.getBackLink}
      />
    )

  }
}
