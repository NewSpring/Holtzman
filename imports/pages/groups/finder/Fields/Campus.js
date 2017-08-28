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
  static propTypes = {
    campuses: PropTypes.array.isRequired,
    selectedCampus: PropTypes.string.isRequired,
    campusOnChange: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    iconFill: PropTypes.string,
    iconWidth: PropTypes.string,
    iconHeight: PropTypes.string,
    iconTitle: PropTypes.string,
  };

  state: {
    focused: boolean,
    campus: string,
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      focused: false,
      campus: "",
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("touchstart", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("touchend", this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.selectedCampus) {
      this.setState({
        campus: nextProps.selectedCampus,
      });
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event: Event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        focused: false,
      });
    }
  }

  setFocus = (e: Event) => {
    this.setState({
      focused: !this.state.focused,
    });
  };

  onClick = (e: Event) => {
    const campus = e.target.name;
    this.setState({
      campus,
    });

    if (!Meteor.isCordova) {
      this.setFocus();
    }

    this.props.campusOnChange(campus);
  };

  onBlur = event => {
    if (event.type === "keydown" && event.keyCode === 9) {
      if (!Meteor.isCordova) {
        this.setFocus();
      }
    }
  };

  render() {
    const {
      campuses,
      campusOnChange,
      selectedCampus,
      iconName,
      iconFill,
      iconWidth,
      iconHeight,
      iconTitle,
    } = this.props;
    const { campus } = this.state;

    return (
      <div
        style={this.state.focused ? focusedInput : hiddenInput}
        className={"soft-double-top text-left soft-half-sides"}
        ref={this.setWrapperRef}
        onKeyDown={this.onBlur}
        onFocus={this.setFocus}
        onTouchStart={this.setFocus}
      >
        <Forms.Input
          classes={this.state.focused ? "soft-bottom" : ""}
          inputClasses={
            "outlined--dotted outlined--light h6 flush-bottom text-black"
          }
          style={{ textTransform: "capitalize" }}
          type="text"
          label={"Campus"}
          labelStyles={{ pointerEvents: "none" }}
          name="campus"
          defaultValue={campus}
          iconName={iconName}
          iconFill={iconFill}
          iconWidth={iconWidth}
          iconHeight={iconHeight}
          iconTitle={iconTitle}
          readOnly
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
              <span
                className="soft-half-top"
                style={{ textTransform: "capitalize" }}
              >
                {c}
              </span>
            </Forms.Checkbox>,
          )}
        </div>
      </div>
    );
  }
}
