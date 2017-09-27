import PropTypes from 'prop-types';
import { Component } from "react";
import Forms from "../../../../components/@primitives/UI/forms";
import Svg from "../../../../components/@primitives/UI/svg";

export default class Location extends Component {
  node: Object;

  state: {
    focused: boolean,
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    validation: PropTypes.func.isRequired,
    zip: PropTypes.string,
    disabled: PropTypes.bool,
    unLocate: PropTypes.func,
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  onFocus = () => {
    this.setState({
      focused: true,
    });
  };

  onBlur = () => {
    this.setState({
      focused: false,
    });
  };

  render() {
    const { onChange, validation, disabled, unLocate, zip } = this.props;

    return (
      <div className={"text-left soft-double-top soft-top@handheld soft-half-sides"}>
        <Forms.Input
          classes={this.state.focused ? "input--focused" : ""}
          inputClasses={"outlined--dotted outlined--light h6 flush-bottom text-black"}
          label={"Zip Code"}
          defaultValue={zip}
          type="text"
          name="zip"
          id="zip"
          validation={validation}
          onChange={onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          errorText="Please enter a valid zip code"
          disabled={disabled}
          ignoreLastPass
        >
          <a
            id="locationButton"
            style={{
              position: "absolute",
              right: "0",
              backgroundColor: "#FFFFFF",
              top: "-5px",
              paddingLeft: "5px",
            }}
            onClick={unLocate}
          >
            <Svg
              name={"location"}
              fill={this.state.focused ? "#6BAC43" : "#505050"}
              width={"24px"}
              height={"24px"}
              title={"Location Icon"}
            />
          </a>
        </Forms.Input>
      </div>
    );
  }
}
