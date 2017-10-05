// @flow
import React, { Component } from "react";
import { Link } from "react-router";

import SectionHeader from "../../../components/@primitives/UI/section-header";
import LoadingHeader from "../../../components/@primitives/UI/loading/SectionHeader";
import SmallButton from "../../../components/@primitives/UI/buttons/SmallButton";
import ActivityCard from "../../../components/giving/cards/ActivityCard";
import LoadingActivityCard from "../../../components/@primitives/UI/loading/ActivityCard";

import SummaryChart from "./GivingSummary";

const ActivityButton = () =>
  (<SmallButton
    text="See All"
    linkUrl="/give/history"
    className="btn--dark-tertiary flush"
  />);

type IGivingActivity = {
  feed: Object,
};

export class GivingActivity extends Component {
  props: IGivingActivity;

  filterActivity = (data: [Object]): Array<any> => {
    if (!Array.isArray(data)) return [];

    const transactions = [];
    // const accounts = [{}];
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
    transactions.map(transaction => {
      if (transaction.details[0].amount !== 0) {
        if (activityToShow.length < 3) {
          activityToShow.push(transaction);
        }
      }
      return null;
    });

    return activityToShow;
  };

  additionalAmount = (details: Object) => {
    const amount = details.amount === parseInt(details.amount, 10)
      ? details.amount
      : details.amount.toFixed(2);

    return (
      <span>and <strong>${amount}</strong> to <strong>{details.account.name}</strong></span>
    );
  };

  // used by renderActivity to render a transasction card
  renderTransaction = (transaction: Object): any => {
    let message;
    let status;
    let linkText;
    let linkUrl;
    const scheduled = transaction.schedule !== null;

    // show .00 on whole-dollar amounts. Don't show on even dollars
    const amount = transaction.details[0].amount === parseInt(transaction.details[0].amount, 10)
      ? transaction.details[0].amount
      : transaction.details[0].amount.toFixed(2);

    if ((transaction.status === null || transaction.status === "Success" || transaction.status === "Complete") && transaction.details.length) {
      status = "success";
      linkText = "View Contribution";
      linkUrl = `/give/history/${transaction.id}`;
      message = (
        <p>
          Your {scheduled ? "scheduled " : ""}contribution of <strong>${amount} </strong>
          to <strong>{transaction.details[0].account.name} </strong>
          {transaction.details.length > 1 ? this.additionalAmount(transaction.details[1]) : null}
          {" "}was successful.
        </p>
      );
    } else if (transaction.status === "Failed") {
      status = "failed";
      message = (
        <p>
          Your {scheduled ? "scheduled " : ""}contribution to
          <strong> {transaction.details[0].account.name} </strong>
          {transaction.details.length > 1
            ? <span>and<strong> {transaction.details[1].name} </strong></span> : null}
          {" "}was unsuccessful.
          {transaction.statusMessage !== null && transaction.statusMessage !== ""
            ? ` Unfortunately, ${transaction.statusMessage}.` : ""}
        </p>
      );
    } else if (transaction.status === "Pending") {
      status = "success";
      message = (
        <p>
          Your {scheduled ? "scheduled " : ""}contribution to
          <strong> {transaction.details[0].account.name} </strong>
          {transaction.details.length > 1
            ? <span>and<strong> {transaction.details[1].name} </strong></span> : null}
          {" "}is <strong>pending</strong>.
        </p>
      );
    } else {
      return null;
    }

    return (
      <ActivityCard
        key={`${transaction.id.slice(0, -8)}_${transaction.details[0].account.name}`}
        status={status}
        date={transaction.date}
        message={message}
        linkText={linkText}
        linkUrl={linkUrl}
      />
    );
  };

  renderExpiringAccount = (account: Object): any =>
    (<ActivityCard
      key={account.id}
      status=""
      message={`Your saved payment ${account.name} is expiring soon.`}
      linkText={"Update it Now"}
      linkUrl={"/"}
      date={"2016-12-01"}
    />)
  ;

  renderActivity = (feedItems: ?Array<Object>): any => {
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
                {"You don't have any activity to show"}
              </h4>
              <p>
                {`This section is to keep you up to date on your recent online giving
                activity. It appears as if you haven't given online before.`}
              </p>
              <p>
                {`If you believe this is an error and you would like a member of our
                customer support team to contact you, click `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="//rock.newspring.cc/workflows/152?Topic=Stewardship"
                >
                  here
                </a>.
              </p>
              <Link to="/give/now" className="btn one-whole@handheld flush-bottom">
                Give Now
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
