import { Component, PropTypes } from "react";
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
    disable: PropTypes.bool,
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  setFocus = () => {
    this.setState({
      focused: !this.state.focused,
    });
  };

  render() {
    const { zip, onChange, validation, disabled } = this.props;

    return (
      <div className={"text-left soft-double-top soft-half-sides"}>
        <Forms.Input
          ref={input => {
            this.node = input;
          }}
          inputClasses={
            "outlined--dotted outlined--light h6 flush-bottom text-black"
          }
          label={"Zip Code"}
          defaultValue={zip}
          type="text"
          name="Zip"
          id="zip"
          validation={validation}
          onChange={onChange}
          onFocus={this.setFocus}
          onBlur={this.setFocus}
          errorText="Please enter a valid zip code"
          disabled={disabled}
          ignoreLastPass
        >
          <button
            id="locationButton"
            style={{
              position: "absolute",
              right: "0",
              backgroundColor: "#FFFFFF",
              top: "-1px",
              paddingLeft: "5px",
              pointerEvents: "none",
            }}
            onClick={e => e.preventDefault()}
          >
            <Svg
              name={"location"}
              fill={this.state.focused ? "#6BAC43" : "#505050"}
              width={"24px"}
              height={"24px"}
              title={"Location Icon"}
            />
          </button>
        </Forms.Input>
      </div>
    );
  }
}
