import { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import { search as searchActions } from "../../../../data/store";

import Live from "../live";

class HeaderWithoutData extends Component {
  static propTypes = {
    showSettings: PropTypes.bool,
    dispatch: PropTypes.func,
    light: PropTypes.bool,
    visible: PropTypes.bool,
    isSearch: PropTypes.bool,
    color: PropTypes.string,
    searching: PropTypes.bool,
    searchSubmit: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    text: PropTypes.string,
    subText: PropTypes.string,
    fontWeight: PropTypes.string,
  };

  showSettings = () => {
    if (this.props.showSettings) {
      return (
        <Link
          to="/profile/settings"
          className="text-light-primary plain soft-half-top soft-half-right overlay__item locked-top locked-right"
        >
          <i className="icon-settings h4" />
        </Link>
      );
    }
    return undefined;
  };

  cancelSearch = event => {
    event.preventDefault();
    const { dispatch } = this.props;

    dispatch(searchActions.searching(false));
    dispatch(searchActions.term(null));
    this.searchInput.value = "";
  };

  render() {
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
          zIndex: 100,
        }}
      >
        <div
          className="text-center"
          style={{
            paddingTop: this.props.isSearch ? "0px" : "15px",
            paddingBottom: this.props.isSearch ? "0px" : "15px",
            backgroundColor: this.props.color,
            borderBottom: "1px solid rgba(0,0,0, 0.1)",
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
            return undefined;
          })()}
          {(() => {
            if (this.props.isSearch) {
              return (
                <form onSubmit={this.props.searchSubmit} className={"hard-ends soft-sides"} action>
                  <div className={"input hard-bottom"}>
                    <i className="icon-search locked-left push-half-top text-light-primary" />
                    <input
                      id="search"
                      ref={ref => (this.searchInput = ref)}
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
                <h6
                  className={`flush hard ${text} uppercase one-whole`}
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
              <h6
                className={`flush-bottom soft-sides ${text}`}
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontWeight: this.props.fontWeight || 700,
                }}
              >
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
                  zIndex: 100,
                }}
              >
                <h6
                  className={`flush-bottom soft-sides ${text}`}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: "normal",
                  }}
                >
                  {this.props.subText}
                </h6>
              </div>
            );
          }
          return undefined;
        })()}
        <Live />
      </div>
    );
  }
}

const map = ({ header, search }) => ({
  color: header.content.color || "#6BAC43",
  fontWeight: header.content.fontWeight || 700,
  light: header.content.light,
  text: header.content.title,
  subText: header.content.subTitle,
  visible: header.visible,
  isSearch: header.content.isSearch,
  showSettings: header.content.showSettings,
  searchSubmit: header.content.searchSubmit,
  searchTerm: search.term,
  searching: search.searching,
});

const withRedux = connect(map);

export default withRedux(HeaderWithoutData);

export { HeaderWithoutData, map, withRedux };
