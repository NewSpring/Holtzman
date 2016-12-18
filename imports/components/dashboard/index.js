// @flow
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { header } from "../../store";

type ISubNav = [{
  isActive: boolean,
  linkUrl: string,
  onClick: Function,
  title: string,
}];

const getLinkClasses = (isActive: boolean) => {
  const classes = [
    "floating__item",
    "soft-half-sides",
    "push-right",
    "text-center",
    "plain",
  ];

  if (isActive) {
    classes.push("outlined--bottom");
  } else {
    classes.push("text-dark-primary");
  }

  return classes.join(" ");
};

const getLinkStyles = (isActive: boolean) => {
  const styles = {
    borderBottom: "3px solid #FFFFFF",
  };

  if (isActive) {
    styles.borderBottom = "";
  }

  return styles;
};

const getLinks = (subNav: ISubNav) => {
  const links = subNav.map((x, index) => (
    <Link
      key={index}
      to={x.linkUrl}
      className={getLinkClasses(x.isActive)}
      style={getLinkStyles(x.isActive)}
    >
      <h6>{x.title}</h6>
    </Link>
  ));
  return links;
};

type IDashboard = {
  title: string,
  subNav: ISubNav,
  children?: React$Element<any>,
  dispatch: Function,
};

export class Dashboard extends Component {

  props: IDashboard;

  componentWillMount() {
    if (process.env.NATIVE) this.props.dispatch(header.title(this.props.title));
  }

  render() {
    const {
      title,
      subNav,
      children,
    } = this.props;

    return (
      <div>
        <div
          className={`
            push-top
            soft-left@handheld
            ${!process.env.NATIVE ? "soft-top@handheld soft-double-top" : ""}
            soft-double-left
            background--light-primary
          `}
        >
          {!process.env.NATIVE && (
            <h1 className="soft-half-bottom@handheld soft-bottom">{title}</h1>
          )}
          <div className={`floating ${!process.env.NATIVE ? "text-left" : "text-center"}`}>
            {getLinks(subNav)}
          </div>
        </div>
        <div className="background--light-secondary outlined--top outlined--light" style={{ borderWidth: "1px" }}>
          <div>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Dashboard);
