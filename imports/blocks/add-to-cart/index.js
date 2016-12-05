// @flow
/* global serverWatch */
import { Component } from "react";
import { connect } from "react-redux";

import { give as giveActions } from "../../store";
import { monetize } from "../../util/format/currency";
import Layout from "./Layout";

// We only care about the give state
const map = ({ routing, give }) => ({
  status: give.state,
  query: routing.location.query,
});
export const withGiveActions = connect(map, giveActions);

type ICartContainer = {
  clearTransaction: Function,
  clearTransactions: Function,
  accounts: Object[],
  addTransactions: Function,
  query: Object,
  status: string,
};

type ISelectOptions = {
  label: string | number,
  value: string | number,
};

type ISubFund = {
  accounts: ISelectOptions[],
  primary: boolean,
  id: number,
  fundId: ?number,
  amount: ?number | string,
};

type ICartContainerState = {
  subfunds: ISubFund[],
};

class CartContainer extends Component {

  props: ICartContainer;
  state: ICartContainerState;

  static defaultProps = {
    accounts: [],
  }

  state = { subfunds: [] }

  componentWillMount() {
    const { query } = this.props;

    // set intial funds
    if (Object.keys(query).length) {
      const transactions = {};
      for (const { id, name } of this.props.accounts) {
        // eslint-disable-next-line
        if (!query[name]) continue;
        transactions[id] = { label: name, value: Number(query[name]) };
      }
      this.props.addTransactions(transactions);
    } else {
      this.props.clearTransactions();
    }

    const subfunds = this.calculateDefaultSubfunds(query);
    this.setState({ subfunds });
  }

  componentWillReceiveProps({ status }: Object) {
    // reset the component after success
    if (status === "default" && this.props.status === "success") {
      this.props.clearTransactions();
      const subfunds = this.calculateDefaultSubfunds();
      this.setState({ subfunds });
    }
  }

  calculateDefaultSubfunds = (query: Object = {}) => {
    // copy array to mutate it
    let accounts = [...this.props.accounts];
    return this.props.accounts
      .map((account: Object, index) => {
        // only show the correct number of initial fund states
        if (this.props.accounts.length > (accounts.length + 1)) return {};

        let fundId = index === 0 ? accounts[0].id : undefined;
        let amount = null;

        const obj: ISubFund = {
          accounts: [...accounts].map((x) => ({ label: x.name, value: x.id })),
          primary: this.props.accounts.length === accounts.length,
          id: index + 1,
          fundId,
          amount,
        };

        let prefilled = false;
        // dynamically map items from the url
        if (Object.keys(query).length) {
          let earlyReturn = false;
          for (const { name, id } of this.props.accounts) {
            // eslint-disable-next-line
            if (!query[name]) continue;
            // eslint-disable-next-line
            if (earlyReturn) continue;
            prefilled = true;
            accounts = accounts.filter((x) => x.id !== id);
            amount = Number(query[name]);
            fundId = id;
            // eslint-disable-next-line
            delete query[name];
            // can't use a break statement becuase it messes up jest
            earlyReturn = true;
          }
        }

        if (!prefilled) accounts.shift();

        obj.fundId = fundId;
        obj.amount = amount;

        return obj;
      })
      .filter((x) => !!x.id);
  }

  getFund = (id: number) => this.props.accounts.filter((x) => x.id === id)[0]

  changeAmount = (amount: number, id: number) => {
    let newAmount = `${amount}`;

    // starting with a decimal
    if (newAmount === ".") newAmount = "0.0";

    let decimals = newAmount.split(".")[1];
    if (decimals && decimals[0] === "0" && decimals.length > 2) {
      const newDecimals = decimals.split(""); // turn into an array
      newDecimals.splice(0, 1); // remove extra 0
      newAmount = `${newAmount.split(".")[0]}.${newDecimals[0]}${newDecimals[1]}`;
    }

    // XXX this is a hack becuase our components are not truely controlled right now
    // I'm not even sure how onBlur works on controlled components tbh
    // handles live typing of amounts with 0 in the decimal place or longer than 2 figures
    decimals = newAmount.split(".")[1];
    if (decimals && decimals[1] === "0") {
      const newDecimals = decimals.split(""); // turn into an array
      newDecimals.splice(1, 1); // remove extra 0
      newAmount = `${newAmount.split(".")[0]}.${newDecimals[0]}${newDecimals[1]}`;
    }

    // make sure the amount isn't longer than 2 decimals after the inline replacement
    decimals = newAmount.split(".")[1];
    if (decimals && `${decimals}`.length > 2) {
      const newDecimals = `${decimals}`.split(""); // turn into an array
      newAmount = `${newAmount.split(".")[0]}.${newDecimals[0]}${newDecimals[1]}`;
    }

    const value = Number(`${newAmount}`.replace(/[^0-9\.]+/g, ""));

    if (isNaN(value)) return 0;

    // this will rerender the component and rebuild
    // the subfunds as needed
    this.setState(({ subfunds }) => {
      // move the fund around
      const newFunds = subfunds.map((subfund) => {
        const newFund = subfund;
        if (subfund.fundId === id) newFund.amount = value;
        return newFund;
      });

      return { subfunds: newFunds };
    });

    const fund = this.getFund(id);
    if (fund && fund.name) {
      // this won't rerender but will update the store
      // consider it a side effect
      this.props.addTransactions({ [id]: { label: fund.name, value } });
    }

    return `$${newAmount.replace(/[^0-9\.]+/g, "")}`;
  }

  changeFund = (id: number, subfundId: number) => {
    const { state } = this;

    this.setState(({ subfunds }) => {
      // the funds need to change in the subfunds when one is selected
      // a subfund should never show a slected fund
      // so we find which funds are selected
      // then remove them from the subfunds accounts
      const selectedFunds = [id, ...subfunds.map(({ amount, fundId }) => amount && fundId)]
        .filter((x) => !!x);

      // move the fund around
      const newFunds = subfunds.map((subfund) => {
        const newFund = subfund;
        // change the id of the active subfund
        if (subfund.id === subfundId) {
          // deselect the subfund
          if (!id) {
            newFund.fundId = undefined;
            newFund.amount = null;
            selectedFunds.splice(selectedFunds.indexOf(subfund.fundId), 1);
          } else {
            newFund.fundId = id;
          }
        } else {
          // if the subfund has an amount, don't remove it from the list
          if (subfund.amount) {
            selectedFunds.splice(selectedFunds.indexOf(subfund.fundId), 1);
          }
          // update the accounts of the other funds
          newFund.accounts = this.props.accounts
            .filter((x) => selectedFunds.indexOf(x.id) === -1)
            .map((x) => ({ label: x.name, value: x.id }));
        }

        return newFund;
      });

      return { subfunds: newFunds };
    });

    // this is a side effect
    // it wont rerender
    // this subfund instance was managing the following subfund
    const currentFund: Object[] = state.subfunds
      .filter((x) => x.id === subfundId);

    if (currentFund.length) {
      this.props.clearTransaction(currentFund[0].fundId);
      const fund = this.getFund(id);
      // this won't rerender but will update the store
      // consider it a side effect
      if (fund && currentFund[0].amount) {
        this.props.addTransactions({
          [id]: {
            value: Number(`${currentFund[0].amount}`.replace(/[^0-9\.]+/g, "")),
            label: fund.name,
          },
        });
      }
    }
    return true;
  }

  preFillValue = (id: string) => {
    if (!this.state.subfunds.length) return null;
    const fund = this.state.subfunds.filter(({ fundId }) => fundId === id);
    return fund[0] && fund[0].amount && monetize(`${fund[0].amount}`.replace(/[^0-9\.]+/g, ""));
  }

  render() {
    // we could pull from the redux store, but we would end up
    // overrendering from local state and store updates
    const total = this.state.subfunds
      .map(({ amount }) => Number(amount) || 0)
      .reduce((x: number, y: number) => x + y, 0);

    const { accounts } = this.props;
    if (!accounts || !accounts.length) return null;
    return (
      <Layout
        subfunds={this.state.subfunds}
        changeFund={this.changeFund}
        changeAmount={this.changeAmount}
        preFill={this.preFillValue}
        total={total}
      />

    );
  }
}

export default withGiveActions(CartContainer);

export {
  CartContainer as CartContainerWithoutData,
};
