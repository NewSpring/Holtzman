import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";

import Layout from "./Layout";

import { header as headerActions } from "../../data/store";

class LayoutWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = { title: "Locations" };
      this.props.dispatch(headerActions.set(item));
    }
  }

  render() {
    return <Layout {...this.props} />;
  }
}

const CAMPUSES_QUERY = gql`
  query GetCampuses {
    campuses {
      id
      guid
      name
      services
      url
      location {
        street1
        street2
        city
        state
        zip
      }
    }
  }
`;

const withCampuses = graphql(CAMPUSES_QUERY);

const LayoutWithData = connect()(
  withApollo(
    withCampuses(
      LayoutWithoutData,
    ),
  ),
);

const Routes = [
  {
    path: "/locations",
    component: LayoutWithData,
  },
];

export default {
  Routes,
};

export {
  LayoutWithoutData,
  CAMPUSES_QUERY,
};
