// @flow
import { Component } from "react";
import { connect } from "react-redux";
// $FlowMeteor
import { Meteor } from "meteor/meteor";
import moment from "moment";

import modalActions from "../../../data/store/modal";
import giveActions from "../../../data/store/give";

import Layout from "./Layout";

const map = store => ({ give: store.give });

type IRecoverSchedules = {
  dispatch: Function,
  give: Object,
}

export class RecoverSchedules extends Component {
  props: IRecoverSchedules;

  state = {
    state: "default", // default, remind, later
  }

  onRemind = (e: Event) => {
    e.preventDefault();

    // XXX deprecate id based find for node reference on element
    const input: HTMLInputElement = (document.getElementById("remind-frequency"): any);
    const value = input.value;

    const time = {
      tomorrow: moment().add(1, "days").toDate(),
      nextWeek: moment().add(7, "days").toDate(),
      twoWeeks: moment().add(14, "days").toDate(),
    };

    Meteor.users.update({ _id: Meteor.userId() }, {
      $set: {
        "profile.reminderDate": time[value],
      },
    }, (err, result) => {
      // eslint-disable-next-line no-console
      console.log(err, result);
    });

    this.props.dispatch(giveActions.setReminder(time[value]));
    this.props.dispatch(giveActions.clearData());
    this.setState({ state: "later" });
  }

  back = (e: Event) => {
    e.preventDefault();

    this.setState({ state: "default" });
  }


  close = () => {
    this.props.dispatch(modalActions.hide());
  }


  render() {
    const { state } = this.state;
    const arr = [];
    const { recoverableSchedules, reminderDate } = this.props.give;

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const schedule in recoverableSchedules) {
      arr.push(recoverableSchedules[schedule]);
    }

    return (
      <Layout
        reminderDate={reminderDate}
        closeFunction={this.close}
        onSubmit={this.onRemind}
        back={this.back}
        schedules={arr}
        hide={this.close}
        recoverOnClick={() => { this.setState({ state: "remind" }); }}
        state={state}
      />
    );
  }
}

export default connect(map)(RecoverSchedules);
