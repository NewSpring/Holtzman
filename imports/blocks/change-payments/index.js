// @flow

import { Component } from "react";
import { connect } from "react-redux";

import {
  modal,
  give as giveActions,
} from "../../store";

import Layout from "./Layout";

type IState = {
  give: Object,
};

export const map = ({ give }: IState) => ({
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

type IInputEvent = {
  preventDefault: Function,
  currentTarget: HTMLInputElement,
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

  choose = (e: IInputEvent) => {
    const { preventDefault, currentTarget } = e;
    preventDefault();

    const { id } = currentTarget;
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
    if (this.state.savedAccount) selectedAccount = this.state.savedAccount;

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
