// @flow

import { Component } from "react";
import styled from "styled-components";
import moment from "moment";
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

const Link = styled.a`
  text-decoration: none;
  color: #FFFFFF;
  font-weight: bold;
`;

type IActivity = {
  status: string,
  date: string,
  amount: string,
  fundName: string,
  savedAccount: string,
  onClick: Function,
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

  // getMessage = (status: string, amount: string, fundName: string, savedAccount: string) => {
  getMessage = (props: Object) => {
    // eslint-disable-next-line
    let message = <Paragraph>Your saved payment <Strong>{props.savedAccount}</Strong> is expiring soon.</Paragraph>;

    if (props.status === "failed") {
      // eslint-disable-next-line
      message = <Paragraph>Your contribution to <Strong>{props.fundName}</Strong> failed. Unfortunately there were insufficient funds to process it.</Paragraph>;
    } else if (props.status === "success") {
      // eslint-disable-next-line
      message = <Paragraph>Your scheduled gift of <Strong>{props.amount}</Strong> to <Strong>{props.fundName}</Strong> was successful.</Paragraph>;
    }

    return message;
  };

  getLink = (status: string) => {
    let link = <Link href="#">Update It Now</Link>;

    if (status === "failed") {
      link = <Link href="#">Fix It Now</Link>;
    } else if (status === "success") {
      link = <Link href="#">View Transaction</Link>;
    }

    return link;
  };

  render() {
    return (
      <div className={this.getClasses()} style={this.getStyles(this.props.status)}>
        <i className="soft-half-right">{this.getIcon(this.props.status)}</i>
        <BoldedDate className="flush-bottom">{ moment(this.props.date).format("MMM D, YYYY") }</BoldedDate>
        <div>{this.getMessage(this.props)}</div>
        <div onClick={this.props.onClick}>{this.getLink(this.props.status)}<span className="icon-arrow-next soft-half-left" /></div>
      </div>
    );
  }
}