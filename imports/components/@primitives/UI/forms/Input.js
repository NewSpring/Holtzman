// @flow
import { Component } from "react";
import StripTags from "striptags";
import Label from "./Label";

type IRenderLabel = {
  hideLabel?: boolean,
  id: string,
  name: string,
  label: string,
  disabled?: boolean,
  style?: Object, // eslint-disable-line
};

const RenderLabel = ({
  hideLabel = false,
  id,
  name,
  label,
  disabled = false,
  style = {},
}: IRenderLabel) => {
  if (hideLabel) return null;
  return (
    <Label
      labelFor={id || name || label}
      labelName={label || name}
      disabed={disabled}
      labelStyles={style}
    />
  );
};

type IInputProps = {
  defaultValue: string,
  disabled?: boolean,
  validation: Function,
  errorText: string,
  type: string,
  classes: string | string[],
  children: any,
  id: string,
  label: string,
  labelStyles: Object,
  name: string,
  inputClasses: string,
  hideLabel?: boolean,
  autofocus?: boolean,
  autoCapitalize?: boolean,
  autoComplete?: boolean,
  autoCorrect?: boolean,
  spellCheck?: boolean,
  pattern: string,
  onInvalid: string,
  step: string,
  readOnly: string,
  ignoreLastPass: boolean,
  format: Function,
  onChange: Function,
  onFocus: Function,
  onBlur: Function,
  style: Object,
  value: string,
  placeholder: string,
  maxLength: number,
};

export default class Input extends Component {
  node: Object;
  interval: number;
  // this: IInput;
  _previousValue: string;
  props: IInputProps;

  state: {
    active: boolean,
    focused: boolean,
    error: boolean,
    value: ?string,
    autofocus: boolean,
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      active: Boolean(this.props.defaultValue),
      focused: false,
      error: false,
      value: null,
      autofocus: false,
    };
  }

  componentDidMount() {
    if (this.props.autofocus) {
      this.node.focus();
      this.focus();
    }

    // one day, I dream of a universal browser auto-fill event
    // until then. I'll keep on checking
    const target = this.node;
    this.interval = setInterval(() => {
      if (this._previousValue === target.value || !target.value) {
        // eslint-disable-line
        return;
      }

      if (
        !this._previousValue &&
        target.value &&
        !this.state.focused &&
        !this.state.value
      ) {
        // eslint-disable-line
        this.setValue(target.value);
      }

      this._previousValue = target.value; // eslint-disable-line
    }, 20);

    // set value on re-render
    if (this.props.value) {
      this.setValue(`${this.props.value}`);
    }
  }

  componentWillUpdate(nextProps: Object) {
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

  format = (e: Event) => {
    const target = this.node;
    // let value = this.node.value
    const value = this.getValue();

    if (this.props.format && typeof this.props.format === "function") {
      const newValue = this.props.format(value, target, e);
      target.value = newValue;
    }

    if (this.props.onChange && typeof this.props.onChange === "function") {
      this.props.onChange(target.value, target, e);
    }
  };

  validate = (e?: Event) => {
    const target = this.node;
    const value = this.getValue();

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
        error: !this.props.validation(value, target, e),
      });
    }

    if (this.props.onBlur && typeof this.props.onBlur === "function") {
      this.props.onBlur(value, target, e);
    } else {
      target.blur();
    }
  };

  focus = (e: ?Event) => {
    this.setState({
      active: true,
      error: false,
      focused: true,
    });

    const target = this.node;
    const value = this.getValue();

    if (this.props.onFocus && typeof this.props.onFocus === "function") {
      this.props.onFocus(value, target, e);
    }
  };

  setValue = (value: string) => {
    const node = this.node;
    // prevent XSS;
    if (this.props.name === "password") {
      node.value = value;
    } else {
      node.value = StripTags(value); // eslint-disable-line
    }

    this.setState({ value: node.value });
    this.focus();
    this.validate();
  };

  // http://stackoverflow.com/questions/5788527/is-strip-tags-vulnerable-to-scripting-attacks/5793453#5793453
  // prevent XSS;
  getValue = () => {
    if (this.props.name === "password") return this.node.value;
    return StripTags(this.node.value); // eslint-disable-line
  };

  disabled = () => {
    if (this.props.disabled) {
      return this.props.disabled;
    }
    return undefined;
  };

  renderHelpText = () => {
    if (this.state.error && this.props.errorText) {
      return (
        <span className="input__status" data-spec="help">
          {this.props.errorText}
        </span>
      );
    }
    return undefined;
  };

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

    if (this.props.pattern) {
      style = {
        ...style,
        ...{
          paddingLeft: ".8em",
        },
      };
    }

    return style;
  };

  classes = () => {
    let inputclasses = ["input"];

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

    return inputclasses.join(" ");
  };

  dollarIconClass = () => {
    if (this.props.pattern) {
      return `
        dollar--icon
        hard-top
        flush-bottom
        text-brand`;
    }
    return "";
  };

  render() {
    const {
      style,
      hideLabel,
      id,
      name,
      label,
      labelStyles,
      type,
      step,
      placeholder,
      inputClasses,
      defaultValue,
      readOnly,
      autoCapitalize,
      autoComplete,
      autoCorrect,
      spellCheck,
      ignoreLastPass,
      maxLength,
      children,
    } = this.props;

    return (
      <div
        className={this.classes()}
        style={style || {}}
        data-spec="input-wrapper"
      >
        <RenderLabel
          hideLabel={hideLabel}
          id={id}
          name={name}
          label={label}
          disabled={this.disabled()}
          style={labelStyles}
        />
        <span
          className={this.dollarIconClass()}
          style={
            this.state.focused || this.state.active ? {} : { color: "#858585" }
          }
        >
          <input
            ref={node => (this.node = node)}
            id={id || name || label}
            type={type}
            step={step}
            placeholder={placeholder || label}
            name={name || label}
            className={inputClasses}
            disabled={this.disabled()}
            onBlur={this.validate}
            onFocus={this.focus}
            onChange={this.format}
            readOnly={readOnly}
            defaultValue={defaultValue}
            style={this.style()}
            maxLength={maxLength || ""}
            autoComplete={
              autoComplete === true || autoComplete === undefined ? "on" : "off"
            }
            autoCorrect={
              autoCorrect === true || autoCorrect === undefined ? "on" : "off"
            }
            autoCapitalize={
              autoCapitalize === true || autoCapitalize === undefined
                ? "on"
                : "off"
            }
            spellCheck={spellCheck}
            data-spec="input"
            data-lpignore={ignoreLastPass}
          />
        </span>

        {children}

        {this.renderHelpText()}
      </div>
    );
  }
}
