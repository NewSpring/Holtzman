import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import Layout from "./Layout";

import { header as headerActions } from "../../store";

const mapQueriesToProps = () => ({
  data: {
    query: gql`
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
    `,
  },
});

class LayoutWithData extends Component {

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

const Template = connect({ mapQueriesToProps })(LayoutWithData);

const Routes = [
  {
    path: "/locations",
    component: Template,
  },
];

export default {
  Routes,
};
