// @flow

import { Component } from "react";
import moment from "moment";
import { Link } from "react-router";
import { Error, Success } from "../icons";

type IActivity = {
  status: string,
  date: ?string,
  message: string,
  linkText: ?string,
  linkUrl: ?string,
};

export default class Activity extends Component {
  props: IActivity;

  getStyles = (status: string) => {
    const styles = {
      color: "#FFFFFF",
      fontFamily: "colfax-web, sans-serif",
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

  getIcon = (status: string) => {
    const props = { width: "30px", height: "31px", fill: "#FFFFFF" };

    if (status === "failed") return <Error {...props} />;
    if (status === "success") return <Success {...props} />;
    return <Error {...props} />;
  };

  render() {
    return (
      <div className="card__item soft text-left soft-bottom rounded" style={this.getStyles(this.props.status)}>
        <i className="soft-half-right">{this.getIcon(this.props.status)}</i>
        <p style={{ fontFamily: "colfax-web, sans-serif", fontWeight: "bold", display: "inline-block", verticalAlign: "top" }}>
          { moment(this.props.date).format("MMM D, YYYY") }
        </p>
        <div>{this.props.message}</div>
        <Link to={this.props.linkUrl} style={{ color: "#FFFFFF", fontWeight: "bold" }}>
          {this.props.linkText}<span className="icon-arrow-next soft-half-left" />
        </Link>
      </div>
    );
  }
}
