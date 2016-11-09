import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { modal, give as giveActions } from "../../store";

import Layout from "./Layout";

const map = (state) => ({
  savedAccount: state.give.savedAccount,
});
@connect(map)
export default class ChangePayments extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    savedAccounts: PropTypes.array, // eslint-disable-line
    currentAccount: PropTypes.object, // eslint-disable-line
  }

  state = {
    savedAccount: null,
  }

  paymentAccount = (account) => {
    const accountFistEight = account.payment.accountNumber.slice(0, account.payment.accountNumber.length - 5).replace(/./gmi, "*");
    const accountLastFour = account.payment.accountNumber.slice(-4);

    return accountFistEight + accountLastFour;
  }

  changeAccounts = (e) => {
    e.preventDefault();

    this.props.dispatch(giveActions.setAccount(this.state.savedAccount));
    this.props.dispatch(modal.hide());
  }

  choose = (e) => {
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
