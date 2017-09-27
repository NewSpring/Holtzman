import PropTypes from 'prop-types';
import { Component } from "react";

import Label from "./Label";

export default class File extends Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    autofocus: PropTypes.bool,
    format: PropTypes.func,
    validation: PropTypes.func,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    theme: PropTypes.string,
    classes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    style: PropTypes.object, // eslint-disable-line
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    hideLabel: PropTypes.string,
    placeholder: PropTypes.string,
    inputClasses: PropTypes.array, // eslint-disable-line
  }

  state = {
    active: false,
    focused: false,
    error: false,
    status: "",
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
  }

  componentWillUpdate(nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.setValue(nextProps.defaultValue);
      this.setState({ focused: false });
    }
  }


  format = (e) => { // eslint-disable-line
    const target = this.node;
    const value = this.node.value;

    if (this.props.format && typeof (this.props.format) === "function") {
      const newValue = this.props.format(value, target, e);
      target.value = newValue;
    }
  }

  validate = () => {
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
        error: !this.props.validation(value, target),
      });
    }
  }

  focus = () => {
    this.setState({
      active: true,
      error: false,
      focused: true,
    });
  }

  setValue = value => {
    const node = this.node;
    node.value = value;
    this.focus();
    this.validate();
  }

  getValue = () =>
    this.node.value;

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
    if (this.props.disabled) {
      return {
        cursor: "inherit",
      };
    }

    return {};
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
                disabed={this.props.disabled ? this.props.disabled : false}
              />
            );
          }
          return undefined;
        })()}


        <input
          ref={node => (this.node = node)}
          id={this.props.id || this.props.name || this.props.label}
          type="file"
          placeholder={this.props.placeholder || this.props.label}
          name={this.props.name || this.props.label}
          className={this.props.inputClasses}
          disabled={this.props.disabled ? this.props.disabled : false}
          onBlur={this.validate}
          onFocus={this.focus}
          onChange={this.format}
          defaultValue={this.props.defaultValue}
          style={this.style()}
          autoFocus={this.props.autofocus}
        />

        {this.renderHelpText()}

      </div>
    );
  }

}
