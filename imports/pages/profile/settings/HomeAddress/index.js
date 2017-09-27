import PropTypes from 'prop-types';
import { Component } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import {
  nav,
} from "../../../../data/store";

import { updateHome } from "../../../../deprecated/methods/accounts/browser";
import { Error as Err, Loading } from "../../../../components/@primitives/UI/states";

import Success from "../Success";
import Layout from "./Layout";

const defaultHome = {
  street1: null,
  street2: null,
  state: null,
  city: null,
  zip: null,
  country: null,
};

class HomeAddressWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({
      refetch: PropTypes.func,
      person: PropTypes.object,
    }),
  }

  state = {
    state: "default",
  }

  componentWillMount() {
    this.props.dispatch(nav.setLevel("BASIC_CONTENT"));
  }

  componentWillUnmount() {
    this.props.dispatch(nav.setLevel("TOP"));
  }

  updateAddress = data => {
    this.setState({ state: "loading" });
    updateHome(data, err => {
      if (err) {
        this.setState({ state: "error", err });
        setTimeout(() => {
          this.setState({ state: "default" });
        }, 3000);
        return;
      }

      this.setState({ state: "success" });
      this.props.data.refetch({ cache: false })
        .then(() => {
          this.setState({ state: "default" });
        });
    });
  }

  render() {
    const { person } = this.props.data;
    const { state } = this.state;
    const home = (person && person.home) || defaultHome;

    switch (state) {
      case "error":
        return (
          <div style={{ position: "fixed", top: 0, bottom: 0, width: "100%" }}>
            <Err error={this.state.err} msg="Looks like there was a problem" />;
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
        return <Layout home={home} update={this.updateAddress} />;
    }
  }
}

const PERSON_HOME_QUERY = gql`
  query GetPersonsHome($cache: Boolean) {
    person: currentPerson {
      home(cache: $cache) {
        street1
        street2
        state
        city
        zip
        country
      }
    }
  }
`;

const withPersonHome = graphql(PERSON_HOME_QUERY, {
  options: {
    variables: { cache: true },
    fetchPolicy: "network-only",
  },
});

export default connect()(
  withPersonHome(
    HomeAddressWithoutData,
  ),
);

export {
  HomeAddressWithoutData,
  PERSON_HOME_QUERY,
};
