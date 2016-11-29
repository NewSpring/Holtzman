// @flow

import { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router";
import { Error, Success } from "../icons";

const Paragraph = styled.p`
  font-family: colfax-web, sans-serif;
`;

const BoldedDate = styled(Paragraph)`
  font-weight: bold;
  display: inline-block;
  vertical-align: top;
`;

type IActivity = {
  status: string,
  date: ?string,
  message: string,
  linkText: ?string,
  linkUrl: ?string,
};

export default class Activity extends Component {
  props: IActivity;

  getClasses = () => {
    const classes = [
      "card__item",
      "soft",
      "text-left",
      "soft-bottom",
      "rounded",
    ];
    return classes.join(" ");
  };

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
      <div className={this.getClasses()} style={this.getStyles(this.props.status)}>
        <i className="soft-half-right">{this.getIcon(this.props.status)}</i>
        <BoldedDate className="flush-bottom">{ moment(this.props.date).format("MMM D, YYYY") }</BoldedDate>
        <div>{this.props.message}</div>
        <Link to={this.props.linkUrl} style={{ color: "#FFFFFF", fontWeight: "bold" }}>{this.props.linkText}<span className="icon-arrow-next soft-half-left" /></Link>
      </div>
    );
  }
}
