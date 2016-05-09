
import * as React from "react";
import { Component, PropTypes, HTMLProps, SyntheticEvent } from "react";
import * as ReactDom from "react-dom";
// import ReactSelect from "react-select";

import Label from "./components/Label";

// XXX remove need of css
// import SelectClasses from "./select.css";

export declare interface SelectItem {
  value: string;
  label: string;
};

export declare interface SelectProps {
  defaultValue?: string;
  onChange?(value: string, element: HTMLSelectElement, e: SyntheticEvent): void;
  validation?(value: string, element: HTMLSelectElement, e: SyntheticEvent): boolean;
  status?: string;
  disabled?: boolean;
  errorText?: string;
  theme?: string;
  classes?: Array<string>;
  selected?: boolean;
  hideLabel?: boolean;
  id?: string;
  label?: string;
  name?: string;
  ref?: string;
  placeholder?: string;
  inputClasses?: Array<string>;
  includeBlank?: boolean;
  deselect?: boolean;
  items?: Array<SelectItem>;
  optionClasses?: Array<string>;
};

export declare interface SelectState {
  active: boolean;
  focused: boolean;
  error: boolean;
  status: string;
};

export default class Select extends Component<SelectProps, {}> {

  public state: SelectState = {
    active: false,
    focused: false,
    error: false,
    status: ""
  };

  componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({ active: true })
    }
  };

  componentDidMount() {
    if (this.props.defaultValue) {
      const target = ReactDom.findDOMNode<HTMLSelectElement>(this.refs["apollos-select"])

      if (this.props.onChange) {
        this.props.onChange(this.props.defaultValue, target, null)
      }

      if (this.props.validation) {
        this.props.validation(this.props.defaultValue, target, null)
      }
    }
  };

  componentWillUpdate(nextProps){
    if (this.props.defaultValue != nextProps.defaultValue) {
      this.setValue(nextProps.defaultValue)
      this.setState({focused: false})
      const target = ReactDom.findDOMNode<HTMLSelectElement>(this.refs["apollos-select"])

      if (this.props.onChange) {
        this.props.onChange(nextProps.defaultValue, target, null);
      }

      if (this.props.validation) {
        this.props.validation(nextProps.defaultValue, target, null)
      }
    }
  };

  focus = (): void => {
    this.setState({
      active: true,
      error: false,
      focused: true
    })
  };

  setValue = (value: string): void => {
    let node = ReactDom.findDOMNode<HTMLSelectElement>(this.refs["apollos-select"]);
    node.value = value;
    this.focus()
    // this.change()
  };

  getValue = (): string => {
    return ReactDom.findDOMNode<HTMLSelectElement>(this.refs["apollos-select"]).value
  };

  setStatus = (message: string): void => {
    this.setState({
      status: message,
    });
  };

  disabled = (): boolean => {
    if (this.props.disabled) {
      return true;
    }

    return false;
  };

  renderHelpText = (message: string): JSX.Element => {

    if ((this.state.error && this.props.errorText) || this.state.status) {

      return (
        <span className="input__status">
          {this.props.errorText || this.state.status}
        </span>
      );
    }
  };

  onChangeEvent = (e: SyntheticEvent): void => {
    const { id, value } = e.currentTarget as HTMLSelectElement;
    const target = ReactDom.findDOMNode<HTMLSelectElement>(this.refs["apollos-select"]);

    if (this.props.onChange) {
      this.props.onChange(value, target, e);
    }

    if (this.props.validation) {
      this.props.validation(value, target, e)
    }
  };

  validate = () => {
    const target = ReactDom.findDOMNode<HTMLSelectElement>(this.refs["apollos-select"]);
    const value = target.value;

    if (!value) {
      this.setState({
        active: false,
        error: false
      });
    }

    this.setState({
      focused: false
    });

    if (this.props.validation && typeof(this.props.validation) === "function") {
      this.setState({
        error: !this.props.validation(value, target, null)
      });

    }
  };

  render(): JSX.Element {

    let inputclasses = [
      "input"
    ];

    // theme overwrite
    if (this.props.theme) inputclasses = this.props.theme.split(" ");
    // state mangaged classes
    if (this.state.active) inputclasses.push("input--active");
    if (this.state.focused) inputclasses.push("input--focused");
    if (this.state.error) inputclasses.push("input--alert");
    // custom added classes
    if (this.props.classes) inputclasses = inputclasses.concat(this.props.classes);

    if (this.props.selected) inputclasses.push("input--active");

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
                disabled ={
                  this.disabled()
                }
              />
            )
          }
        })()};

        <select
          ref="apollos-select"
          id={this.props.id || this.props.label || this.props.name}
          placeholder={this.props.placeholder || this.props.label}
          name={this.props.name || this.props.label }
          className={this.props.inputClasses}
          disabled={this.disabled()}
          onFocus={this.focus}
          onChange={this.onChangeEvent}
          defaultValue={this.props.defaultValue}
          value={this.props.selected}

        >
          {(() => {
            if (this.props.placeholder || this.props.includeBlank) {
              return (
                <option style={{display:"none"}}>{this.props.placeholder || ""}</option>
              )
            }
          })()}
          {(() => {
            if (this.props.deselect) {
              return (
                <option></option>
              )
            }
          })()}
          {(() => {
            if(this.props.items) {
              return this.props.items.map((option, key) => {
                return (
                  <option
                    className={this.props.optionClasses}
                    value={option.value  || option.label}
                    key={key}
                  >
                    {option.label || option.value}
                  </option>
                );
              })
            }
          })()}
        </select>



        {this.renderHelpText(null)}

      </div>
    );

  };

}

// <ReactSelect
//   ref="apollos-select"
//   id={this.props.id || this.props.label || this.props.name}
//   placeholder={this.props.placeholder}
//   name={this.props.name || this.props.label }
//   className={this.props.inputClasses}
//   disabled={this.disabled()}
//   onFocus={this.focus}
//   onChange={this.change}
//   value={this.props.defaultValue}
//   options={this.props.items}
//   multi={false}
//   searchable={false}
//   clearable={false}
// />
