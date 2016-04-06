
import * as React from "react";
import { Component, PropTypes, HTMLProps, SyntheticEvent } from "react";
import * as ReactDom from "react-dom";

import Label from "./components/Label";

export declare interface CheckboxProps {
  defaultValue?: string;
  id?: string;
  type?: string;
  status?: string;
  name?: string;
  disabled?: boolean;
  classes?: Array<string>;
  inputClasses?: Array<string>;
  errorText?: string;
  theme?: string;
  label?: string;
  hideLabel?: boolean;
  clicked?(value: string, element: HTMLInputElement, e: SyntheticEvent): void;
  // validation?(value: string, element: HTMLInputElement, e: SyntheticEvent): boolean;
};

export declare interface CheckboxState {
  status: boolean;
  error: boolean;
};

export default class Checkbox extends Component<CheckboxProps, {}> {

  public state: CheckboxState = {
    status: false,
    error: false,
  };

  // What exactly would you validate a checkbox for?
  //
  // validate = (e: SyntheticEvent): void => {
  //   const value = e.target.value;

  //   if (!value) {
  //     this.setState({
  //       active: false,
  //       error: false
  //     })
  //   }

  //   if (this.props.validation && typeof(this.props.validation) === "function") {
  //     this.setState({
  //       error: !this.props.validation(value),
  //     });

  //   }
  // };

  setStatus = (message: string): void => {
    this.props.status = message;
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

  render () {
    let inputclasses = [
      "input"
    ];

    // theme overwrite
    if (this.props.theme) inputclasses = this.props.theme.split(" ");
    // state mangaged classes
    if (this.state.status) inputclasses.push("push-double-bottom");

    if (this.props.type) {
      inputclasses.push(this.props.type);
    } else {
      inputclasses.push("checkbox");
    }

    if (this.state.error) inputclasses.push("input--alert");
    // custom added classes
    if (this.props.classes) inputclasses = inputclasses.concat(this.props.classes);


    return (
      <div className={inputclasses.join(" ")}>

        <h6 className="soft-left push-half-left flush-bottom text-left float-left locked-top">
          <small>
            {this.props.children}
          </small>
        </h6>

        <input
          ref={this.props.id || this.props.label || this.props.name}
          id={this.props.id || this.props.label || this.props.name}
          type={this.props.type || "checkbox"}
          name={this.props.name || this.props.label }
          className={this.props.inputClasses}
          disabled={this.disabled()}
          defaultChecked={this.props.defaultValue ? "checked": ""}
          onClick={this.props.clicked}
          style={{width: 0}}
        />

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
                disabled={this.disabled()}
              />
            )
          }
        })()}

        {this.renderHelpText()}
      </div>
    )
  }
}
