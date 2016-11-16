// @flow

import { Component } from "react";
import { connect } from "react-redux";

import {
  modal,
  give as giveActions,
} from "../../store";

import Layout from "./Layout";

export const map = ({ give }) => ({
  savedAccount: give.savedAccount,
});

export const withRedux = connect(map);

type IChangePayments = {
  dispatch: Function,
  savedAccounts: Object[],
  currentAccount: Object,
};

type IChangePaymentsState = {
  savedAccount: Object,
}

class ChangePayments extends Component {
  props: IChangePayments;
  state: IChangePaymentsState;

  state = {
    savedAccount: null,
  }

  changeAccounts = (e: Event) => {
    e.preventDefault();

    this.props.dispatch(giveActions.setAccount(this.state.savedAccount));
    this.props.dispatch(modal.hide());
  }

  choose = (e: SyntheticInputEvent) => {
    e.preventDefault();

    const { id } = e.currentTarget;
    // XXX 'any' is not a specific enough type
    let act: any = {};
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

export default withRedux(ChangePayments);

export {
  ChangePayments as ChangePaymentsWithoutData,
};
