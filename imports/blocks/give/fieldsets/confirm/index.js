// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { Component } from "react";
import cloneDeep from "lodash.clonedeep";

import { openUrl } from "../../../../util/inAppLink";

import TransactionLayout from "./TransactionLayout";
import ScheduleLayout from "./ScheduleLayout";
import PaymentOptionsLayout from "./PaymentOptionsLayout";

type IConfirm = {
  data: Object,
  transactions: Object,
  total: number,
  back: Function,
  goToStepOne: Function,
  header?: React$Element<any>,
  url: string,
  clearData: Function,
  savedAccount: Object,
  savedAccounts: Object[],
  changeSavedAccount: Function,
  scheduleToRecover: boolean,
  schedules: Object,
}

export default class Confirm extends Component {
  props: IConfirm;

  state = {
    changePayments: false,
  }

  completeGift = (e: Event) => {
    e.preventDefault();
    // deep clone
    const props = cloneDeep(this.props);
    let { url } = props;
    const { transactions, total, data, savedAccount } = props;

    // remove sensitive information
    delete data.billing; delete data.payment;

    // add last 4 in
    data.payment = {};

    if (url.length === 0) url = false;

    const giveData = encodeURIComponent(
      JSON.stringify({
        url,
        transactions,
        savedAccount,
        total,
        data,
        userId: Meteor.userId(),
      })
    );

    // ensure trailing slash
    // $FlowMeteor
    let rootUrl = __meteor_runtime_config__.ROOT_URL;
    if (rootUrl[rootUrl.length - 1] !== "/") {
      rootUrl = `${rootUrl}/`;
    }

    const giveUrl = `${Meteor.settings.public.giveUrl}give/review?giveData=${giveData}`;
    openUrl(
      giveUrl,
      null,
      () => { this.props.clearData(); },
      null
    );
  }

  choose = (e: Event) => {
    e.preventDefault();

    const target = e.currentTarget;
    if (target instanceof HTMLInputElement) {
      const { id } = target;
      let act = {};
      for (const account of this.props.savedAccounts) {
        if (String(account.id) === String(id)) {
          act = account;
          break;
        }
      }

      this.props.changeSavedAccount(act);
    }
  }

  changeAccounts = (e: Event) => {
    e.preventDefault();

    this.setState({
      changePayments: !this.state.changePayments,
    });
  }

  render() {
    if (this.state.changePayments) {
      return (
        <PaymentOptionsLayout
          changeAccounts={this.changeAccounts}
          choose={this.choose}

          goToStepOne={this.props.goToStepOne}
          savedAccount={this.props.savedAccount}
          savedAccounts={this.props.savedAccounts}
        />
      );
    }

    if (Object.keys(this.props.schedules).length) {
      return (
        <ScheduleLayout
          changeAccounts={this.changeAccounts}

          back={this.props.back}
          goToStepOne={this.props.goToStepOne}
          header={this.props.header}
          payment={this.props.data.payment}
          savedAccount={this.props.savedAccount}
          schedules={this.props.schedules}
          scheduleToRecover={this.props.scheduleToRecover}
          total={this.props.total}
        />
      );
    }

    const transactions = Object.keys(this.props.transactions).map((t) => (
      this.props.transactions[t]
    ));
    return (
      <TransactionLayout
        changeAccounts={this.changeAccounts}
        completeGift={this.completeGift}

        back={this.props.back}
        goToStepOne={this.props.goToStepOne}
        header={this.props.header}
        payment={this.props.data.payment}
        personal={this.props.data.personal}
        savedAccount={this.props.savedAccount}
        schedules={this.props.schedules}
        scheduleToRecover={this.props.scheduleToRecover}
        total={this.props.total}
        transactions={transactions}
      />
    );
  }
}
