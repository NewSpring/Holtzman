import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { give as giveActions } from "../../../store";

import Primary from "./Primary";
import Layout from "./Layout";

@connect(null, giveActions)
export default class SubFund extends Component {

  static propTypes = {
    primary: PropTypes.string,
    accounts: PropTypes.array, // eslint-disable-line
    update: PropTypes.func,
    selectVal: PropTypes.string,
    inputVal: PropTypes.string,
    instance: PropTypes.object, // eslint-disable-line
    clearTransaction: PropTypes.func,
    addTransactions: PropTypes.func,
    remove: PropTypes.func,
    preFill: PropTypes.func,
    donate: PropTypes.func,
  }

  state = {
    active: false,
    focused: false,
    fund: false,
    amount: null,
    id: `select-account_${Date.now()}_${Math.floor((Math.random() * 100))}`,
  }

  componentWillMount() {
    if (this.props.primary) {
      this.setState({
        fund: true,
        id: this.props.accounts[0].value,
      });

      this.props.update(this.props.instance, this.props.accounts[0].value, this.state.amount);
    }

    if (this.props.selectVal) {
      this.setState({ fund: true, id: this.props.selectVal });
    }
    if (this.props.inputVal) {
      this.setState({ amount: this.props.inputVal });
    }
  }

  getFund = (id) => {
    const selectedFund = this.props.accounts.filter(fund => (
      Number(fund.value) === Number(id)
    ));
    return selectedFund[0];
  }

  monentize = (value, fixed) => {
    let amount = typeof value === "number" ? `${value}` : value;

    if (!amount.length) {
      return "$0.00";
    }

    amount = amount.replace(/[^\d.-]/g, "");

    const decimals = amount.split(".")[1];
    if ((decimals && decimals.length >= 2) || fixed) {
      amount = Number(amount).toFixed(2);
      amount = String(amount);
    }

    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${amount}`;
  }

  saveFund = (id) => {
    if (id === this.state.id) return;

    // remove old funds transaction
    this.props.clearTransaction(`${this.state.id}`);
    this.props.remove(this.props.instance, this.state.id);

    const fund = this.getFund(id);

    if (!fund) {
      this.setState({
        id: null,
        fund: false,
        amount: null,
      });
      return;
    }

    this.setState({
      id: fund.value,
      fund: true,
    });

    // we have monies, lets update the store
    if (this.state.amount) {
      this.props.addTransactions({
        [id]: {
          value: Number(`${this.state.amount}`.replace(/[^0-9\.]+/g, "")),
          label: fund.label,
        },
      });

      this.props.update(this.props.instance, id, this.state.amount);
    }
  }

  saveAmount = (value) => {
    const amount = this.monentize(value);

    const numberValue = Number(amount.replace(/[^\d.-]/g, ""));

    if (numberValue > 0) {
      this.setState({
        active: true,
        amount: numberValue,
      });

      // there is also a fund stored, lets update the transactions store
      if (this.state.fund) {
        const { id } = this.state;
        const fund = this.getFund(id);
        this.props.addTransactions({
          [id]: {
            value: Number(amount.replace(/[^0-9\.]+/g, "")),
            label: fund.label,
          },
        });

        this.props.update(this.props.instance, id, numberValue);
      }
    } else if (this.state.fund) {
      // remove transaction
      this.props.clearTransaction(this.state.id);
      this.props.remove(this.props.instance, this.state.id);

      // this.setState({
      //   active: false,
      //   fund: false,
      //   id: `select-account_${Date.now()}_${Math.floor((Math.random() * 100))}`
      // })
    }

    return amount;
  }

  statusClass = () => {
    if (this.state.fund) {
      return "text-dark-tertiary";
    }
    return "text-light-tertiary";
  }

  render() {
    if (!this.props.accounts.length) return null;

    if (this.props.primary) {
      /*

        The primary subfund template presents an input field first
        then the account to give to second.

        We store the amount in the state
          If there is no fund id, we are done
          If there is a fund id, we need to update the transaction store

        We store the fund id in the state
          If there is an amount, we update the transaction store

      */

      return (
        <Primary
          classes={this.statusClass()}
          accounts={this.props.accounts}
          state={this.state}
          saveFund={this.saveFund}
          format={this.saveAmount}
          preFill={this.props.preFill}
          donate={this.props.donate}
          selectVal={this.props.selectVal}
        />
      );
    }


    /*

      The secondary subfund template presents a select then shows an
      input field for the amount

      We store the fund id in the state
        If there is an amount, we update the transaction store

      We store the amount in the state
        If there is a fund id, we need to update the transaction store

    */
    return (
      <Layout
        classes={this.statusClass()}
        accounts={this.props.accounts}
        state={this.state}
        showInputs={this.saveFund}
        format={this.saveAmount}
        preFill={this.props.preFill}
        selectVal={this.props.selectVal}
        inputVal={this.props.inputVal}
      />
    );
  }
}
