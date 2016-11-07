// @flow

import serverWatch from "meteor/bjwiley2:server-watch";
import { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import createContainer from "../meteor/react-meteor-data";

import { give as giveActions } from "../../store";
import Offline from "../../components/status/Offline";

import Layout from "./Layout";

// XXX move this to a global constructs file?
const GIVING_SCHEDULES = [
    { label: "one time", value: "One-Time" },
    { label: "every week", value: "Weekly" },
    { label: "every two weeks", value: "Bi-Weekly" },
    { label: "once a month", value: "Monthly" },
];

type ICartContainer = {
    accounts: Object,
    addTransactions: Function,
    alive: boolean,
    clearAllSchedulesExcept: Function,
    clearSchedules: Function,
    clearTransactions: Function,
    existing: Object, // eslint-disable-line
    onClick: Function,
    removeSchedule: Function,
    saveSchedule: Function,
    setTransactionType: Function,
    text: string,
};

type IState = {
  fundId: number,
  fundLabel: string,
  frequency: string,
  startDate: string,
  amount: number,
};

// We only care about the give state
const map = (state) => ({ give: state.give });

export const withRedux = connect(map, giveActions);

// refactored because decoraters no likey
// @connect(map, giveActions)
export class CartContainer extends Component {
  props: ICartContainer;

  state: IState;

  componentWillMount() {
    this.props.clearTransactions();

    if (this.props.existing) {
      const { existing }: { existing: Object } = this.props;
      if (existing.details && existing.details.length && existing.details[0].account) {
        this.setState({
          fundId: Number(existing.details[0].account.id),
          fundLabel: existing.details[0].account.name,
          frequency: existing.frequency,
          amount: Number(`${existing.details[0].amount}`.replace(/[^0-9\.]+/g, "")),
        });
      }
    }
  }

  componentWillReceiveProps(nextProps: Object) { // eslint-disable-line
    const { transactions, schedules }: { transactions: Object, schedules: Object } = nextProps.give;

    if (Object.keys(transactions).length === 0 && Object.keys(schedules).length === 0) {
      const form: FormElement = (document.getElementById("add-to-cart"): any);
      if (form) form.reset();
    }
  }

  componentWillUnmount() {
    this.props.clearSchedules();
  }

  // XXX: should remove fixed since it's not being used? DS
  monetize = (val: string, fixed?: boolean) => {
    let value = val;
    if (typeof value === "number") value = `${value}`;
    if (!value.length) return "$0.00";

    value = value.replace(/[^\d.-]/g, "");

    const decimals = value.split(".")[1];
    if ((decimals && decimals.length >= 2) || fixed) {
      value = Number(value).toFixed(2);
      value = String(value);
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${value}`;
  }

  onClick = (e: Event) => {
    e.preventDefault();

    let keepGoing = true;
    if (this.state.fundId) {
      this.props.clearAllSchedulesExcept(Number(this.state.fundId));

      this.props.saveSchedule(this.state.fundId, {
        label: this.state.fundLabel,
        frequency: this.state.frequency,
        start: this.state.startDate,
      });

      this.props.clearTransactions();
      this.props.addTransactions(
        {
          [this.state.fundId]: {
            value: Number(this.state.amount),
            label: this.state.fundLabel,
          },
        });
    }

    if (this.props.onClick) keepGoing = this.props.onClick(e);
    return keepGoing;
  }

  setFund = (id: number) => {
    const selectedFund = this.props.accounts.filter((fund) => fund.id === Number(id));
    const { name }: { name: string } = selectedFund[0];

    if (this.state.fundId !== id) this.props.removeSchedule(this.state.fundId);

    this.setState({ fundId: id, fundLabel: name });
    this.props.saveSchedule(id, {
      label: name,
      frequency: this.state.frequency,
      start: this.state.startDate,
    });

    this.props.setTransactionType("recurring");
  }

  setFrequency = (value: string) => {
    this.setState({ frequency: value });
    if (this.state.fundId) {
      this.props.saveSchedule(this.state.fundId, { frequency: value });
    }
  }

  format = (val: string, target: Object) => {
    const { id, name }: { id: number, name: string } = target;

    const value = this.monetize(val);

    this.setState({
      fundId: id,
      fundLabel: name,
      amount: Number(value.replace(/[^0-9\.]+/g, "")),
    });

    return value;
  }

  saveData = (val: string, target: Object) => {
    const { id, name }: { id: number, name: string } = target;

    const value = this.monetize(val);
    this.setState({
      fundId: id,
      fundLabel: name,
      amount: Number(value.replace(/[^0-9\.]+/g, "")),
    });

    return true;
  }

  saveDate = (value: string) => {
    const { fundId }: { fundId: number } = this.state;

    const date = moment(new Date(value)).format("YYYYMMDD");

    this.setState({ startDate: date });

    if (fundId) this.props.saveSchedule(fundId, { start: new Date(value) });
    return true;
  }

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
      />
    );
  }
}

export default createContainer(() => {
  let alive = true;
  try { alive = serverWatch.isAlive("ROCK"); } catch (e) {} // eslint-disable-line
  return { alive };
}, CartContainer);
