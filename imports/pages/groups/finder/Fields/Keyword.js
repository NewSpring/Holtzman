import { Component, PropTypes } from "react";
import Forms from "../../../../components/@primitives/UI/forms";
import Tag from "../../../../components/@primitives/UI/tags";

const focusedInput = {
  border: "1px solid #f0f0f0",
  borderRadius: 7,
  boxShadow: "0px 2px 9px #DDD",
  backgroundColor: "#FFFFFF",
  position: "absolute",
  zIndex: 99,
};

const hiddenInput = {
  border: 0,
};

export default class Keywords extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    selectedTags: PropTypes.array.isRequired,
    tagOnClick: PropTypes.func.isRequired,
    inputOnChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
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
    this.setState({
      focused: focus,
    });
  }

  render() {
    const { tags, tagOnClick, selectedTags, onChange } = this.props;

    return (
      <div
        style={this.state.focused ? focusedInput : hiddenInput}
        className={`soft-double-top text-left ${this.state.focused ? "soft-half-sides" : ""}`}
        ref={this.setWrapperRef}
      >
        <Forms.Input
          classes={this.state.focused ? "soft-bottom" : ""}
          inputClasses={"outlined--dotted outlined--light h6 flush-bottom text-black"}
          type="text"
          label={"I'm looking for..."}
          name="keywords"
          defaultValue={selectedTags.join(", ")}
          onChange={e => onChange(e)}
          onFocus={e => this.setFocus(true)}
        />
        <div className={`push-half-sides push-half-bottom ${!this.state.focused ? "visuallyhidden" : ""}`}>
          {/* weird SSR stuff here to investigate */}
          {tags.map((tag, i) => <Tag className="" onClick={tagOnClick} key={i} val={tag.value} active={selectedTags.indexOf(tag.value) + 1} />)}
        </div>
      </div>
    );
  }
}
