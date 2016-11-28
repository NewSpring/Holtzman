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

const Strong = styled.strong`
  font-family: colfax-web, sans-serif;
`;

type IActivity = {
  status: string,
  transaction: Object,
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
    let icon = <Error width="30px" height="31px" fill="#FFFFFF" />;

    if (status === "failed") {
      icon = "";
    } else if (status === "success") {
      icon = <Success width="30px" height="31px" fill="#FFFFFF" />;
    }

    return icon;
  };

  /* eslint-disable max-len */
  getMessage = (props: Object) => {
    let message = <Paragraph>Your saved payment <Strong>{props.transaction.savedAccount.name}</Strong> is expiring soon.</Paragraph>;

    if (props.status === "failed") {
      message = <Paragraph>Your contribution to <Strong>{props.transaction.fund.name}</Strong> failed. Unfortunately there were insufficient funds to process it.</Paragraph>;
    } else if (props.status === "success") {
      message = <Paragraph>Your scheduled gift of <Strong>{props.transaction.amount}</Strong> to <Strong>{props.transaction.fund.name}</Strong> was successful.</Paragraph>;
    }

    return message;
  };
  /* eslint-enable max-len */

  getLink = (props: Object) => {
    let link = <Link to={"/give/now"} style={{ color: "#FFFFFF", fontWeight: "bold" }}>Update It Now</Link>;
    if (props.status === "failed") {
      link = <Link to={`/give/history/${props.transaction.id}`} style={{ color: "#FFFFFF", fontWeight: "bold" }}>Fix It Now</Link>;
    } else if (props.status === "success") {
      link = <Link to={`/give/history/${props.transaction.id}`} style={{ color: "#FFFFFF", fontWeight: "bold" }}>View Transaction</Link>;
    }

    return link;
  };

  render() {
    return (
      <div className={this.getClasses()} style={this.getStyles(this.props.status)}>
        <i className="soft-half-right">{this.getIcon(this.props.status)}</i>
        <BoldedDate className="flush-bottom">{ moment(this.props.transaction.date).format("MMM D, YYYY") }</BoldedDate>
        <div>{this.getMessage(this.props)}</div>
        <div>{this.getLink(this.props)}<span className="icon-arrow-next soft-half-left" /></div>
      </div>
    );
  }
}
