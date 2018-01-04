import PropTypes from "prop-types";
import React from "react";

import Label from "./Label";

export default class Checkbox extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    defaultChecked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    disabled: PropTypes.any, // eslint-disable-line
    validation: PropTypes.func,
    errorText: PropTypes.string,
    theme: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.any, // eslint-disable-line
    classes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    children: PropTypes.any, // eslint-disable-line
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    inputClasses: PropTypes.string, // eslint-disable-line
    clicked: PropTypes.func,
    onChange: PropTypes.func,
    hideLabel: PropTypes.bool,
  };

  state = {
    status: false,
    error: false,
    checked: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultValue && !nextProps.defaultValue) {
      this.setState({ checked: false });
    }
  }

  disabled = () => {
    if (this.props.disabled) {
      return this.props.disabled; // eslint-disable-line
    }
    return undefined;
  };

  validate = event => {
    const value = event.target.value;

    if (!value) {
      this.setState({
        active: false,
        error: false,
      });
    }

    if (this.props.validation && typeof this.props.validation === "function") {
      this.setState({
        error: !this.props.validation(value),
      });
    }
  };

  renderHelpText() {
    if ((this.state.error && this.props.errorText) || this.state.status) {
      return (
        <span className="input__status">
          {this.props.errorText || this.state.status}
        </span>
      );
    }
    return null;
  }

  clickedLabel = (e: Event) => {
    if (e) e.preventDefault();
    this.props.clicked(e);
  };

  getStyles = checked => {
    if (checked) {
      return {
        color: "#303030",
      };
    }
    return {};
  };

  render() {
    let inputclasses = ["input"];

    // theme overwrite
    if (this.props.theme) {
      inputclasses = this.props.theme;
    }
    // state mangaged classes
    if (this.state.status) {
      inputclasses.push("push-double-bottom");
    }

    if (this.props.type) {
      inputclasses.push(this.props.type);
    } else {
      inputclasses.push("checkbox");
    }

    if (this.props.error) {
      inputclasses.push("input--alert");
    }
    // custom added classes
    if (this.props.classes) {
      inputclasses = inputclasses.concat(this.props.classes);
    }

    return (
      <div className={inputclasses.join(" ")} data-spec="input-wrapper">
        <label
          className="h6 soft-half-left push-half-left flush-bottom text-left float-left locked-top"
          style={{
            marginTop: "-1px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            display: "block",
          }}
          htmlFor={this.props.id || this.props.label || this.props.name}
          onClick={this.clickedLabel}
        >
          <small
            data-spec="input-label"
            style={this.getStyles(this.state.checked !== false)}
          >
            {this.props.children}
          </small>
        </label>

        <input
          id={this.props.id || this.props.label || this.props.name}
          type={this.props.type || "checkbox"}
          name={this.props.name || this.props.label}
          className={this.props.inputClasses}
          disabled={this.disabled()}
          checked={
            this.state.checked !== false ||
            this.props.defaultValue ||
            this.props.defaultChecked
              ? "checked"
              : ""
          }
          onClick={this.props.clicked}
          onChange={this.props.onChange}
          style={{ width: 0 }}
          data-spec="input"
        />

        {!this.props.hideLabel &&
          <Label
            labelFor={this.props.id || this.props.label || this.props.name}
          />}

        {this.renderHelpText()}
      </div>
    );
  }
}
