
import React, { Component } from "react";
import ActivityCard from "../../../components/cards/cards.Activity";

export default class GivingActivity extends Component {

  filterActivity = (data) => {
    const transactions = [];
    const accounts = [];
    const activityToShow = [];

    // separate feed by transactions and accoutns
    data.forEach((feedItem) => {
      if (typeof feedItem.status !== "undefined") {
        transactions.push(feedItem);
      } else {
        accounts.push(feedItem);
      }
    });

    // XXX TODO: filter accounts by soon expiring

    accounts.map((account) => {
      if (activityToShow.length < 3) {
        activityToShow.push(account);
      }
      return null;
    });

    transactions.map((transaction) => {
      if (activityToShow.length < 3) {
        activityToShow.push(transaction);
      }
      return null;
    });

    return activityToShow;
  };

  // used by renderActivity to render a transasction card
  renderTransaction = (transaction) => {

    let message;
    let status;
    let linkText;
    let linkUrl;
    const scheduled = transaction.schedule !== null;

    if (transaction.status === null || transaction.status === "Success") {
      status = "success";
      linkText = "View Gift";
      linkUrl = "/";
      message =
        `Your ${scheduled ? "scheduled " : ""}gift of $${transaction.details[0].amount} to
        ${transaction.details[0].account.name} was successful`;
    } else if (transaction.status === "Failed") {
      status = "failed";
      linkText = "Fix it Now";
      linkUrl = "/";
      message =
        `Your ${scheduled ? "scheduled " : ""}contribution to ${transaction.details[0].account.name} failed.
        ${transaction.statusMessage !== null && transaction.statusMessage !== ""
          ? `Unfortunately, ${transaction.statusMessage}.` : ""}`;
    } else if (transaction.status === "Pending") {
      status = "success";
      message =
        `Your ${scheduled ? "scheduled " : ""}contribution to ${transaction.details[0].account.name}
        is pending.`;
    } else {
      return null;
    }

    return (
      <ActivityCard
        status={status}
        date={transaction.date}
        message={message}
        linkText={linkText}
        linkUrl={linkUrl}
      />
    );
  };

  renderExpiringAccount = (account) =>
    <ActivityCard
      message={`Your saved payment ${account.name} is expiring soon.`}
      linkText={"Update it Now"}
      linkUrl={"/"}
      date={"Tue Nov 01 2016 07:53:00 GMT-0400 (EDT)"}
    />
  ;

  renderActivity = (feedItems) =>
    feedItems.map((feedItem) => {
      if (typeof feedItem.status !== "undefined") {
        return renderTransaction(feedItem);
      }
      return renderExpiringAccount(feedItem);
    })
  ;


  render(){
    return renderActivity();
  }
}
