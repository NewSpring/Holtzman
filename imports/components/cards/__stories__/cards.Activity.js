/* eslint-disable */
import { Component } from "react";
import Moment from "moment";
import { Error, Success } from "../../icons";
import styled from "styled-components";
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  select,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./cards.FeedItem.md";
import FeedItem from "../cards.FeedItem";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary", "dark-primary", "dark-secondary")))
  ;

const IActivity = {
  status,
};

const Paragraph = styled.p`
  font-family: colfax-web, sans-serif;
`;

const Bolded = styled(Paragraph)`
  font-weight: bold;
  display: inline-block;
  vertical-align: top;
`;

const Link = styled.a`
  text-decoration: none;
  color: #FFFFFF;
  font-weight: bold;
`;

class Activity extends Component {
  props: IActivity;

  cardTheme = () => {
    const classes = [
      "card__item",
      "soft",
      "text-left",
      "soft-bottom",
      "rounded",
    ];
    return classes.join(" ");
  };

  getClasses = () => {
    return this.cardTheme();
  };

  getStyles = (status) => {
    let styles = {
      color: "#FFFFFF",
      fontFamily: "colfax-web, sans-serif",
    };
    if (status === "failed") {
      styles.backgroundColor = "#BA3841";
    } else if (status === "success") {
      styles.backgroundColor = "#59A12E";
      styles.fill = "#FFFFFF";
    } else {
      styles.backgroundColor = "#242424";
    }
    return styles;
  };

  getIcon = (status) => {
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

  getMessage = (status) => {
    let message;
    if (status === "failed") {
      message = <Paragraph>Your contribution to <strong style={{ fontFamily: "colfax-web" }}>General Fund</strong> failed. Unfortunately there were insufficient funds to process it.</Paragraph>;
      // const bolded = "General Fund";
      // message += bolded.bold();
      // message += "failed. Unfortunately there were insufficient funds to process it.";
    } else if (status === "success") {
      message = <Paragraph>Your scheduled gift of <strong style={{ fontFamily: "colfax-web" }}>$50</strong> to <strong style={{ fontFamily: "colfax-web" }}>General Fund</strong> was successful.</Paragraph>;
    } else {
      message = <Paragraph>Your saved payment <strong style={{ fontFamily: "colfax-web" }}>Credit Card</strong> is expiring soon.</Paragraph>;
    }
    return message;
  };

  getLink = (status) => {
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

  statusOptions = {
    failed: "Failed",
    success: "Success",
    warning: "Warning",
  };
  defaultStatusValue = "success";

  render() {
    const status = select("Status", this.statusOptions, this.defaultStatusValue);
    const classes = this.getClasses();
    const styles = this.getStyles(status);
    return(
      <div className={this.getClasses()} style={this.getStyles(status)}>
        <i className="soft-half-right">{this.getIcon(status)}</i>
        <Bolded className="flush-bottom">{ Moment().format("MMM D, YYYY") }</Bolded>
        <div>{this.getMessage(status)}</div>
        <div>{this.getLink(status)}<span className="icon-arrow-next soft-half-left"></span></div>
      </div>
    );
  };
};


story
  .add("Activity", withReadme(Readme, () => {

    return (
      <div className={"floating"}>
        <div className={"grid__item"} style={{ maxWidth: "480px" }}>
          <Activity status="success" />
        </div>
      </div>);
  }));
