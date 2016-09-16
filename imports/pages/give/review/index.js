import { Component } from "react";
import { connect }from "react-apollo";
import Layout from "./Layout";

import Loading from "../../../blocks/give/Loading";
import Err from "../../../blocks/give/Err";
import Success from "../../../blocks/give/Success";

import { give as giveActions, nav as navActions } from "../../../store";

const mapStateToProps = (state) => ({
  give: state.give,
});
@connect({mapStateToProps})
class Template extends Component {

  componentWillMount() {
    const giveData = this.getGiveData();
    const { dispatch } = this.props;
    // hide nav
    dispatch(navActions.hide());
    // store payment personal and billing
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
          var arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
          queryString[pair[0]] = arr;
        // If third or later entry with this name
        } else {
          queryString[pair[0]].push(decodeURIComponent(pair[1]));
        }
      });
      return JSON.parse(queryString.giveData);
    } catch (error) { }
  }

  monentize = (value, fixed) => {

    if (typeof value === "number") {
      value = `${value}`;
    }

    if (!value.length) {
      return "$0.00";
    }

    value = value.replace(/[^\d.-]/g, "");

    let decimals = value.split(".")[1];
    if ((decimals && decimals.length >= 2) || fixed) {
      value = Number(value).toFixed(2);
      value = String(value);
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${value}`;
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(giveActions.submit());
  }

  render() {
    const giveData = this.getGiveData();
    const { state, errors, total, data, transactionType } = this.props.give;

    switch (state) {
      case "loading":
        return <Loading msg="We're Processing Your Contribution" />;
      case "error":
        return (<Err
            msg={errors[Object.keys(errors)[0]].error}
            additionalMessage="Please click 'Done' in the top left of your screen to get back to the app"
                />);
      case "success":
        return (<Success
            total={this.monentize(total.toFixed(2))}
            email={data.personal.email}
            guest={false} // prevent showing giving history
            additionalMessage="Please click 'Done' in the top left of your screen to get back to the app"
                />);
      default:
        return <Layout {...giveData} onSubmit={this.onSubmit} />;
    }
  }
}

const Routes = [
  { path: "review", component: Template }
];

export default {
  Template,
  Routes,
};
