
// XXX figure out why enzyme needs this
import * as React from "react";
import { Component, PropTypes, HTMLProps, SyntheticEvent } from "react";
import * as ReactDom from "react-dom";
// XXX refactor with just lodash.assign / we get typings for lodash.assign
import { assign } from "lodash";

import Label from "./components/Label";

export enum InputType {
  "email",
  "text",
  "tel",
};

export declare interface InputProps {
  defaultValue?: string;
  autofocus?: boolean; // triggers the input to focus on render
  value?: string ;
  format?(value: string, element: HTMLInputElement, e: SyntheticEvent): string;
  onChange?(value: string, element: HTMLInputElement, e: SyntheticEvent): void;
  validation?(value: string, element: HTMLInputElement, e: SyntheticEvent): boolean;
  onBlur?(value: string, element: HTMLInputElement, e: SyntheticEvent): void;
  status?: string; // XXX needs better name
  disabled?: boolean;
  errorText?: string;
  style?: HTMLProps<HTMLStyleElement>;
  classes?: Array<string>; // XXX containerClasses
  theme?: string;
  hideLabel?: boolean;
  id?: string;
  name?: string;
  label?: string;
  ref?: string;
  type?: InputType;
  placeholder?: string;
  inputClasses?: Array<string>;
  maxLength?: number;
};

export declare interface InputState {
  active: boolean;
  focused: boolean;
  error: boolean;
  status: string;
};

export default class Input extends Component<InputProps, {}> {

  private interval: number;
  private _previousValue: string;

  refs: {
    [key: string]: Element;
    "apollos-input": HTMLInputElement;
  };

  // static propTypes = {
  //   defaultValue: PropTypes.any,
  // }

  public state: InputState = {
    active: false,
    focused: false,
    error: false,
    status: "",
  };

  componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({ active: true })
    }
  };

  componentDidMount() {
    if (this.props.autofocus) {
      this.refs["apollos-input"].focus();
    }

    // one day, I dream of a universal browser auto-fill event
    // until then. I'll keep on checking
    const target = ReactDom.findDOMNode<HTMLInputElement>(this.refs["apollos-input"]);
    this.interval = setInterval(() => {

      if (this._previousValue === target.value || !target.value) {
        return;
      }

      if (!this._previousValue && target.value && !this.state.focused) {
        this.setValue(target.value);
      }

      this._previousValue = target.value;

    }, 20)

    // set value on re-render
    if (this.props.value) {
      this.setValue(`$${this.props.value}`);
    }
  };

  componentWillUpdate(nextProps){
    if (this.props.defaultValue != nextProps.defaultValue) {
      this.setValue(nextProps.defaultValue);
      this.setState({focused: false});
    }
  };

  componentWillUnmount(){
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  format = (e: SyntheticEvent): void => {

    const target = ReactDom.findDOMNode<HTMLInputElement>(this.refs["apollos-input"]);
    let value = this.refs["apollos-input"].value;

    if (this.props.format && typeof(this.props.format) === "function") {
      const newValue = this.props.format(value, target, e);
      target.value = newValue;
    }

    if (this.props.onChange && typeof(this.props.onChange) === "function") {
      this.props.onChange(target.value, target, e);
    }
  };

  validate = (e: SyntheticEvent): void => {

    const target = ReactDom.findDOMNode<HTMLInputElement>(this.refs["apollos-input"]);
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
        error: !this.props.validation(value, target, e),
      });
    }

    if (this.props.onBlur && typeof(this.props.onBlur) === "function") {
      this.props.onBlur(value, target, e);
    }
  };

  focus = (): void => {
    this.setState({
      active: true,
      error: false,
      focused: true,
    });
  };

  setValue = (value: string): void => {
    let node = ReactDom.findDOMNode<HTMLInputElement>(this.refs["apollos-input"]);
    node.value = value;
    this.focus();
    this.validate(null);
  };

  getValue = (): string => {
    return ReactDom.findDOMNode<HTMLInputElement>(this.refs["apollos-input"]).value;
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

  renderHelpText = (): JSX.Element => {

    if ((this.state.error && this.props.errorText) || this.state.status) {
      return (
        <span className="input__status">
          {this.props.errorText || this.state.status}
        </span>
      );
    }
  };

  style = (): HTMLStyleElement | any => {

    let style = {};

    if (this.props.style) {
      style = assign(style, this.props.style);
    }

    if (this.props.disabled) {
      style = assign(style, { cursor: "inherit" });
    }

    return style;
  };

  render() {
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

    return (
      <div className={inputclasses.join(" ")} style={this.props.style || {}}>
        {(() => {
          if (!this.props.hideLabel){
            return (
              <Label
                labelFor={
                  this.props.id || this.props.name || this.props.label
                }
                labelName={
                  this.props.label || this.props.name
                }
                disabled={this.disabled()}
              />
            )
          }
        })()}


        <input
          ref="apollos-input"
          id={this.props.id || this.props.ref || this.props.name || this.props.label}
          type={this.props.type}
          placeholder={this.props.placeholder || this.props.label}
          name={this.props.name || this.props.label }
          className={this.props.inputClasses}
          disabled={this.disabled()}
          onBlur={this.validate}
          onFocus={this.focus}
          onChange={this.format}
          defaultValue={this.props.defaultValue}
          style={this.style()}
          maxLength={this.props.maxLength || ""}
        />

        {this.props.children}

        {this.renderHelpText()}

      </div>
    );

  };

};
