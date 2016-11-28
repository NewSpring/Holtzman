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
      backgroundColor: "#FFFFFF",
      fill: "#FFFFFF",
    };
    if (status === "failed") {
      styles.backgroundColor = "#BA3841";
    } else if (status === "success") {
      styles.backgroundColor = "#59A12E";
    } else {
      styles.backgroundColor = "#242424";
    }
    return styles;
  };

  getIcon = (status: string) => {
    let icon;
    if (status === "failed") {
      icon = "";
    } else if (status === "success") {
      icon = <Success width="30px" height="31px" fill="#FFFFFF" />;
    } else {
      icon = <Error width="30px" height="31px" fill="#FFFFFF" />;
    }
    return icon;
  };

  getMessage = (status: string, amount: string, fundName: string, savedAccount: string) => {
    let message;
    if (status === "failed") {
      // eslint-disable-next-line
      message = <Paragraph>Your contribution to <Strong>{fundName}</Strong> failed. Unfortunately there were insufficient funds to process it.</Paragraph>;
      // const bolded = "General Fund";
      // message += bolded.bold();
      // message += "failed. Unfortunately there were insufficient funds to process it.";
    } else if (status === "success") {
      // eslint-disable-next-line
      message = <Paragraph>Your scheduled gift of <Strong>{amount}</Strong> to <Strong>{fundName}</Strong> was successful.</Paragraph>;
    } else {
      // eslint-disable-next-line
      message = <Paragraph>Your saved payment <Strong>{savedAccount}</Strong> is expiring soon.</Paragraph>;
    }
    return message;
  };

  getLink = (status: string) => {
    let link;
    if (status === "failed") {
      link = <Link href="#">Fix It Now</Link>;
    } else if (status === "success") {
      link = <Link href="#">View Transaction</Link>;
    } else {
      link = <Link href="#">Update It Now</Link>;
    }
    return link;
  };

  render() {
    return (
      <div className={this.getClasses()} style={this.getStyles(this.props.status)}>
        <i className="soft-half-right">{this.getIcon(this.props.status)}</i>
        <BoldedDate className="flush-bottom">{ moment(this.props.date).format("MMM D, YYYY") }</BoldedDate>
        <div>{this.getMessage(this.props.status, this.props.amount, this.props.fundName, this.props.savedAccount)}</div>
        <div onClick={this.props.onClick}>{this.getLink(this.props.status)}<span className="icon-arrow-next soft-half-left" /></div>
      </div>
    );
  }
}
