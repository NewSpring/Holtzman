
import { Component, PropTypes } from "react"
import { connect } from "react-redux"

@connect((state) => {
  return {
    color: state.header.content.color || "#6BAC43",
    light: state.header.content.light,
    text: state.header.content.title,
    visible: state.header.visible,
    isSearch: state.header.content.isSearch
  };
})
export default class Header extends Component {

  render () {
    console.log(this.props);
    const lightColor = "text-light-primary";
    const darkColor = "text-dark-primary";

    let text = lightColor;
    if (!this.props.light) {
      text = darkColor;
    }

    if (!this.props.visible) {
      return null;
    }
    return (
      <div
        className="text-center"
        style={{
          paddingTop: this.props.isSearch ? "0" : "15px",
          paddingBottom: "15px",
          backgroundColor: this.props.color,
          borderBottom: "1px solid rgba(0,0,0, 0.1)",
          position: "relative",
          zIndex: 100
        }}
      >
      {(() => {
        if (this.props.isSearch) {
          return (
            <form onSubmit={this.props.searchSubmit} className={`hard-ends soft-sides`}>
              <div className={`input hard-bottom`}>
                <i className="icon-search locked-left push-half-top text-light-primary"></i>
                <input
                  id="search"
                  type="text"
                  className="h5 text-light-primary"
                  autoComplete="off"
                  style={{ paddingLeft: "30px", borderBottom: "none", marginTop: "7px" }}
                />
              </div>
            </form>
          )
        }

        if (this.props.text === "default") {
          return (
            <h6 className={`flush hard ${text} uppercase one-whole`}
              style={{
                fontWeight: 900,
                letterSpacing: "1px",
              }}>
              NewSpring
            </h6>
          )
        }

        return (
          <h6 className={`flush-bottom soft-sides ${text}`} style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {this.props.text}
          </h6>
        )
      })()}

      </div>
    )
  }
}
