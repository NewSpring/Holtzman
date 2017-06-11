import PropTypes from "prop-types";
import { Component } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";
import moment from "moment";

import {
  nav,
} from "../../../../data/store";

import { update } from "../../../../deprecated/methods/accounts/browser";

import { Loading, Error as Err } from "../../../../components/@primitives/UI/states";

import Success from "../Success";
import Layout from "./Layout";

class PersonalDetailsWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    person: PropTypes.shape({
      person: PropTypes.object,
      refetch: PropTypes.func,
    }),
    campuses: PropTypes.shape({
      campuses: PropTypes.array,
    }),
  }

  state = {
    month: null,
    state: "default",
  }

  componentWillMount() {
    this.props.dispatch(nav.setLevel("BASIC_CONTENT"));
  }

  componentWillUnmount() {
    this.props.dispatch(nav.setLevel("TOP"));
  }

  getDays = () => {
    let totalDays = moment("1", "M").daysInMonth();
    if (this.state.month) {
      totalDays = moment(this.state.month, "M").daysInMonth();
    }

    const arr = [];
    for (let i = 0; i < totalDays; i += 1) {
      arr.push({ label: i + 1, value: i + 1 });
    }
    return arr;
  }

  getMonths = () => (
    moment.monthsShort().map((month, i) => (
      { label: month, value: i + 1 }
    ))
  )

  getYears = () => {
    const now = new Date().getFullYear();

    const arr = [];
    for (let i = 0; i < 150; i += 1) {
      arr.push({ label: (now - i), value: (now - i) });
    }

    return arr;
  }

  saveMonth = (value) => {
    this.setState({ month: value });

    return true;
  }

  updatePerson = (data) => {
    this.setState({ state: "loading" });

    update(data, (err) => {
      if (err) {
        this.setState({ state: "error", err });
        setTimeout(() => this.setState({ state: "default" }), 3000);
        return;
      }


      this.setState({ state: "success" });
      this.props.person.refetch({ cache: false })
        .then(() => this.setState({ state: "default" }));
    });
  }

  render() {
    let { campuses } = this.props.campuses;
    campuses = campuses && campuses.map((campus) => ({
      label: campus.name, value: campus.id,
    }));
    const { state, err } = this.state;

    switch (state) {
      case "error":
        return (
          <div style={{ position: "fixed", top: 0, bottom: 0, width: "100%" }}>
            <Err error={err} msg="Looks like there was a problem" />;
          </div>
        );
      case "loading":
        return (
          <div style={{ position: "fixed", top: 0, bottom: 0, width: "100%" }}>
            <Loading msg="Updating your information..." />;
          </div>
        );
      case "success":
        return <Success msg="Your information has been updated!" />;
      default:
        return (
          <Layout
            submit={this.updatePerson}
            months={this.getMonths()}
            saveMonth={this.saveMonth}
            days={this.getDays()}
            years={this.getYears()}
            person={(this.props.person && this.props.person.person) || {}} // XXX perf
            campuses={campuses}
          />
        );
    }
  }
}

// XXX remove cache: false once we feel good about caching
const CAMPUSES_QUERY = gql`
  query GetCampuses {
    campuses {
      name
      shortCode
      id: entityId
      locationId
    }
  }
`;
const withCampuses = graphql(CAMPUSES_QUERY, { name: "campuses" });

const PERSON_QUERY = gql`
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
`;
const withPerson = graphql(PERSON_QUERY, {
  name: "person",
  skip: (ownProps) => !ownProps.authorized,
  options: () => ({
    variables: { cache: false },
    forceFetch: true,
  }),
});

export const mapStateToProps = ({ accounts }) => ({
  authorized: accounts.authorized,
});

export default withCampuses(
  connect(mapStateToProps)(
    withPerson(
      PersonalDetailsWithoutData
    )
  )
);

export {
  PersonalDetailsWithoutData,
  CAMPUSES_QUERY,
  PERSON_QUERY,
};
