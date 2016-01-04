import React, { PropTypes } from 'react'

class FieldSet extends React.Component {
  layoutClasses = () => {
    let classes = [
      "flush-bottom"
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  render () {
    return (
      <fieldset className={ this.props.theme || this.layoutClasses() }>
        {this.props.children}
      </fieldset>
    )
  }
}

export default FieldSet;
