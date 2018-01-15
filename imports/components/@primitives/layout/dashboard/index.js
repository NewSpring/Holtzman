// @flow
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { header } from "../../../../data/store";

type ISubNav = [
  {
    isActive: boolean,
    linkUrl: string,
    onClick: Function,
    title: string,
  },
];

const getLinkClasses = (additionalClasses?: string, isActive: boolean) => {
  const classes = ["floating__item", "text-center", "plain"];

  if (isActive) {
    classes.push("outlined--bottom");
  } else {
    classes.push("text-dark-primary");
  }

  if (additionalClasses) {
    classes.push(additionalClasses);
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

const getLinks = (additionalClasses?: string, subNav: ISubNav) => {
  const links = subNav.map((x, index) => (
    <Link
      key={index}
      to={x.linkUrl}
      className={getLinkClasses(additionalClasses, x.isActive)}
      style={getLinkStyles(x.isActive)}
    >
      <h6>{x.title}</h6>
    </Link>
  ));
  return links;
};

type IDashboard = {
  additionalClasses?: string,
  children?: React$Element<any>,
  dispatch: Function,
  subNav: ISubNav,
  title: string,
  align?: string,
  centerWebNav?: boolean,
  hideTitle?: boolean,
};

export class Dashboard extends Component {
  props: IDashboard;

  componentWillMount() {
    if (process.env.NATIVE) this.props.dispatch(header.title(this.props.title));
  }

  render() {
    const {
      additionalClasses,
      children,
      subNav,
      title,
      align,
      hideTitle,
      centerWebNav,
    } = this.props;

    return (
      <div>
        <div
          className={`
            push-top
            soft-left@handheld
            ${
              !process.env.NATIVE
                ? "soft-top@handheld soft-double-top"
                : "soft-half-left@handheld"
            }
            soft-double-left@lap-and-up
            soft-sides
            background--light-primary
          `}
        >
          {!process.env.NATIVE &&
            title &&
            !hideTitle && (
              <h1 className="soft-half-bottom@handheld soft-bottom">{title}</h1>
            )}
          {!centerWebNav && (
            <div
              className={`floating ${
                !process.env.NATIVE ? "text-left" : align || "text-center"
              }`}
            >
              {getLinks(additionalClasses, subNav)}
            </div>
          )}
          {!process.env.NATIVE &&
            centerWebNav && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {getLinks(additionalClasses, subNav)}
              </div>
            )}
        </div>
        <div
          className="background--light-secondary outlined--top outlined--light"
          style={{ borderWidth: "1px" }}
        >
          <div>{children}</div>
        </div>
      </div>
    );
  }
}

export default connect()(Dashboard);
