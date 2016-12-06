// @flow
import { Link } from "react-router";

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
};

const Dashboard = ({
  title,
  subNav,
  children,
}: IDashboard) => (
  <div>
    <div className="push-top soft-left@handheld soft-top@handheld soft-double-left soft-double-top background--light-primary">
      <h1 className="soft-half-bottom@handheld soft-bottom">{title}</h1>
      <div className="floating text-left">
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

export default Dashboard;
