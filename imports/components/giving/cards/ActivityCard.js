// @flow

import moment from "moment";
import { Link } from "react-router";
import { Error, Success } from "../../@primitives/UI/icons";

const getClasses = (status: string) => {
  const classes = [
    "card__item",
    "soft",
    "text-left",
    "soft-bottom",
    "rounded",
  ];

  let backgroundColor = "background--dark-primary";
  let textColor = "text-light-primary";
  if (status === "failed") {
    backgroundColor = "background--alert";
  } else if (status === "success") {
    backgroundColor = "background--light-primary";
    textColor = "text-dark";
  }

  classes.push(backgroundColor);
  classes.push(textColor);
  return classes.join(" ");
};

const getIcon = (status: string) => {
  const fill = status === "success" ? "#6bac43" : "#FFFFFF";
  const props = { width: "30px", height: "31px", fill };
  if (status === "failed") return <Error {...props} />;
  if (status === "success") return <Success {...props} />;
  return <Error {...props} />;
};

type IActivity = {
  status: string,
  date: ?string,
  message: any,
  linkText: ?string,
  linkUrl: ?string,
};

const ActivityCard = ({
  status,
  date,
  message,
  linkText,
  linkUrl,
}: IActivityCard) => (
  <div className="card">
    <div className={getClasses(status)}>
      <div className="floating text-left">
        <i className="soft-half-right">{getIcon(status)}</i>
        {date && <h5 className={`${status === "success" ? "text-dark-tertiary " : ""}display-inline-block floating__item soft-half-bottom`}>{ moment(date).format("MMM D, YYYY") }</h5>}
      </div>
      {typeof message === "string" ? <p>{message}</p> : message}
      {linkText && linkUrl && (
        <Link
          to={linkUrl}
          className={
            status === "success" ? "text-primary plain" : "text-light-primary plain"
          }
        >
          <h5 className="display-inline-block flush-bottom">
            {linkText}
          </h5>
          <span className="icon-arrow-next soft-half-left" />
        </Link>
      )}
    </div>
  </div>
);

export default ActivityCard;
