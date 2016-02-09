import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../core/graphql"

import Layout from "./Layout"
import { Likes, Following } from "../../blocks"
import { onBoard as onBoardActions } from "../../../core/store"
import { avatar } from "../../../core/methods/files/client"
// import Avatars from "../../../core/collections/avatars"

const map = (state) => ({ person: state.onBoard.person })
@connect(map)
export default class Home extends Component {

  state = {
    content: 0,
    photo: null
  }

  // we need to fork react-router-ssr to allow cascading
  // fetch datas
  static fetchData(getStore, dispatch) {

    let id = Meteor.userId()

    if (id) {
      let personQuery = `
        {
          person(mongoId: "${id}") {
            firstName
            lastName
            nickName
            home {
              city
            }
          }
        }
      `

      return GraphQL.query(personQuery)
        .then((person) => {
          dispatch(onBoardActions.person(person.person))
        })
    }

  }

  content = [<Likes />, <Following />]

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
    
    avatar(files[0], (err, response) => {
      console.log(err, response)
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

    const { person } = this.props
    let { photo } = person

    // photo = photo ? `//core-rock.newspring.cc/${photo}` : null

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
