/* global serverWatch */
import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { give as giveActions } from "../../store";
import Layout from "./Layout";

// We only care about the give state
const map = state => ({ give: state.give });

@connect(map, giveActions)
export default class CartContainer extends Component {

  static propTypes = {
    clearTransactions: PropTypes.func,
    accounts: PropTypes.array, // eslint-disable-line
    addTransactions: PropTypes.func,
    give: PropTypes.object, // eslint-disable-line
    donate: PropTypes.bool,
  }

  componentWillMount() {
    this.props.clearTransactions();

    if (typeof window !== "undefined" && window !== null) {
      let match;

      const pl = /\+/g;  // Regex for replacing addition symbol with a spac
      const search = /([^&=]+)=?([^&]*)/g;
      const decode = (s) => { decodeURIComponent(s.replace(pl, " ")); };
      const query = window.location.search.substring(1);

      const urlParams = {};

      // eslint-disable-next-line
      while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
      }

      for (const account of this.props.accounts) {
        if (urlParams[account.name]) {
          let value = urlParams[account.name];
          const id = account.id;

          value = this.monentize(value);

          this.props.addTransactions({ [id]: {
            value: Number(value.replace(/[^0-9\.]+/g, "")),
            label: account.name,
          } });
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.give.state === "success" && this.props.give.state === "success") {
      this.props.clearTransactions();
    }
  }

  monentize = (amount, fixed) => {
    let value;

    if (typeof amount === "number") {
      value = `${amount}`;
    }

    if (!value.length) {
      return "$0.00";
    }

    value = value.replace(/[^\d.-]/g, "");

    const decimals = value.split(".")[1];
    if ((decimals && decimals.length >= 2) || fixed) {
      value = Number(value).toFixed(2);
      value = String(value);
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${value}`;
  }

  format = (amount, target) => {
    const { id, name } = target;

    const value = this.monentize(amount);

    this.props.addTransactions({ [id]: {
      value: Number(value.replace(/[^0-9\.]+/g, "")),
      label: name,
    } });

    return value;
  }

  saveData = (amount, target) => {
    const { id, name } = target;

    const value = this.monentize(amount);

    this.props.addTransactions({ [id]: {
      value: Number(value.replace(/[^0-9\.]+/g, "")),
      label: name,
    } });

    return true;
  }


  preFillValue = (id) => {
    const { transactions } = this.props.give;

    if (transactions[id] && transactions[id].value) {
      return `$${transactions[id].value}`;
    }

    return null;
  }


  render() {
    const { total } = this.props.give;
    if (!this.props.accounts) return null;
    const accounts = this.props.accounts.map(x => ({
      label: x.name,
      value: x.id,
    }));

    /*

      The primary instance of the subfund selector gets an overall copy of
      the entire accounts list. Then each new instance gets a copy of the
      previous list minus the selected account.

    */
    return (
      <Layout
        accounts={accounts}
        save={this.saveData}
        monentize={this.monentize}
        format={this.format}
        preFill={this.preFillValue}
        total={total}
        transactions={{ ...this.props.give.transactions }}
        donate={this.props.donate}
      />

    );
  }
}
