import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import Layout from "./Layout";
import Likes from "../../../blocks/likes";
import Following from "../../../blocks/following";

import {
  nav as navActions,
  header as headerActions,
} from "../../../store";

import { avatar } from "../../../methods/files/browser";

const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query GetPerson {
        person: currentPerson {
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

@connect({ mapQueriesToProps, mapStateToProps })
export default class Home extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: {
      person: PropTypes.object.isRequired,
    },
  }

  state = {
    content: 0,
    photo: null,
  }

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = {
        title: "Profile",
        showSettings: true,
      };

      this.props.dispatch(headerActions.set(item));
      this.changeHeaderState();
    }

    this.props.dispatch(navActions.setLevel("TOP"));
  }

  onToggle = (toggle) => {
    this.setState({
      content: toggle,
    });
  }

  onUpload = (e) => {
    const files = e.target.files;

    if (!Meteor.settings.public.rock) {
      return;
    }

    const data = new FormData();
    data.append("file", files[0]);

    const { baseURL, token, tokenName } = Meteor.settings.public.rock;

    fetch(`${baseURL}api/BinaryFiles/Upload?binaryFileTypeId=5`, {
      method: "POST",
      headers: { [tokenName]: token },
      body: data,
    })
      .then((response) => (response.json()))
      .then((id) => {
        avatar(id, () => {
          // eslint-disable-next-line
          updateUser(Meteor.userId(), this.props.dispatch);
        });
      });

    const save = (url) => {
      this.setState({
        photo: url,
      });
    };

    // eslint-disable-next-line
    for (const file in files) {
      const reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (() => (
        (event) => (
          save(event.target.result) // Render thumbnail
        )
      ))(files[file]);

      // Read in the image file as a data URL.
      reader.readAsDataURL(files[file]);

      break;
    }
  }

  getContent = () => (
    this.content[this.state.content]
  )

  content = [<Likes />, <Following />]

  changeHeaderState = () => {
    this.setState({
      __headerSet: true,
    });
  }

  render() {
    let { person } = this.props.data;
    if (!person) {
      person = {};
    }

    // if (this.props.data.loading) return <Loading /> // XXX
    let { photo } = person;
    if (this.state.photo) photo = this.state.photo;

    return (
      <Layout
        photo={photo}
        person={person}
        onToggle={this.onToggle}
        content={this.getContent()}
        onUpload={this.onUpload}
      />
    );
  }
}
