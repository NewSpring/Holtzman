import { Component, PropTypes } from "react"

import NavLayout from "./nav.layout"

export default class NavContainer extends Component {

  links = [
    { label:"Home", link:"/", icon:"icon-logo" },
    { label:"Sections", link:"/sections", icon:"icon-sections" },
    { label:"Discover", link:"/discover", icon:"icon-search" },
    { label:"Profile", link:"/profile", icon:"icon-profile" }
  ]

  render () {
    return (
      <NavLayout links={ this.props.links || this.links } />
    )

  }
}
