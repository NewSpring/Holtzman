import React, { PropTypes } from "react"
import Fieldset from "./fieldset"

class Form extends React.Component {

  layoutClasses = () => {
    let classes = [
      "hard-ends"
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  render () {

    return (
      <form
        id={this.props.id}
        onSubmit={this.props.submit}
        className={ this.props.theme || this.layoutClasses() }
        action={this.props.action}
        method={this.props.method}
      >
        <Fieldset
          theme={this.props.fieldsetTheme}
        >
          {this.props.children}
        </Fieldset>
      </form>
    )
  }
}

export default Form;
