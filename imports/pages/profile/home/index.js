import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import Layout from "./Layout";
import Likes from "../../../blocks/likes";
import Following from "../../../blocks/following";

import {
  accounts as accountsActions,
  nav as navActions,
  header as headerActions,
} from "../../../store";

import withProfileUpload from "../profile-photo";

const mapQueriesToProps = ({ state }) => ({
  data: {
    forceFetch: true,
    query: gql`
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
    `,
  },
});

const mapStateToProps = state => ({ authorized: state.accounts.authorized });

@withProfileUpload
@connect({ mapQueriesToProps, mapStateToProps })
export default class Home extends Component {

  state = {
    content: 0,
    photo: null,
  }

  content = [<Likes />, <Following />]

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = { title: "Profile", showSettings: true };
      this.props.dispatch(headerActions.set(item));
    }

    this.props.dispatch(navActions.setLevel("TOP"));
  }

  getContent = () => this.content[this.state.content]
  onToggle = content => this.setState({ content })

  render () {
    const { upload } = this.props;

    let { person } = this.props.data;
    person || (person = {});

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
