import { Component, PropTypes } from "react";
import Forms from "../../../../components/@primitives/UI/forms";

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
  state: {
    focused: boolean,
    campus: string,
    onload: boolean
  };

  static propTypes = {
    campuses: PropTypes.array.isRequired,
    selectedCampus: PropTypes.string.isRequired,
    campusOnChange: PropTypes.func.isRequired,
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      focused: false,
      campus: "",
      onload: true,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    // this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("touchstart", this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.selectedCampus) {
      this.setState({
        campus: nextProps.selectedCampus,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("touchend", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        focused: false,
      });
    }
  }

  setFocus = () => {
    const focused = this.state.onload && this.props.selectedCampus ? false : !this.state.focused;

    this.setState({
      focused,
      onload: false,
    });
  };

  buttonToggle = () => {
    this.setState({
      focused: !this.state.focused,
    });
  };

  onClick = (e: Event) => {
    const campus = e.target.name;
    this.setState({
      campus,
    });

    this.props.campusOnChange(campus);
  };

  render() {
    const { campuses } = this.props;
    const { campus } = this.state;

    return (
      <div
        style={this.state.focused ? focusedInput : hiddenInput}
        className={"soft-double-top text-left soft-half-sides"}
        ref={this.setWrapperRef}
      >
        <Forms.Input
          classes={this.state.focused ? "soft-bottom" : ""}
          inputClasses={"outlined--dotted outlined--light h6 flush-bottom text-black"}
          style={{ textTransform: "capitalize" }}
          type="text"
          label={"Campus"}
          labelStyles={{ pointerEvents: "none" }}
          name="campus"
          defaultValue={campus}
          readOnly={this.state.focused ? "readonly" : ""}
          onFocus={this.setFocus}
          iconName={this.state.focused ? "arrowUp" : "arrowDown"}
          iconFill={this.state.focused ? "#6BAC43" : "#505050"}
          iconWidth={"24px"}
          iconHeight={"24px"}
          iconTitle={this.state.focused ? "Arrow Up Icon" : "Arrow Down Icon"}
          iconButtonToggle={this.buttonToggle}
        />
        <div
          className={`push-half-sides push-half-bottom ${!this.state.focused
            ? "visuallyhidden"
            : "display-inline-block"}`}
        >
          {/* weird SSR stuff here to investigate */}
          {campuses.map((c, i) =>
            <Forms.Checkbox
              classes={[
                "soft-half-bottom",
                "float-left@lap-and-up",
                "one-half@lap-and-up",
                "display-inline-block@lap-and-up",
              ]}
              defaultChecked={campus === c ? "defaultChecked" : ""}
              name={c}
              key={i}
              clicked={this.onClick}
            >
              <span className="soft-half-top" style={{ textTransform: "capitalize" }}>
                {c}
              </span>
            </Forms.Checkbox>
          )}
        </div>
      </div>
    );
  }
}
