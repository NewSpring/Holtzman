import { Component, PropTypes } from "react";
import Forms from "../../../../components/@primitives/UI/forms";
import Checkbox from "../../../../components/@primitives/UI/forms/Checkbox";

const focusedInput = {
  border: "1px solid #f0f0f0",
  borderRadius: 7,
  boxShadow: "0px 2px 9px #DDD",
  backgroundColor: "#FFFFFF",
  display: "block",
  // position: "absolute",
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
    this.setState({
      campus: nextProps.selectedCampus,
      numberOfCampuses: nextProps.campuses.length,
    });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setFocus(false);
    }
  }

  setFocus = (focus: Boolean) => {
    this.setState((prevState, props) => {
      let properFocus = false;

      if (focus && !prevState.focused) {
        properFocus = true;
      }

      return { focused: properFocus };
    });
  };

  onClick = (e: Event) => {
    this.setState({
      campus: e.target.name,
    });

    this.props.campusOnChange(e.target.name);
  };

  render() {
    const { campuses } = this.props;
    const { campus, focused } = this.state;

    return (
      <div
        style={focused ? focusedInput : hiddenInput}
        className={`soft-double-top text-left ${this.state.focused
          ? "soft-half-sides display-inline-block"
          : ""}`}
      >
        <Forms.Input
          classes={focused ? "soft-bottom" : ""}
          inputClasses={
            "outlined--dotted outlined--light h6 flush-bottom text-black"
          }
          type="text"
          label={"Campus"}
          name="campus"
          defaultValue={campus}
          onFocus={this.setFocus}
          readOnly="readonly"
        />
        <div
          className={`push-half-sides push-half-bottom ${!this.state.focused
            ? "visuallyhidden"
            : "display-inline-block"}`}
          ref={this.setWrapperRef}
        >
          {/* weird SSR stuff here to investigate */}
          {campuses.map((c, i) =>
            <Checkbox
              classes={[
                "soft-half-bottom",
                "float-left@lap-and-up",
                "one-half@lap-and-up",
                "display-inline-block@lap-and-up",
              ]}
              defaultChecked={campus === c.name ? "defaultChecked" : ""}
              name={c.name}
              style={{ textTransform: "capitalize" }}
              key={i}
              clicked={this.onClick}
            >
              <span className="soft-half-top">
                {c.name}
              </span>
            </Checkbox>,
          )}
        </div>
      </div>
    );
  }
}
