import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import {
  nav as navActions,
} from "../../../store";

import withProfileUpload from "../profile-photo";

import Layout from "./Layout";
import Menu from "./Menu";
import ChangePassword from "./ChangePassword";
import PersonalDetails from "./PersonalDetails";
import HomeAddress from "./HomeAddress";
import PaymentDetails from "./Payments";

const PERSON_QUERY = gql`
  query GetPersonForSettings {
    person: currentPerson(cache: false) {
      firstName
      lastName
      nickName
      photo
      home {
        state
        city
      }
    }
  }
`;

const withPerson = graphql(PERSON_QUERY);

@withProfileUpload
@connect()
@withPerson
class Template extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({
      person: PropTypes.object,
      refetch: PropTypes.func,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    children: PropTypes.object.isRequired,
    upload: PropTypes.func,
    photo: PropTypes.string,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
  }

  onUpload = (e) => {
    this.props.upload(e).then(() => this.props.data.refetch());
  }

  render() {
    const { photo } = this.props;
    const { person } = this.props.data;

    let mobile = !!process.env.WEB;
    if (this.props.location.pathname.split("/").length > 3) {
      mobile = false;
    }

    if (photo) person.photo = photo;
    return (
      <Layout person={person || {}} mobile={mobile} onUpload={this.onUpload}>
        {this.props.children}
      </Layout>
    );
  }
}


const Routes = [
  {
    path: "settings",
    component: Template,
    indexRoute: {
      component: Menu,
    },
    childRoutes: [
      { path: "change-password", component: ChangePassword },
      { path: "personal-details", component: PersonalDetails },
      { path: "home-address", component: HomeAddress },
      { path: "saved-accounts", component: PaymentDetails },
    ],
  },
];

export default {
  Template,
  Routes,
};
