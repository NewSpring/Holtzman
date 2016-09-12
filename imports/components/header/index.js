
import { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import { search as searchActions } from "../../store";

import Live from "../live";

@connect((state) => ({
  color: state.header.content.color || "#6BAC43",
  light: state.header.content.light,
  text: state.header.content.title,
  subText: state.header.content.subTitle,
  visible: state.header.visible,
  isSearch: state.header.content.isSearch,
  showSettings: state.header.content.showSettings,
  searchSubmit: state.header.content.searchSubmit,
  searchTerm: state.search.term,
  searching: state.search.searching,
}))
export default class Header extends Component {

  showSettings = () => {
    if (this.props.showSettings) {
      return (
      <Link to="/profile/settings" className="text-light-primary plain soft-half-top soft-half-right overlay__item locked-top locked-right">
        <i className="icon-settings h4" />
      </Link>
      );
    }
  }

  cancelSearch = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;

    dispatch(searchActions.searching(false));
    dispatch(searchActions.term(null));
    this.searchInput.value = "";
  }

  render () {
    const lightColor = "text-light-primary";
    const darkColor = "text-dark-primary";

    let text = lightColor;
    if (!this.props.light) {
      text = darkColor;
    }

    if (!this.props.visible) {
      return <Live />;
    }

    return (
      <div
          style={{
          position: "relative",
          zIndex: 100
        }}
      >
        <div
            className="text-center"
            style={{
            paddingTop: this.props.isSearch ? "0px" : "15px",
            paddingBottom: this.props.isSearch ? "0px" : "15px",
            backgroundColor: this.props.color,
            borderBottom: "1px solid rgba(0,0,0, 0.1)"
          }}
        >
          {(() => {
            if (this.props.searching) {
              return (
                <button
                    onClick={this.cancelSearch}
                    className="locked-right push-right text-light-secondary"
                    style={{ marginTop: "13px", zIndex: 1 }}
                >
                  <small>Cancel</small>
                </button>
              );
            }
          })()}
          {(() => {
            if (this.props.isSearch) {
              return (
                <form
                    onSubmit={this.props.searchSubmit}
                    className={"hard-ends soft-sides"}
                    action
                >
                  <div className={"input hard-bottom"}>
                    <i className="icon-search locked-left push-half-top text-light-primary" />
                    <input
                        id="search"
                        ref={(ref) => this.searchInput = ref}
                        type="text"
                        name="search"
                        className="h5 text-light-primary"
                        autoComplete="off"
                        style={{ paddingLeft: "30px", borderBottom: "none", marginTop: "7px" }}
                        placeholder="Type your search here..."
                    />
                  </div>
                </form>
              );
            }

            if (this.props.text === "default" || this.props.text === "NewSpring") {
              return (
                <h6 className={`flush hard ${text} uppercase one-whole`}
                    style={{
                    fontWeight: 900,
                    letterSpacing: "1px",
                  }}
                >
                  NewSpring Church
                </h6>
              );
            }

            return (
              <h6 className={`flush-bottom soft-sides ${text}`} style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: 700,
              }}>
                {this.props.text}
                {this.showSettings()}
              </h6>
            );
          })()}

        </div>

        {(() => {
          if (this.props.subText) {
            return (
              <div
                  className="text-center"
                  style={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  backgroundColor: this.props.color,
                  position: "relative",
                  zIndex: 100
                }}
              >
                <h6 className={`flush-bottom soft-sides ${text}`} style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontWeight: "normal"
                }}>
                  {this.props.subText}
                </h6>
              </div>
            );
          };
        })()}
        <Live />
      </div>
    );
  }
}
