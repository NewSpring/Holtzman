import React, { PropTypes } from "react"

class Label extends React.Component {
  render () {
    return (
      <label htmlFor={this.props.labelFor}>
        {this.props.labelName}
      </label>
    )
  }
}

export default Label;
