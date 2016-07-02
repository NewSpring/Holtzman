import { Component, PropTypes } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux"

@withRouter
@connect((state) => ({ location: state.routing.location }))
export default class Tag extends Component {

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    clickAble: PropTypes.bool,
    active: PropTypes.bool,
    val: PropTypes.string.isRequired,
  }

  static defaultProps = {
    className: "",
    style: {},
    clickAble: true,
  }

  state = { isActive: false }

  componentWillMount() {
    if (this.props.active || this.isInQueryString()) {
      this.setState({ isActive: true });
    }
  }

  isInQueryString = () => {
    const { val } = this.props;
    const { query } = this.props.location;
    if (!query || !query.tags) return false;

    const tags = query.tags.toLowerCase().split(",").filter(x => x);
    return tags.indexOf(val.toLowerCase()) > -1;
  }

  onClick = (e) => {
    if (e) e.stopPropagation();
    let { val, onClick, router, location, clickAble } = this.props;

    if (!clickAble) return null;

    this.setState({ isActive: !this.state.isActive });

    if (onClick) {
      onClick(val);
      return;
    }

    val = val.toLowerCase();
    let tags = [];
    if (location.query && location.query.tags) {
      tags = location.query.tags.split(",");
    }

    if (tags.indexOf(val) > -1) {
      // remove the tag from the query string
      tags.splice(tags.indexOf(val), 1);
    } else {
      tags.push(val)
    }

    tags = tags.filter(x => x)

    if (!tags.length) {
      // XXX determine if this is the only search param
      delete location.query
    } else {
      location.query.tags = tags.join(",")
    }
    const newPath = router.createPath(location);
    router.replace(newPath);
  }

  render() {
    const { className, style, clickAble, val } = this.props;
    let classes = [
      "tag",
      "push-half-right"
    ];
    if (clickAble) classes.push("tag--clickable");
    if (this.state.isActive) classes.push("tag--active");

    return (
      <span
        className={`${classes.join(" ")} ${className}`}
        style={style}
        onClick={this.onClick}
      >
        {val}
      </span>
    )
  }
}
