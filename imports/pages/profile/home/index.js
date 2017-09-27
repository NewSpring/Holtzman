import PropTypes from 'prop-types';
import { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Layout from "./Layout";
import Likes from "../../../components/people/profile/likes";
import Following from "../../../components/people/profile/following";

import {
  nav as navActions,
  header as headerActions,
} from "../../../data/store";

import withProfileUpload from "../profile-photo";

class HomeWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({
      person: PropTypes.object,
    }),
    upload: PropTypes.func,
    photo: PropTypes.string,
  }

  state = { content: 0, photo: null }

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = { title: "Profile", showSettings: true };
      this.props.dispatch(headerActions.set(item));
    }

    this.props.dispatch(navActions.setLevel("TOP"));
  }

  onToggle = content => this.setState({ content })
  getContent = () => this.content[this.state.content]

  content = [<Likes />, <Following />]

  render() {
    const { upload } = this.props;

    let person = {};
    if (this.props.data && this.props.data.person) person = this.props.data.person;

    // if (this.props.data.loading) return <Loading /> // XXX
    let { photo } = person;
    if (this.props.photo) photo = this.props.photo;

    return (
      <Layout
        photo={photo}
        person={person}
        onToggle={this.onToggle}
        content={this.getContent()}
        onUpload={upload}
      />
    );
  }
}

// XXX Query is duplicated within profile section
const GET_PERSON_QUERY = gql`
  query GetPerson {
    person: currentPerson (cache: false) {
      photo
      firstName
      nickName
      lastName
      home {
        city
      }
    }
  }
`;

const withPerson = graphql(GET_PERSON_QUERY, {
  // XXX authorized is still not returning well enough
  // skip: (ownProps) => !Meteor.userId()  !ownProps.authorized,
});
const mapStateToProps = state => ({ authorized: state.accounts.authorized });

export default withPerson(
  withProfileUpload(
    connect(mapStateToProps)(
      HomeWithoutData
    )
  )
);

export {
  HomeWithoutData,
  GET_PERSON_QUERY,
};
