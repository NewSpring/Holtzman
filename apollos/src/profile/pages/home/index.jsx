import { Component, PropTypes} from "react"
import { connect } from "react-apollo";
import gql from "apollo-client/gql";

import headerActions from "../../../core/store/header"

import Layout from "./Layout"
import { Likes, Following } from "../../blocks"

import {
  accounts as accountsActions,
  nav as navActions,
} from "../../../core/store"

import { avatar } from "../../../core/methods/files/client"

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
  }
})

@connect({ mapQueriesToProps })
export default class Home extends Component {

  state = {
    content: 0,
    photo: null
  }

  content = [<Likes />, <Following />]

  componentDidMount(){
    if (process.env.NATIVE) {
      const item = {
        title: "Profile",
        showSettings: true,
      };

      this.props.dispatch(headerActions.set(item));
      this.setState({
        __headerSet: true,
      });
    }

    this.props.dispatch(navActions.setLevel("TOP"))
  }

  getContent = () => {
    return this.content[this.state.content]
  }

  onToggle = (toggle) => {
    this.setState({
      content: toggle
    })
  }

  onUpload = (e) => {
    let files = e.target.files

    if (!Meteor.settings.public.rock) {
      return
    }

    var data = new FormData()
    data.append('file', files[0])

    const { baseURL, token, tokenName } = Meteor.settings.public.rock

    fetch(`${baseURL}api/BinaryFiles/Upload?binaryFileTypeId=5`, {
      method: 'POST',
      headers: { [tokenName]: token },
      body: data
    })
      .then((response) => {
        return response.json()
       })
      .then((id) => {
        avatar(id, (err, response) => {
          updateUser(Meteor.userId(), this.props.dispatch)
        })
      })

    const save = (url) => {
      this.setState({
        photo: url
      })
    }

    for (let file in files) {
      // console.log(files[file])
      let { name } = files[file]
      let reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = ((theFile) => {
        return (e) => {
          // Render thumbnail.
          return save(e.target.result)
        };
      })(files[file]);

      // Read in the image file as a data URL.
      reader.readAsDataURL(files[file]);

      break;

    }

  }

  render () {

    let { person } = this.props.data
    person || (person = {});

    // if (this.props.data.loading) return <Loading /> // XXX
    let { photo } = person

    if (this.state.photo) {
      photo = this.state.photo
    }

    return (
      <Layout
        photo={photo}
        person={person}
        onToggle={this.onToggle}
        content={this.getContent()}
        onUpload={this.onUpload}
      />
    )
  }
}
