import React from "react";
import ReactDom from "react-dom";

import Label from "./components/label"

class Input extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      focused: false,
      error: false,
      value: "",
      status: "",
      liveFormat: ""
    }

    if (props.defaultValue) {
      this.state.active = true
    }
  }

  format = () => {


    let value = "";

    // this needs to be better
    for (let ref in this.refs) {
      value = this.refs[ref].value;
      break;
    }

    if (this.props.liveFormatting && typeof(this.props.liveFormatting) === "function") {

      const newValue = this.props.liveFormatting(value);

      let node = ReactDOM.findDOMNode(this.refs["apollos-input"]);
      node.value = newValue;

    }
  }

  validate = () => {

    const target = ReactDOM.findDOMNode(this.refs["apollos-input"]);
    const value = target.value

    if (!value) {
      this.setState({
        active: false,
        error: false
      })
    }

    this.setState({
      focused: false
    })

    if (this.props.validation && typeof(this.props.validation) === "function") {
      this.setState({
        error: !this.props.validation(value)
      });

    }
  }

  focus = (event) => {
    this.setState({
      active: true,
      error: false,
      focused: true
    })
  }

  setValue = (value) => {
    let node = ReactDOM.findDOMNode(this.refs["apollos-input"]);
    node.value = value;
    this.focus()
    this.validate()
  }


  setStatus = (message) => {
    this.props.status = message;
  }

  disabled = () => {
    if (this.props.disabled) {
      return disabled;
    }
  }

  renderHelpText = (message) => {

    if ((this.state.error && this.props.errorText) || this.state.status) {

      return (
        <span className="input__status">
          {this.props.errorText || this.state.status}
        </span>
      );
    }

  }



  render() {
    let inputclasses = [
      "input"
    ];

    // theme overwrite
    if (this.props.theme) { inputclasses = this.props.theme }
    // state mangaged classes
    if (this.state.active) { inputclasses.push("input--active") }
    if (this.state.focused) { inputclasses.push("input--focused") }
    if (this.state.error) { inputclasses.push("input--alert") }
    // custom added classes
    if (this.props.classes) { inputclasses = inputclasses.concat(this.props.classes) }

    return (
      <div className={inputclasses.join(" ")}>
        {(() => {
          if (!this.props.hideLabel){
            return (
              <Label
                labelFor={
                  this.props.id || this.props.label || this.props.name
                }
                labelName={
                  this.props.label || this.props.name
                }
              />
            )
          }
        })()}


        <input
          ref="apollos-input"
          id={this.props.id || this.props.label || this.props.name}
          type={this.props.type}
          placeholder={this.props.placeholder || this.props.label}
          name={this.props.name || this.props.label }
          className={this.props.inputClasses}
          disabled={this.disabled()}
          onBlur={this.validate}
          onFocus={this.focus}
          onChange={this.format}
          defaultValue={this.props.defaultValue}
        />

        {this.renderHelpText()}

      </div>
    );

  }

}


export default Input
