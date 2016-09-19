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

<<<<<<< af9dad8f18cc2439eddcf93cec4b6bf310851530
  state = { content: 0 }
=======
  state = {
    content: 0,
    photo: null,
  }
>>>>>>> lint fix yayayayay

  content = [<Likes />, <Following />]

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = { title: "Profile", showSettings: true };
      this.props.dispatch(headerActions.set(item));
    }

    this.props.dispatch(navActions.setLevel("TOP"));
  }

<<<<<<< af9dad8f18cc2439eddcf93cec4b6bf310851530
  getContent = () => this.content[this.state.content]
  onToggle = content => this.setState({ content })

  render () {
    const { upload } = this.props;
=======
  getContent = () => {
    return this.content[this.state.content];
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
      .then((response) => {
        return response.json();
      })
      .then((id) => {
        avatar(id, (err, response) => {
          updateUser(Meteor.userId(), this.props.dispatch);
        });
      });

    const save = (url) => {
      this.setState({
        photo: url,
      });
    };

    for (const file in files) {
      const { name } = files[file];
      const reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = ((theFile) => {
        return (e) => {
          // Render thumbnail.
          return save(e.target.result);
        };
      })(files[file]);

      // Read in the image file as a data URL.
      reader.readAsDataURL(files[file]);

      break;
    }
  }

  render() {
>>>>>>> lint fix yayayayay
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
<<<<<<< af9dad8f18cc2439eddcf93cec4b6bf310851530
        onUpload={upload}
=======
        onUpload={this.onUpload}
>>>>>>> lint fix yayayayay
      />
    );
  }
}
