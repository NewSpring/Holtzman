import PropTypes from 'prop-types';
import { Component } from "react";
import { css } from "aphrodite";
import Forms from "../../../../components/@primitives/UI/forms";
import Tag from "../../../../components/@primitives/UI/tags";
import Styles from "./styles-css";

const focusedInput = {
  border: "1px solid #f0f0f0",
  borderRadius: 7,
  boxShadow: "0px 2px 9px #DDD",
  backgroundColor: "#FFFFFF",
  textTransform: "captialize",
  position: "relative",
  zIndex: 99,
};

const hiddenInput = {
  border: 0,
};

export default class Keywords extends Component {
  timeout: number;
  textInput: Object;

  static propTypes = {
    tags: PropTypes.array.isRequired,
    searchQuery: PropTypes.array.isRequired,
    tagOnClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state: {
    focused: boolean,
    onload: boolean
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      focused: false,
      onload: true,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("touchstart", this.handleClickOutside);
    document.addEventListener("touchmove", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("touchstart", this.handleClickOutside);
    document.removeEventListener("touchmove", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  // /**
  //  * Alert if clicked on outside of element
  //  */
  handleClickOutside(e: Event) {
    if (
      e.type !== "touchmove" &&
      this.wrapperRef &&
      !this.wrapperRef.contains(e.target) &&
      this.state.focused
    ) {
      this.timeout = setTimeout(() => {
        this.onBlur();
      }, 250);
    } else if (e.type === "touchmove") {
      clearTimeout(this.timeout);
    }
  }

  onFocus = () => {
    if (!this.state.focused && this.textInput) {
      this.textInput.node.focus();
    }
    this.setState({ focused: true });
  };

  onBlur = () => {
    this.setState({
      focused: false,
    });
  };

  onTab = (e: Event) => {
    if (e.type === "keydown" && e.keyCode === 9) {
      this.setState({
        focused: false,
      });
    }
  };

  render() {
    const { tags, tagOnClick, searchQuery, onChange } = this.props;

    const selectedTags = searchQuery
      .split(/[, ]+/)
      .map(t => t.toLowerCase())
      .reduce((result, t, index, original) => {
        if (t === "kid" && original[index + 1] === "friendly") {
          result.push("kid friendly");
        } else if (t !== "friendly" && original[index - 1] !== "kid") {
          result.push(t.toLowerCase());
        }

        return result;
      }, []);

    const arrowFocus = css(this.state.focused ? Styles.arrowFocused : Styles.arrow);

    return (
      <div
        style={this.state.focused ? focusedInput : hiddenInput}
        className={"soft-double-top text-left soft-half-sides"}
        ref={this.setWrapperRef}
        onFocus={this.onFocus}
        onKeyDown={this.onTab}
      >
        <Forms.Input
          classes={this.state.focused ? "soft-bottom" : ""}
          ref={input => {
            this.textInput = input;
          }}
          inputClasses={"outlined--dotted outlined--light h6 flush-bottom text-black"}
          type="text"
          label={"Groups I'm looking for..."}
          name="query"
          defaultValue={searchQuery}
          onChange={onChange}
          autoComplete={false}
          autoCorrect={false}
          autoCapitalize={false}
          spellCheck={false}
          ignoreLastPass
        >
          <a
            id="keywordButton"
            style={{
              position: "absolute",
              right: "0",
              backgroundColor: "#FFFFFF",
              top: "-5px",
              paddingLeft: "5px",
            }}
            onClick={this.state.focused ? this.onBlur : this.onFocus}
          >
            <div className={("one-whole", "display-inline-block", `${arrowFocus}`)} />
          </a>
        </Forms.Input>
        <div
          className={`push-half-sides push-half-bottom ${!this.state.focused
            ? "visuallyhidden"
            : ""}`}
        >
          {/* weird SSR stuff here to investigate */}
          {tags.map((tag, i) => (
            <Tag
              className=""
              style={{ textTransform: "capitalize" }}
              onClick={tagOnClick}
              key={i}
              val={tag.value}
              active={selectedTags.indexOf(tag.value.toLowerCase()) + 1}
              urlKey="tags"
            />
          ))}
        </div>
      </div>
    );
  }
}
