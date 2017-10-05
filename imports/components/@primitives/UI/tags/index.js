import PropTypes from "prop-types";
import { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";

class TagWithoutData extends Component {
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
    icon: PropTypes.any,
    iconClass: PropTypes.string,
  };

  static defaultProps = {
    className: "",
    style: {},
    clickAble: true,
    canBeActive: true,
    urlKey: "tags",
  };

  state = { isActive: false };

  componentWillMount() {
    if ((this.props.active || this.isInQueryString(this.props)) && this.props.canBeActive) {
      this.setState({ isActive: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.active || this.isInQueryString(nextProps)) && nextProps.canBeActive) {
      this.setState({ isActive: true });
    } else if (nextProps.active && nextProps.canBeActive && !this.props.active) {
      this.setState({ isActive: true });
    } else {
      this.setState({ isActive: false });
    }
  }

  onClick = e => {
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
  };

  isInQueryString = props => {
    const { val, urlKey } = props;
    const { query } = props.location;
    if (!query || !query[urlKey]) return false;

    const tags = query[urlKey].toLowerCase().split(",").filter(x => x);
    return tags.indexOf(val.toLowerCase()) > -1;
  };

  render() {
    const { className, style, clickAble, val, canBeActive, label } = this.props;
    const classes = ["tag", "push-half-right"];
    const active = this.state.isActive && canBeActive;

    if (clickAble) classes.push("tag--clickable");

    // Touch enabled devices tag class overrides
    if (Meteor.isCordova) {
      if (active) {
        classes.push("tag--nohover--active");
      } else {
        classes.push("tag--nohover");
      }
    } else if (active) {
      classes.push("tag--active");
    }

    return (
      <span
        className={`${classes.join(" ")} ${className}`}
        style={
          this.props.iconClass || active
            ? { ...style, ...{ paddingRight: "10px", paddingTop: "6px" } }
            : { ...style, ...{ paddingTop: "6px" } }
        }
        onClick={this.onClick}
      >
        {label || val}{this.props.icon ? this.props.icon : ""}
        {this.props.iconClass || active
          ? <span
            style={{ fontSize: "10px" }}
            className={`push-half-left ${active ? "icon-close" : this.props.iconClass}`}
            data-spec="iconSpan"
          />
          : null}
      </span>
    );
  }
}

export default withRouter(connect(state => ({ location: state.routing.location }))(TagWithoutData));

export { TagWithoutData };
