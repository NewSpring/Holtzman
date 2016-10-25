import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import moment from "moment";

import modalActions from "../../store/modal";
import giveActions from "../../store/give";

import Later from "./Later";
import Remind from "./Remind";
import Recover from "./Recover";

const map = (store) => ({ give: store.give });
@connect(map)
export default class RecoverSchedules extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    give: PropTypes.object,
  }

  state = {
    state: "default", // default, remind, later
  }

  onRemind = (e) => {
    e.preventDefault();

    const input = document.getElementById("remind-frequency");
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

  back = (e) => {
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

    if (state === "later") {
      return <Later date={reminderDate} onClick={this.close} />;
    }

    if (state === "remind") {
      return (
        <Remind
          onSubmit={this.onRemind}
          onChange={this.onFrequencyChange}
          back={this.back}
        />
      );
    }


    return (
      <Recover
        schedules={arr}
        hide={this.close}
        onClick={() => { this.setState({ state: "remind" }); }}
      />
    );
  }

}
