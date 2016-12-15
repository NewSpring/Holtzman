
// @flow

import React, { Component } from "react";
import { Link } from "react-router";

import SectionHeader from "../../../components/sectionHeader";
import LoadingHeader from "../../../components/loading/SectionHeader";
import SmallButton from "../../../components/buttons/small";
import ActivityCard from "../../../components/cards/cards.Activity";
import LoadingActivityCard from "../../../components/loading/ActivityCard";

import SummaryChart from "./GivingSummary";

const ActivityButton = () =>
  <SmallButton
    text="See All"
    linkUrl="/give/history"
    className="btn--dark-tertiary flush"
  />;

type IGivingActivity = {
  feed: Object,
};

export class GivingActivity extends Component {
  props: IGivingActivity;

  filterActivity = (data: [Object]): [any] => {
    if (!Array.isArray(data)) return [];

    const transactions = [];
    // const accounts = [];
    const activityToShow = [];

    // separate feed by transactions and accoutns
    data.forEach((feedItem: Object) => {
      if (typeof feedItem.status !== "undefined") {
        transactions.push(feedItem);
      }
      // else {
      //   accounts.push(feedItem);
      // }
    });

    // XXX TODO: filter accounts by soon expiring

    // accounts.map((account) => {
    //   if (activityToShow.length < 3) {
    //     activityToShow.push(account);
    //   }
    //   return null;
    // });

    transactions.map((transaction) => {
      if (activityToShow.length < 3) {
        activityToShow.push(transaction);
      }
      return null;
    });

    return activityToShow;
  };

  // used by renderActivity to render a transasction card
  renderTransaction = (transaction: Object): any => {
    let message;
    let status;
    let linkText;
    let linkUrl;
    const scheduled = transaction.schedule !== null;

    if (transaction.status === null || transaction.status === "Success" || transaction.status === "Complete") {
      status = "success";
      linkText = "View Gift";
      linkUrl = `/give/history/${transaction.id}`;
      message =
        `Your ${scheduled ? "scheduled " : ""}gift of $${transaction.details[0].amount} to
        ${transaction.details[0].account.name} was successful`;
    } else if (transaction.status === "Failed") {
      status = "failed";
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
        key={transaction.id}
        status={status}
        date={transaction.date}
        message={message}
        linkText={linkText}
        linkUrl={linkUrl}
      />
    );
  };

  renderExpiringAccount = (account: Object): any =>
    <ActivityCard
      key={account.id}
      status=""
      message={`Your saved payment ${account.name} is expiring soon.`}
      linkText={"Update it Now"}
      linkUrl={"/"}
      date={"2016-12-01"}
    />
  ;

  renderActivity = (feedItems: ?[Object]): ?[any] => {
    if (Array.isArray(feedItems) && feedItems.length > 0) {
      return feedItems.map((feedItem: Object) => {
        if (feedItem.__typename === "Transaction") { //eslint-disable-line
          return this.renderTransaction(feedItem);
        }
        return this.renderExpiringAccount(feedItem);
      });
    }
    return null;
  };

  render() {
    const wrapper = "soft-half-sides soft-double-sides@lap-and-up";

    if (!this.props.feed || !this.props.feed.userFeed) {
      return (
        <div className={wrapper}>
          <LoadingHeader />
          <LoadingActivityCard />
        </div>
      );
    }

    const data = this.filterActivity(this.props.feed.userFeed);
    if (!Array.isArray(data) && data.length === 0) {
      return (
        <div className={wrapper}>
          <SectionHeader title="Activity" link={<div />} />
          <div className="card">
            <div className="card__item soft">
              <h4 className="text-dark-primary">
                Insert headline copy here
              </h4>
              <p>
                Donec sed odio dui.
                Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
              </p>
              <Link to="/give/now" className="btn one-whole@handheld flush-bottom">
                Give First Contribution
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={wrapper}>
        <SectionHeader title="Activity" link={<ActivityButton />} />
        <div className="hard">
          {this.renderActivity(data)}
        </div>
        <SummaryChart />
      </div>
    );
  }
}

export default GivingActivity;

