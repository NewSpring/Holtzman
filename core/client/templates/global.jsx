
import React, { PropTypes } from "react"
import { Nav } from "../components"

class Global extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
        <Nav />
      </div>
    )
  }
}

export default Global;
