
import { Component, PropTypes } from "react"
import { connect } from "react-redux"

@connect((state) => ({
  color: state.header.content.color || "#6BAC43",
  light: state.header.content.light,
  text: state.header.content.title,
  subText: state.header.content.subTitle,
  visible: state.header.visible,
  isSearch: state.header.content.isSearch
}))
export default class Header extends Component {

  render () {
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
      <div>
        <div
          className="text-center"
          style={{
            paddingTop: "15px",
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
                <h6 className={`flush hard text-light-primary uppercase one-whole`}
                  style={{
                    fontWeight: 900,
                    letterSpacing: "1px",
                  }}>
                  SEARCH
                </h6>
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
          }
        }())}
      </div>
    )
  }
}
