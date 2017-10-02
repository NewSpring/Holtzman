import PropTypes from 'prop-types';
import { Component } from "react";

import Label from "./Label";

export default class TextArea extends Component {

  static propTypes = {
    defaultValue: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    status: PropTypes.string,
    disabled: PropTypes.any, // eslint-disable-line
    validation: PropTypes.func,
    errorText: PropTypes.string,
    theme: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.any, // eslint-disable-line
    classes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    children: PropTypes.any, // eslint-disable-line
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    inputClasses: PropTypes.string,
    hideLabel: PropTypes.bool,
    autofocus: PropTypes.any, // eslint-disable-line
    format: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    style: PropTypes.object, //eslint-disable-line
    placeholder: PropTypes.string,
    rows: PropTypes.number,
  }

  state = {
    active: false,
    focused: false,
    error: false,
    status: "",
    value: null,
  }

  componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({ active: true });
    }
  }

  componentDidMount() {
    if (this.props.autofocus) {
      this.node.focus();
    }

    // if (this.props.defaultValue) {
    //   this.node.value = `${this.props.defaultValue}`
    // }

    // one day, I dream of a universal browser auto-fill event
    // until then. I'll keep on checking
    const target = this.node;
    this.interval = setInterval(() => {
      if (this._previousValue === target.value || !target.value) { // eslint-disable-line
        return;
      }

      if (!this._previousValue && target.value && !this.state.focused) { // eslint-disable-line
        this.setValue(target.value);
      }

      this._previousValue = target.value; // eslint-disable-line
    }, 20);
  }

  componentWillUpdate(nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.setValue(nextProps.defaultValue);
      this.setState({ focused: false });
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }


  format = (e) => { // eslint-disable-line
    const target = this.node;
    const value = this.node.value;

    if (this.props.format && typeof (this.props.format) === "function") {
      const newValue = this.props.format(value, target, e);
      target.value = newValue;
    }

    if (this.props.onChange && typeof (this.props.onChange) === "function") {
      this.props.onChange(target.value, target, e);
    }
  }

  validate = (e) => {
    const target = this.node;
    const value = target.value;

    if (!value) {
      this.setState({
        active: false,
        error: false,
      });
    }

    this.setState({
      focused: false,
    });

    if (this.props.validation && typeof (this.props.validation) === "function") {
      this.setState({
        error: !this.props.validation(value, target, e),
      });
    }

    if (this.props.onBlur && typeof (this.props.onBlur) === "function") {
      this.props.onBlur(value, target, e);
    }
  }

  focus = () => {
    this.setState({
      active: true,
      error: false,
      focused: true,
    });
  }

  setValue = (value) => {
    const node = this.node;
    node.value = value;
    this.focus();
    this.validate();
  }

  getValue = () => this.node.value;

  setStatus = (message) => {
    this.props.status = message;
  }

  disabled = () => {
    if (this.props.disabled) {
      return this.props.disabled;
    }
    return undefined;
  }

  renderHelpText = () => {
    if ((this.state.error && this.props.errorText) || this.state.status) {
      return (
        <span className="input__status">
          {this.props.errorText || this.state.status}
        </span>
      );
    }
    return undefined;
  }


  style = () => {
    let style = {};

    if (this.props.style) {
      style = { ...style, ...this.props.style };
    }

    if (this.props.disabled) {
      style = {
        ...style,
        ...{
          cursor: "inherit",
        },
      };
    }

    return style;
  }


  render() {
    let inputclasses = [
      "input",
    ];

    // theme overwrite
    if (this.props.theme) { inputclasses = this.props.theme; }
    // state mangaged classes
    if (this.state.active) { inputclasses.push("input--active"); }
    if (this.state.focused) { inputclasses.push("input--focused"); }
    if (this.state.error) { inputclasses.push("input--alert"); }
    // custom added classes
    if (this.props.classes) { inputclasses = inputclasses.concat(this.props.classes); }

    return (
      <div className={inputclasses.join(" ")} style={this.props.style || {}}>
        {(() => {
          if (!this.props.hideLabel) {
            return (
              <Label
                labelFor={
                  this.props.id || this.props.name || this.props.label
                }
                labelName={
                  this.props.label || this.props.name
                }
                disabed={this.disabled()}
              />
            );
          }
          return undefined;
        })()}


        <textarea
          ref={(node) => (this.node = node)}
          id={this.props.id || this.props.name || this.props.label}
          type={this.props.type}
          placeholder={this.props.placeholder || this.props.label}
          name={this.props.name || this.props.label}
          className={this.props.inputClasses}
          disabled={this.disabled()}
          onBlur={this.validate}
          onFocus={this.focus}
          onChange={this.format}
          style={this.style()}
          rows={this.props.rows || 8}
          defaultValue={this.props.defaultValue}
        />

        {this.renderHelpText()}

      </div>
    );
  }

}
