// @flow

import moment from "moment";
import { Link } from "react-router";
import { Error, Success } from "../icons";

const getStyles = (status: string) => {
  const styles = {
    backgroundColor: "#242424",
    fill: "#FFFFFF",
  };

  if (status === "failed") {
    styles.backgroundColor = "#BA3841";
  } else if (status === "success") {
    styles.backgroundColor = "#59A12E";
  }

  return styles;
};

const getIcon = (status: string) => {
  const props = { width: "30px", height: "31px", fill: "#FFFFFF" };
  if (status === "failed") return <Error {...props} />;
  if (status === "success") return <Success {...props} />;
  return <Error {...props} />;
};

type IActivity = {
  status: string,
  date: ?string,
  message: string,
  linkText: ?string,
  linkUrl: ?string,
};

const Activity = ({
  status,
  date,
  message,
  linkText,
  linkUrl,
}: IActivity) => (
  <div className="card">
    <div className="card__item soft text-left soft-bottom rounded text-light-primary" style={getStyles(status)}>
      <div className="floating text-left">
        <i className="soft-half-right">{getIcon(status)}</i>
        {date && <h5 className="display-inline-block floating__item soft-half-bottom">{ moment(date).format("MMM D, YYYY") }</h5>}
      </div>
      <p>{message}</p>
      {linkText && linkUrl &&
        <Link to={linkUrl} className="text-light-primary">
          <h5 className="display-inline-block">{linkText}</h5><span className="icon-arrow-next soft-half-left" />
        </Link>
      }
    </div>
  </div>
);

export default Activity;
