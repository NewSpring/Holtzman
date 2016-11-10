// @flow

import { Component } from "react";
import { connect } from "react-redux";

import {
  modal,
  give as giveActions,
} from "../../store";

import Layout from "./Layout";

type IChangePayments = {
  dispatch: Function,
  savedAccounts: Object[],
  currentAccount: Object,
};

const map = (state) => ({
  savedAccount: state.give.savedAccount,
});
@connect(map)
export default class ChangePayments extends Component {
  props: IChangePayments;

  state = {
    savedAccount: null,
  }

  changeAccounts = (e: Event) => {
    e.preventDefault();

    this.props.dispatch(giveActions.setAccount(this.state.savedAccount));
    this.props.dispatch(modal.hide());
  }

  choose = (e: SyntheticEvent) => {
    e.preventDefault();

    const { id } = e.currentTarget;
    let act = {};
    for (const account of this.props.savedAccounts) {
      if (Number(account.id) === Number(id)) {
        act = account;
        break;
      }
    }

    this.setState({
      savedAccount: act,
    });
  }

  render() {
    let selectedAccount = this.props.currentAccount;
    if (this.state.savedAccount) {
      selectedAccount = this.state.savedAccount;
    }

    return (
      <Layout
        savedAccounts={this.props.savedAccounts}
        selectedAccount={selectedAccount}
        chooseAccount={this.choose}
        changeAccounts={this.changeAccounts}
      />
    );
  }
}
