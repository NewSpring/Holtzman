
import React, { PropTypes } from "react"

const Global = React.createClass({
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

export default Global
