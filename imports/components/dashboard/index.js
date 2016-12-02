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

type IDashboard = {
  title: string,
  subNav: Object,
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
      <Link
        to={subNav.item1.linkUrl}
        className={getLinkClasses(subNav.item1.isActive)}
      >
        <h6>{subNav.item1.title}</h6>
      </Link>
      <Link
        to={subNav.item2.linkUrl}
        className={getLinkClasses(subNav.item2.isActive)}
      >
        <h6>{subNav.item2.title}</h6>
      </Link>
      <Link
        to={subNav.item3.linkUrl}
        className={getLinkClasses(subNav.item3.isActive)}
      >
        <h6>{subNav.item3.title}</h6>
      </Link>
    </div>
    <div className="background--light-secondary" style={{ borderTop: "1px solid #dddddd" }}>
      <div className="soft push">
        {children}
      </div>
    </div>
  </div>
);

export default Dashboard;
