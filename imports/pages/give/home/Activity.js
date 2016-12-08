

import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import ActivityCard from "../../../components/cards/cards.Activity";

const ACTIVITY_QUERY = gql`
  query userFeed($filters: [String]!) {
    userFeed(filters: $filters) {
      ... on Transaction {
        id
        date
        summary
        status
        statusMessage
        schedule {
          id
        }
        details {
          amount
          account {
            name
          }
        }
      }
      ... on SavedPayment {
        name
        expirationYear
        expirationMonth
      }
    }
  }
`;
const withActivityData = graphql(ACTIVITY_QUERY, {
  name: "feed",
  options: {
    variables: { filters: ["GIVING_DASHBOARD"] },
  },
});

export class GivingActivity extends Component {

  componentWillUpdate(){
    console.log(this.props.data);
  }

  filterActivity = (data) => {
    if (!Array.isArray(data)) return [];

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
      linkUrl = `/give/history/${transaction.id}`;
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
        return this.renderTransaction(feedItem);
      }
      return this.renderExpiringAccount(feedItem);
    })
  ;


  render(){
    if (!this.props.feed || !this.props.feed.userFeed) return null;

    const data = this.filterActivity(this.props.feed.userFeed);

    return (
      <div className="soft-half hard-top">
        {this.renderActivity(this.filterActivity(data))}
      </div>
    );
  }
}

export default withActivityData(GivingActivity);
