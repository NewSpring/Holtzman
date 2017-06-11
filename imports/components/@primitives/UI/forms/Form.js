import PropTypes from "prop-types";
import { Component } from "react";
import Fieldset from "./Fieldset";

export default class Form extends Component {

  static propTypes = {
    theme: PropTypes.string,
    classes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    children: PropTypes.any, // eslint-disable-line
    id: PropTypes.string,
    submit: PropTypes.func,
    action: PropTypes.bool,
    method: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line
    fieldsetTheme: PropTypes.string,
  }

  layoutClasses = () => {
    let classes = [
      "hard-ends",
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  render() {
    return (
      <form
        id={this.props.id}
        onSubmit={this.props.submit}
        className={this.props.theme || this.layoutClasses()}
        action={this.props.action}
        method={this.props.method}
        style={this.props.style}
      >
        <Fieldset
          theme={this.props.fieldsetTheme}
        >
          {this.props.children}
        </Fieldset>
      </form>
    );
  }
}
