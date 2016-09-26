import { Component, PropTypes } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

@withRouter
@connect(state => ({ location: state.routing.location }))
export default class Tag extends Component {

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    clickAble: PropTypes.bool,
    active: PropTypes.bool,
    val: PropTypes.string.isRequired,
    canBeActive: PropTypes.bool,
    label: PropTypes.string,
    urlKey: PropTypes.string,
    router: PropTypes.object,
    location: PropTypes.object,
  }

  static defaultProps = {
    className: "",
    style: {},
    clickAble: true,
    canBeActive: true,
    urlKey: "tags",
  }

  state = { isActive: false }

  componentWillMount() {
    if ((this.props.active || this.isInQueryString(this.props)) && this.props.canBeActive) {
      this.setState({ isActive: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.active || this.isInQueryString(nextProps)) && nextProps.canBeActive) {
      this.setState({ isActive: true });
    } else {
      this.setState({ isActive: false });
    }
  }

  onClick = (e) => {
    if (e) e.stopPropagation();
    let { val } = this.props;
    const { onClick, router, location, clickAble, canBeActive, urlKey } = this.props;

    if (!clickAble) return;

    if (canBeActive) this.setState({ isActive: !this.state.isActive });

    if (onClick) {
      onClick(val);
      return;
    }

    val = val.toLowerCase();
    let tags = [];
    if (location.query && location.query[urlKey]) {
      tags = location.query[urlKey].split(",");
    }

    if (tags.indexOf(val) > -1) {
      // remove the tag from the query string
      tags.splice(tags.indexOf(val), 1);
    } else {
      tags.push(val);
    }

    tags = tags.filter(x => x);

    if (!tags.length && location.query[urlKey]) {
      delete location.query[urlKey];
    } else {
      location.query[urlKey] = tags.join(",");
    }
    const newPath = router.createPath(location);
    router.replace(newPath);
  }

  isInQueryString = (props) => {
    const { val, urlKey } = props;
    const { query } = props.location;
    if (!query || !query[urlKey]) return false;

    const tags = query[urlKey].toLowerCase().split(",").filter(x => x);
    return tags.indexOf(val.toLowerCase()) > -1;
  }

  render() {
    const { className, style, clickAble, val, canBeActive, label } = this.props;
    const classes = [
      "tag",
      "push-half-right",
    ];
    if (clickAble) classes.push("tag--clickable");

    // Touch enabled devices tag class overrides
    if (Meteor.isCordova) {
      if (this.state.isActive && canBeActive) {
        classes.push("tag--nohover--active");
      } else {
        classes.push("tag--nohover");
      }
    } else if (this.state.isActive && canBeActive) {
      classes.push("tag--active");
    }

    return (
      <span
        className={`${classes.join(" ")} ${className}`}
        style={style}
        onClick={this.onClick}
      >
        {label || val}
      </span>
    );
  }
}
