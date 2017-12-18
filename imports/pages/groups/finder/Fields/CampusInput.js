import PropTypes from "prop-types";
import { Component } from "react";
import Forms from "../../../../components/@primitives/UI/forms";
import Svg from "../../../../components/@primitives/UI/svg";

const focusedInput = {
  border: "1px solid #f0f0f0",
  borderRadius: 7,
  boxShadow: "0px 2px 9px #DDD",
  backgroundColor: "#FFFFFF",
  display: "block",
  textTransform: "captialize",
  position: "relative",
  zIndex: 99,
};

const hiddenInput = {
  border: 0,
};

export default class Campus extends Component {
  textInput: Object;

  state: {
    focused: boolean,
    campus: string,
    onload: boolean,
  };

  static propTypes = {
    campuses: PropTypes.array.isRequired,
    selectedCampus: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      focused: false,
      campus: props.selectedCampus,
      onload: true,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
    document.addEventListener("touchend", this.handleClick);
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.selectedCampus) {
      this.setState({
        campus: nextProps.selectedCampus.toLowerCase(),
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
    document.removeEventListener("touchend", this.handleClick);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClick(e: Event) {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target) && this.state.focused) {
      this.timeout = setTimeout(() => {
        this.onBlur();
      }, 100);
    }
  }

  validation = (value: any) => {
    if (this.props.campuses.indexOf(value) > -1 || value === "" || this.state.campus === "") {
      return true;
    }

    return false;
  };

  onClick = (e: Event) => {
    const campus = e.target.name || e.target.innerHTML; // eslint-disable-line

    this.setState({
      campus,
      onload: false,
    });

    this.props.onChange(campus, { name: "campus" });
  };

  onFocus = () => {
    if (!this.state.onload || !this.state.campus) {
      if (!this.state.focused && this.textInput) {
        this.textInput.node.focus();
      }
      this.setState({
        focused: true,
        onload: false,
      });
    } else {
      this.setState({
        onload: false,
      });
    }
  };

  onBlur = () => {
    this.timeout = setTimeout(() => {
      this.setState({
        focused: false,
        onload: false,
      });
    }, 200);
  };

  render() {
    const { onChange, campuses } = this.props;

    return (
      <div
        style={this.state.focused ? focusedInput : hiddenInput}
        className={"soft-double-top soft-top@handheld text-left soft-half-sides"}
        ref={this.setWrapperRef}
      >
        {/* onFocus === This is a hack because onFocus
          is the only event that fires on a readonly input */}
        <Forms.Input
          classes={this.state.focused ? "soft-bottom" : ""}
          inputClasses={"outlined--dotted outlined--light h6 flush-bottom text-black"}
          ref={input => {
            this.textInput = input;
          }}
          style={{ textTransform: "capitalize" }}
          type="text"
          label={"Campus"}
          validation={this.validation}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={onChange}
          labelStyles={{ pointerEvents: "none" }}
          name="campus"
          defaultValue={this.state.campus}
          ignoreLastPass
          autoComplete={false}
          autoCorrect={false}
          autoCapitalize={false}
          spellCheck={false}
        >
          <a
            id="campusButton"
            style={{
              position: "absolute",
              right: "0",
              backgroundColor: "#FFFFFF",
              top: "-5px",
              paddingLeft: "5px",
            }}
            onClick={this.state.focused ? this.onBlur : this.onFocus}
          >
            <Svg
              name={this.state.focused ? "arrowUp" : "arrowDown"}
              fill={this.state.focused ? "#6BAC43" : "#505050"}
              width={"24px"}
              height={"24px"}
              title={this.state.focused ? "Arrow Up Icon" : "Arrow Down Icon"}
            />
          </a>
        </Forms.Input>
        <div
          className={`push-half-sides push-half-bottom ${!this.state.focused
            ? "visuallyhidden"
            : "display-inline-block"}`}
        >
          {/* weird SSR stuff here to investigate */}
          {campuses.map((c, i) => (
            <Forms.Checkbox
              classes={[
                "soft-half-bottom",
                "float-left@lap-and-up",
                "one-half@lap-and-up",
                "display-inline-block@lap-and-up",
              ]}
              defaultChecked={this.state.campus === c ? "defaultChecked" : ""}
              name={c}
              key={i}
              clicked={this.onClick}
            >
              <span className="soft-half-top" style={{ textTransform: "capitalize" }}>
                {c}
              </span>
            </Forms.Checkbox>
          ))}
        </div>
      </div>
    );
  }
}
