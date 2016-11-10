// @flow

import { Component } from "react";
import { connect } from "react-redux";
import Layout from "./Layout";

import Loading from "../../../blocks/give/Loading";
import Err from "../../../blocks/give/Err";
import Success from "../../../blocks/give/Success";

import { give as giveActions, nav as navActions } from "../../../store";

type ITemplate = {
  dispatch: Function,
  give: Object,
};

const mapStateToProps = (state) => ({ give: state.give });

export class Template extends Component {

  props: ITemplate;

  componentWillMount() {
    const giveData = this.getGiveData();

    if (!giveData) return;

    const { dispatch } = this.props;
  //   // // hide nav
    dispatch(navActions.hide());
    // // store payment personal and billing
    dispatch(giveActions.save(giveData.data));
    // store url
    dispatch(giveActions.setDetails(giveData.url));
    // store transactions
    dispatch(giveActions.addTransactions(giveData.transactions));
    // store saved account
    dispatch(giveActions.setAccount(giveData.savedAccount));

    // store user id to match rock personal
    dispatch(giveActions.setUserId(giveData.userId));
  }

  onSubmit = (event: Function) => {
    event.preventDefault();
    this.props.dispatch(giveActions.submit());
  }

  getGiveData = () => {
    try {
      const queryString = {};
      const query = window.location.search.substring(1);
      const vars = query.split("&");
      vars.map((_, i) => {
        const pair = vars[i].split("=");
        // If first entry with this name
        if (typeof queryString[pair[0]] === "undefined") {
          queryString[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
        } else if (typeof queryString[pair[0]] === "string") {
          const arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
          queryString[pair[0]] = arr;
        // If third or later entry with this name
        } else {
          queryString[pair[0]].push(decodeURIComponent(pair[1]));
        }
        return null;
      });
      return JSON.parse(queryString.giveData);
    } catch (error) { /* do nothing */ }
    return null;
  }

  // XXX replace the function in PR 1431 with this one
  monetize = (value: string | number, fixed?: boolean): string => {
    let amount = typeof value === "number" ? `${value}` : value;

    if (!amount || !amount.length) {
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

  render() {
    // const giveData = this.getGiveData();
    const { state, errors, total, data } = this.props.give;

    switch (state) {
      case "loading":
        return <Loading msg="We're Processing Your Contribution" />;
      case "error":
        return (<Err
          msg={errors[Object.keys(errors)[0]].error}
          additionalMessage={
            "Please click 'Done' in the top left of your screen to get back to the app"
          }
        />);
      case "success":
        return (<Success
          total={this.monetize(total.toFixed(2))}
          email={data.personal.email}
          guest={false} // prevent showing giving history
          additionalMessage={
            "Please click 'Done' in the top left of your screen to get back to the app"
          }
        />);
      default:
        return <Layout {...data} onSubmit={this.onSubmit} />;
    }
  }
}

const TemplateWithData = connect(mapStateToProps)(Template);

const Routes = [
  { path: "review", component: TemplateWithData },
];

export default {
  Template,
  Routes,
};
