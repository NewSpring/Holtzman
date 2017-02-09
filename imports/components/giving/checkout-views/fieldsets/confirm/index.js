// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { Component } from "react";
import cloneDeep from "lodash.clonedeep";

import { openUrl } from "../../../../../util/inAppLink";

import TransactionLayout from "./TransactionLayout";
import PaymentOptionsLayout from "./PaymentOptionsLayout";
import SavedPaymentLayout from "./SavedPaymentLayout";

type IConfirm = {
  back: Function,
  changeSavedAccount: Function,
  children?: React$Element<any>,
  clearData: Function,
  data: Object,
  goToStepOne: Function,
  header?: React$Element<any>,
  savedAccount: Object,
  savedAccounts: Object[],
  schedule: Object,
  scheduleToRecover: boolean,
  total: number,
  transactions: Object,
  transactionType: string,
  url: string,
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

    const name = data.payment.name;
    // remove sensitive information
    delete data.billing; delete data.payment;

    // add name in for saving the account
    data.payment = { name };

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

  choose = (e: any) => {
    e.preventDefault();

    const target = e.currentTarget;
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
    } else if (this.props.transactionType === "savedPayment") {
      return (
        <SavedPaymentLayout
          billing={this.props.data.billing}
          payment={this.props.data.payment}
          header={this.props.header}
          goToStepOne={this.props.goToStepOne}
        >
          {this.props.children}
        </SavedPaymentLayout>
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
        schedule={this.props.schedule}
        scheduleToRecover={this.props.scheduleToRecover}
        total={this.props.total}
        transactions={transactions}
      />
    );
  }
}
