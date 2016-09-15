import { Component, PropTypes} from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";
import Moment from "moment";

import {
  nav,
  accounts as accountsActions
} from "../../../../store";

import { update } from "../../../../methods/accounts/browser";

import { Loading, Error as Err } from "../../../../components/states";

import Success from "../Success";
import Layout from "./Layout";

// XXX remove cache: false once we feel good about caching
const mapQueriesToProps = () => ({
  campuses: {
    query: gql`
      query GetCampuses {
        campuses {
          name
          shortCode
          id: entityId
          locationId
        }
      }
    `,
  },
  person: {
    query: gql`
      query GetPersonForSettings($cache: Boolean) {
        person: currentPerson(cache: $cache) {
          campus(cache: $cache) { id: entityId }
          firstName
          lastName
          nickName
          email
          birthDay
          birthMonth
          birthYear
        }
      }
    `,
    variables: { cache: false },
    forceFetch: true,
  },
});
@connect({ mapQueriesToProps })
export default class PersonalDetails extends Component {

  state = {
    month: null,
    state: "default"
  }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("BASIC_CONTENT"));
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"));
  }

  getDays = () => {

    let totalDays = Moment("1", "M").daysInMonth();
    if (this.state.month) {
      totalDays = Moment(this.state.month, "M").daysInMonth();
    }

    let arr = [];
    for (let i = 0; i < totalDays; i++) {
      arr.push({ label: i + 1, value: i + 1});
    }
    return arr;
  }

  getMonths = () => {
    return Moment.monthsShort().map((month, i) => {
      return { label: month, value: i + 1};
    });
  }

  getYears = () => {
    let now = new Date().getFullYear();

    let arr = [];
    for (let i = 0; i < 150; i++) {
      arr.push({ label: (now - i), value: (now - i)});
    }

    return arr;

  }

  saveMonth = (value) => {
    this.setState({month: value});

    return true;
  }

  updatePerson = (data) => {

    this.setState({ state: "loading" });

    let refs = this.refs;
    update(data, (err, result) => {

      if (err) {
        this.setState({ state: "error", err: err });
        setTimeout(() => this.setState({ state: "default"}), 3000);
        return;
      }


      this.setState({ state: "success" });
      this.props.person.refetch({ cache: false })
        .then(() => this.setState({ state: "default"}));

    });


  }

  render () {

    let { campuses } = this.props.campuses;
    campuses = campuses && campuses.map((campus) => {
      return { label: campus.name, value: campus.id };
    });
    const { state, err } = this.state;

    switch (state) {
      case "error":
        return (
          <div style={{ position: "fixed", top: 0, bottom: 0, width: "100%"}}>
            <Err error={err} msg="Looks like there was a problem" />;
          </div>
        );
      case "loading":
        return (
          <div style={{ position: "fixed", top: 0, bottom: 0, width: "100%"}}>
            <Loading msg="Updating your information..." />;
          </div>
        );
      case "success":
        return <Success msg="Your information has been updated!" />;
      default:
        return  (
          <Layout
              submit={this.updatePerson}
              months={this.getMonths()}
              saveMonth={this.saveMonth}
              days={this.getDays()}
              years={this.getYears()}
              person={this.props.person && this.props.person.person || {}} // XXX perf
              campuses={campuses}
          />
        );
    }

  }
}
