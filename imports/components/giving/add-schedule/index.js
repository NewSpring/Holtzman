// @flow

import serverWatch from "meteor/bjwiley2:server-watch";
import { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { monetize } from "../../../util/format";
import createContainer from "../../../deprecated/meteor/react-meteor-data";
import { give as giveActions } from "../../../data/store";
import Offline from "../offline";
import Layout from "./Layout";

type ICartContainer = {
  accounts: Object,
  addTransactions: Function,
  alive: boolean,
  // clearAllSchedulesExcept: Function,
  clearSchedules: Function,
  clearTransactions: Function,
  existing: Object,
  onClick: Function,
  removeSchedule: Function,
  saveSchedule: Function,
  setTransactionType: Function,
  text: string,
  dataId: number,
  give: Object,
};

type IState = {
  amount: ?number,
  frequency: ?string,
  fundId: ?number,
  fundLabel: ?string,
  startDate: ?string,
};

// XXX move this to a global constructs file?
const GIVING_SCHEDULES = [
  { label: "one time", value: "One-Time" },
  { label: "every week", value: "Weekly" },
  { label: "every two weeks", value: "Bi-Weekly" },
  { label: "once a month", value: "Monthly" },
];

class CartContainer extends Component {
  props: ICartContainer;

  state: IState = {
    amount: undefined,
    frequency: null,
    fundId: null,
    fundLabel: null,
    startDate: null,
  };

  componentWillMount() {
    this.props.clearTransactions();

    if (this.props.existing) {
      const { existing } = this.props;
      if (existing.details && existing.details.length && existing.details[0].account) {
        this.setState({
          fundId: Number(existing.details[0].account.id),
          fundLabel: existing.details[0].account.name,
          frequency: existing.frequency,
          amount: Number(`${existing.details[0].amount}`.replace(/[^0-9\.]+/g, "")),
          // XXX add type for {existing}
          startDate: existing.start,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    const { transactions, schedule } = nextProps.give;

    if (transactions && Object.keys(transactions).length === 0 && schedule && !schedule.start) {
      const form: FormElement = (document.getElementById("add-to-cart"): any);
      if (form) form.reset();
    }
  }

  componentWillUnmount() {
    this.props.clearSchedules();
  }

  onClick = (e: Event) => {
    e.preventDefault();

    const cartTotal = Number(this.state.amount);
    const cartFundLabel = this.state.fundLabel;
    const cartFundId = this.state.fundId;

    let keepGoing = true;
    if (cartFundId && cartTotal && cartFundLabel) {
      // this.props.clearAllSchedulesExcept(Number(this.state.fundId));

      this.props.saveSchedule({
        frequency: this.state.frequency,
        start: this.state.startDate,
      });

      this.props.clearTransactions();
      this.props.addTransactions({
        [cartFundId]: {
          value: cartTotal,
          label: cartFundLabel,
        },
      });
    }

    if (this.props.onClick) keepGoing = this.props.onClick(e);
    return keepGoing;
  };

  setFund = (id: number) => {
    const selectedFund = this.props.accounts.filter(fund => fund.id === Number(id));
    const { name } = selectedFund[0];

    if (this.state.fundId !== id) this.props.removeSchedule(this.state.fundId);

    this.setState({ fundId: id, fundLabel: name });
    this.props.saveSchedule({
      frequency: this.state.frequency,
      start: this.state.startDate,
    });

    this.props.setTransactionType("recurring");
  };

  setFrequency = (value: string) => {
    this.setState({ frequency: value });
    if (this.state.fundId) {
      this.props.saveSchedule({ frequency: value });
    }
  };

  format = (val: string, target: Object) => {
    const { id, name } = target;

    const value = monetize(val, false, 2);

    this.setState({
      fundId: id,
      fundLabel: name,
      amount: Number(value.replace(/[^0-9\.]+/g, "")),
    });

    return value;
  };

  saveData = (val: string, target: Object) => {
    const { id, name } = target;

    const value = monetize(val, false, 2);
    this.setState({
      fundId: id,
      fundLabel: name,
      amount: Number(value.replace(/[^0-9\.]+/g, "")),
    });

    return true;
  };

  saveDate = (value: string) => {
    const { fundId } = this.state;

    const date = moment(new Date(value)).format("YYYYMMDD");

    this.setState({ startDate: date });

    if (fundId) this.props.saveSchedule({ start: new Date(value) });
    return true;
  };

  render() {
    if (!this.props.alive) return <Offline />;

    const mappedAccounts = this.props.accounts.map((x: Object) => ({
      value: x.id,
      label: x.name,
    }));

    if (!mappedAccounts.length) {
      return null;
    }

    let isCheckoutReady = false;
    if (this.state.fundId && this.state.fundLabel && this.state.startDate && this.state.frequency) {
      isCheckoutReady = true;
    }

    return (
      <Layout
        accounts={mappedAccounts}
        date={this.state.startDate}
        existing={this.props.existing}
        format={this.format}
        onSubmitSchedule={this.onClick}
        ready={isCheckoutReady}
        schedules={GIVING_SCHEDULES}
        setFrequency={this.setFrequency}
        setFund={this.setFund}
        save={this.saveData}
        saveDate={this.saveDate}
        state={this.state}
        text={this.props.text}
        total={Number(this.state.amount)}
        dataId={this.props.dataId}
      />
    );
  }
}

// We only care about the give state
const map = state => ({ give: state.give });

// spins up a cart if Rock is online
export default createContainer(() => {
  let alive = true;
  try {
    alive = serverWatch.isAlive("ROCK");
  } catch (e) {} // eslint-disable-line
  return { alive };
}, connect(map, giveActions)(CartContainer));

export { CartContainer };
