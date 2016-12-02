// @flow
import { Link } from "react-router";

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

const getLinks = (subNav: Object[]) => {
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
  subNav: Object[],
  children?: React$Element<any>,
};

const Dashboard = ({
  title,
  subNav,
  children,
}: IDashboard) => (
  <div>
    <h2 className="soft-bottom">{title}</h2>
    <div className="floating text-left">
      {getLinks(subNav)}
    </div>
    <div className="background--light-secondary" style={{ borderTop: "1px solid #dddddd" }}>
      <div className="soft push">
        {children}
      </div>
    </div>
  </div>
);

export default Dashboard;
