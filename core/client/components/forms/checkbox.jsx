import React, { PropTypes } from "react"

import Label from "./components/label"


class Checkbox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      status: false,
      error: false
    }
  }

  validate = (event) => {
    const value = event.target.value;

    if (!value) {
      this.setState({
        active: false,
        error: false
      })
    }

    if (this.props.validation && typeof(this.props.validation) === "function") {
      this.setState({
        error: !this.props.validation(value)
      });

    }
  }

  setStatus = (message) => {
    this.props.status = message;
  }

  disabled = () => {
    if (this.props.disabled) {
      return disabled;
    }
  }

  renderHelpText(message) {

    if ((this.state.error && this.props.errorText) || this.state.status) {

      return (
        <span className="input__status">
          {this.props.errorText || this.state.status}
        </span>
      );
    }

  }

  render () {
    let inputclasses = [
      "input"
    ];

    // theme overwrite
    if (this.props.theme) { inputclasses = this.props.theme }
    // state mangaged classes
    if (this.state.status) { inputclasses.push("push-double-bottom") }

    if (this.props.type) {
      inputclasses.push(this.props.type);
    } else {
      inputclasses.push("checkbox");
    }

    if (this.props.error) { inputclasses.push("input--alert") }
    // custom added classes
    if (this.props.classes) { inputclasses = inputclasses.concat(this.props.classes) }


    return (
      <div className={inputclasses.join(" ")}>

        <input
          ref={this.props.id || this.props.label || this.props.name}
          id={this.props.id || this.props.label || this.props.name}
          type={this.props.type || "checkbox"}
          name={this.props.name || this.props.label }
          className={this.props.inputClasses}
          disabled={this.disabled()}
          defaultValue={this.props.defaultValue}
          onClick={this.props.clicked}
        />

        {(() => {
          if (!this.props.hideLabel){
            return (
              <Label
                labelFor={
                  this.props.id || this.props.label || this.props.name
                }
              />
            )
          }
        })()}

        <h7 className="soft-left">
          <small>
            {this.props.children}
          </small>
        </h7>

        {this.renderHelpText()}
      </div>
    )
  }
}

export default Checkbox;
