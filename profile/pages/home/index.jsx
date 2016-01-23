import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../core/graphql"

import Layout from "./Layout"
import { Likes, Following } from "../../blocks"
import { onBoard as onBoardActions } from "../../../core/store"



const map = (state) => ({ person: state.onBoard.person })
@connect(map)
export default class Home extends Component {

  state = {
    content: 0
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

  render () {

    const { person } = this.props
    let { photo } = person

    photo = photo ? `//core-rock.newspring.cc/${photo}` : null

    return (
      <Layout
        photo={photo}
        person={person}
        onToggle={this.onToggle}
        content={this.getContent()}
      />
    )
  }
}
