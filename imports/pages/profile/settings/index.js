import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import {
  nav as navActions,
} from "../../../data/store";

import withProfileUpload from "../profile-photo";

import Layout from "./Layout";
import Menu from "./Menu";
import ChangePassword from "./ChangePassword";
import PersonalDetails from "./PersonalDetails";
import HomeAddress from "./HomeAddress";

class TemplateWithoutData extends Component {

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

  onUpload = e => {
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

const withPerson = graphql(PERSON_QUERY, {
  skip: ownProps => !ownProps.authorized,
  options: {
    forceFetch: true,
  },
});

export const mapStateToProps = ({ accounts }) => ({
  authorized: accounts.authorized,
});

const Template = withProfileUpload(
  connect(mapStateToProps)(
    withPerson(
      TemplateWithoutData,
    ),
  ),
);

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
      {
        path: "saved-accounts",
        onEnter: (nextState: Object, replace: Function) => replace("/give/home"),
      },
    ],
  },
];

export default {
  Template,
  Routes,
};

export {
  TemplateWithoutData,
  PERSON_QUERY,
};
