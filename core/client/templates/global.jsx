
import React, { PropTypes } from "react"
import { Nav } from "../components"
import { OnBoard } from "../blocks"

class Global extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
        <OnBoard/>
        <Nav />
      </div>
    )
  }
}

export default Global;
