// @flow
import { Link } from "react-router";

type ISubNav = [{
  isActive: Boolean,
  linkUrl: string,
  onClick: Function,
  title: string,
}];

const getLinkClasses = (isActive: Boolean) => {
  const classes = [
    "floating__item",
    "soft-half-sides",
    "push-right",
    "text-center",
  ];

  if (isActive) {
    classes.push("outlined--bottom");
  } else {
    classes.push("text-dark-primary");
  }

  return classes.join(" ");
};

const getLinks = (subNav: ISubNav) => {
  const links = subNav.map((x, index) => (
    <Link
      key={index}
      to={x.linkUrl}
      className={getLinkClasses(x.isActive)}
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
    <div className="soft-half@handheld hard-bottom soft-double@lap-and-up soft-double-top@lap-wide-and-up">
      <h1 className="soft-bottom">{title}</h1>
      <div className="floating text-left">
        {getLinks(subNav)}
      </div>
    </div>
    <div className="background--light-secondary" style={{ borderTop: "1px solid #dddddd" }}>
      <div className="soft push">
        {children}
      </div>
    </div>
  </div>
);

export default Dashboard;
