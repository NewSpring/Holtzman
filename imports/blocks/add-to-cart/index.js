// @flow
/* global serverWatch */
import { Component } from "react";
import { connect } from "react-redux";

import { give as giveActions } from "../../store";
import { monetize } from "../../util/format/currency";
import Layout from "./Layout";

// We only care about the give state
const map = (state) => ({ give: state.give });
export const withGiveActions = connect(map, giveActions);

type ICartContainer = {
  clearTransactions: Function,
  accounts: Object[],
  addTransactions: Function,
  give: Object,
  donate: boolean,
};

class CartContainer extends Component {

  props: ICartContainer;

  componentWillMount() {
    this.props.clearTransactions();

    if (typeof window !== "undefined" && window !== null) {
      let match;

      const pl = /\+/g;  // Regex for replacing addition symbol with a spac
      const search = /([^&=]+)=?([^&]*)/g;
      const decode = (s) => decodeURIComponent(s.replace(pl, " "));
      const query = window.location.search.substring(1);
      const urlParams = {};

      while (match = search.exec(query)) {
        const thing = decode(match[1]);
        if (thing !== undefined) {
          urlParams[thing] = decode(match[2]);
        }
      }

      for (const account of this.props.accounts) {
        if (urlParams[account.name]) {
          let value = urlParams[account.name];
          const id = account.id;

          value = monetize(value);

          this.props.addTransactions({ [id]: {
            value: Number(value.replace(/[^0-9\.]+/g, "")),
            label: account.name,
          } });
        }
      }
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.give.state === "success" && this.props.give.state === "success") {
      this.props.clearTransactions();
    }
  }

  format = (amount: number, target: Object) => {
    const { id, name } = target;

    const value = monetize(amount);

    this.props.addTransactions({ [id]: {
      value: Number(value.replace(/[^0-9\.]+/g, "")),
      label: name,
    } });

    return value;
  }

  saveData = (amount: number, target: Object) => {
    const { id, name } = target;

    const value = monetize(amount);

    this.props.addTransactions({ [id]: {
      value: Number(value.replace(/[^0-9\.]+/g, "")),
      label: name,
    } });

    return true;
  }


  preFillValue = (id: string) => {
    const { transactions } = this.props.give;

    if (transactions[id] && transactions[id].value) {
      return `$${transactions[id].value}`;
    }

    return null;
  }


  render() {
    const { total } = this.props.give;
    if (!this.props.accounts || this.props.accounts.length === 0) return null;
    const accounts = this.props.accounts.map((x) => ({
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
        format={this.format}
        preFill={this.preFillValue}
        total={total}
        transactions={{ ...this.props.give.transactions }}
        donate={this.props.donate}
      />

    );
  }
}

export default withGiveActions(CartContainer);

export {
  CartContainer as CartContainerWithoutData,
};
