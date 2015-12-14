import { Component, PropTypes } from "react"
import ReactDom from "react-dom"
import { Link, IndexLink } from "react-router"

export default class NavLink extends Component {

  static propTypes = {
    navItem: PropTypes.object.isRequired
  }


  linkClasses(link) {
    let classes = [
      "floating__item",
      "text-light-primary",
      "soft-sides@handheld",
      "soft-half-ends@lap-and-up",
      "one-whole@lap-and-up",
      "plain"
    ];
    return classes.join(" ")
  }

  handleAction = (e) => {
    const { navItem } = this.props

    if (navItem.action) {
      e.preventDefault();
      this.props.handleAction(navItem.action())
    }
  }

  render () {
    const iconClasses = `${this.props.navItem.icon} display-block`;
    const { navItem } = this.props
    let Wrapper = Link

    if (navItem.link === "/") {
      Wrapper = IndexLink
    }

    if (!navItem.link) {
      Wrapper = class ALink extends Component {
        render() {
          return (
            <button {...this.props}>
              {this.props.children}
            </button>
          )
        }
      }
    }

    return (
      <Wrapper
        to={navItem.link}
        className={this.linkClasses(navItem.link)}
        onClick={this.handleAction}
        activeClassName="text-brand"
      >
        <div className="floating__item">
          <i className={iconClasses}></i>
          <h7>
            <small className="text-center">{navItem.label}</small>
          </h7>
        </div>
      </Wrapper>
    )
  }
}
