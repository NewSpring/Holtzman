import PropTypes from "prop-types";
import { Component } from "react";
import { css } from "aphrodite";
// import ReactSelect from "react-select";

import Label from "./Label";

import SelectClasses from "./styles/select";

// XXX if the options come if after the default value
// the default value is never correctly set.
export default class Select extends Component {
  static propTypes = {
    defaultValue: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number,
    ]),
    disabled: PropTypes.any, // eslint-disable-line
    validation: PropTypes.func,
    errorText: PropTypes.string,
    theme: PropTypes.string,
    error: PropTypes.any, // eslint-disable-line
    classes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    inputClasses: PropTypes.string, // eslint-disable-line
    hideLabel: PropTypes.bool,
    autofocus: PropTypes.any, // eslint-disable-line
    onChange: PropTypes.func,
    style: PropTypes.object, // eslint-disable-line
    placeholder: PropTypes.string,
    selected: PropTypes.any, // eslint-disable-line
    includeBlank: PropTypes.bool, // eslint-disable-line
    includeEmpty: PropTypes.bool, // eslint-disable-line
    deselect: PropTypes.bool, // eslint-disable-line
    items: PropTypes.array, // eslint-disable-line
    optionClasses: PropTypes.string,
  };

  state = {
    active: false,
    focused: false,
    error: false,
    status: "",
  };

  componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({ active: true });
    }
  }

  componentDidMount() {
    if (this.props.defaultValue) {
      const target = this.node;

      if (this.props.onChange) {
        this.props.onChange(this.props.defaultValue, target);
      }

      if (this.props.validation) {
        this.props.validation(this.props.defaultValue, target);
      }
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.setValue(nextProps.defaultValue);
      this.setState({ focused: false });
      const target = this.node;
      this.change({
        value: nextProps.defaultValue,
        id: target.id,
        currentTarget: target,
      });
    }
    // if (!this.props.items.length && nextProps.items.length && nextProps.defaultValue) {
    //   this.setValue(nextProps.defaultValue);
    //   this.setState({ focused: false });
    //   console.log('here');
    //   this.change({
    //     value: nextProps.defaultValue,
    //     id: target.id,
    //     currentTarget: target,
    //   })
    // }
  }

  focus = () => {
    // eslint-disable-line
    this.setState({
      active: true,
      error: false,
      focused: true,
    });
  };

  blur = () => {
    const value = Boolean(this.getValue());
    const node = this.node;

    this.setState({
      active: value,
      focused: false,
    });

    node.blur();
  };

  setValue = value => {
    const node = this.node;
    node.value = value;
    if (value) {
      this.focus();
    }
    // this.change()
  };

  getValue = () => this.node.value;

  // XXX unused?
  // setStatus = (message) => {
  //   this.props.status = message;
  // }

  disabled = () => {
    if (this.props.disabled) {
      return this.props.disabled;
    }
    return undefined;
  };

  renderHelpText = () => {
    if ((this.state.error && this.props.errorText) || this.state.status) {
      return (
        <span className="input__status">
          {this.props.errorText || this.state.status}
        </span>
      );
    }
    return undefined;
  };

  change = e => {
    const { value } = e.currentTarget;

    if (this.props.onChange) {
      this.props.onChange(value, e.currentTarget);
    }

    if (this.props.validation) {
      this.props.validation(value, e.currentTarget);
    }
  };

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

    if (this.props.validation && typeof this.props.validation === "function") {
      this.setState({
        error: !this.props.validation(value, target),
      });
    }
  };

  render() {
    let inputclasses = ["input"];

    // theme overwrite
    if (this.props.theme) {
      inputclasses = this.props.theme;
    }
    // state mangaged classes
    if (this.state.active) {
      inputclasses.push("input--active");
    }
    if (this.state.focused) {
      inputclasses.push("input--focused");
    }
    if (this.state.error) {
      inputclasses.push("input--alert");
    }
    // custom added classes
    if (this.props.classes) {
      inputclasses = inputclasses.concat(this.props.classes);
    }

    if (this.props.selected) {
      inputclasses.push("input--active");
    }

    // if a selected item is passed in, we don't need a defaultValue
    // conreolled/uncontrolled react error
    const value = this.props.selected
      ? { value: this.props.selected || "" }
      : {};
    const defaultValue =
      this.props.defaultValue && !this.props.selected
        ? { defaultValue: this.props.defaultValue || "" }
        : {};

    return (
      <div className={`${inputclasses.join(" ")} ${css(SelectClasses.select)}`}>
        {(() => {
          if (!this.props.hideLabel) {
            return (
              <Label
                labelFor={this.props.id || this.props.label || this.props.name}
                labelName={this.props.label || this.props.name}
              />
            );
          }
          return undefined;
        })()}

        <select
          ref={node => (this.node = node)}
          id={this.props.id || this.props.label || this.props.name}
          placeholder={this.props.placeholder || this.props.label}
          name={this.props.name || this.props.label}
          className={this.props.inputClasses}
          style={this.props.style}
          disabled={this.disabled()}
          onFocus={this.focus}
          onChange={this.change}
          onBlur={this.blur}
          {...defaultValue}
          {...value}
        >
          {(() => {
            if (this.props.placeholder || this.props.includeBlank) {
              return (
                <option style={{ display: "none" }}>
                  {this.props.placeholder || ""}
                </option>
              );
            } else if (this.props.includeEmpty) {
              return (
                <option className={this.props.optionClasses} value={""}>
                  {""}
                </option>
              );
            }
            return undefined;
          })()}
          {(() => {
            if (this.props.deselect) {
              return <option />;
            }
            return undefined;
          })()}
          {this.props.items.map((option, key) =>
            (<option
              className={this.props.optionClasses}
              value={option.value || option.label}
              key={key}
            >
              {option.label || option.value}
            </option>),
          )}
        </select>

        {this.renderHelpText()}
      </div>
    );
  }
}
