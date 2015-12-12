
import React, { PropTypes } from "react"
import { Nav } from "../components"


export default class Global extends React.Component {
  render () {
    return (
      <div className="push-double-bottom soft-bottom">
        {this.props.children}
        <Nav />
      </div>
    )
  }
}
