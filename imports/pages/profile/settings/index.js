import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
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

const mapQueriesToProps = () => ({
  data: {
    query: gql`
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
    `,
  },
});
@withProfileUpload
@connect({ mapQueriesToProps })
class Template extends Component {

  static propTypes = {
    dispatch: PropTypes.function.isRequired,
    data: {
      person: PropTypes.object.isRequired,
    },
    location: {
      pathname: PropTypes.string.isRequired,
    },
    children: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
  }

  onUpload = (e) => {
    this.props.upload(e).then(() => this.props.data.refetch())
  }

  render() {
    const { photo } = this.props;
    const { person } = this.props.data;

    let mobile = process.env.WEB;
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
