import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../../core/graphql"

import { nav, onBoard as onBoardActions } from "../../../../core/store"
import { updateHome } from "../../../../core/methods/auth/client"
import { Error, Loading } from "../../../../core/components/states"

import Success from "../Success"
import Layout from "./Layout"


// @TODO move to saga?
function getUser(id, dispatch) {

  // this is probably to heavy of a universal call?

  // @TODO figure out caching issues?
  let personQuery = `
    {
      person(mongoId: "${id}", cache: false) {
        age
        birthdate
        birthDay
        birthMonth
        birthYear
        campus {
          name
          shortCode
          id
        }
        home {
          city
          country
          id
          zip
          state
          street1
          street2
        }
        firstName
        lastName
        nickName
        email
        phoneNumbers {
          number
          formated
        }
        photo
      }
    }
  `

  return GraphQL.query(personQuery)
    .then(({ person }) => {
      if (person) {
        dispatch(onBoardActions.person(person))
      }

    })

}


const map = (state) => ({ person: state.onBoard.person })
@connect(map)
export default class HomeAddress extends Component {

  state = {
    state: "default"
  }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("CONTENT"))
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }

  updateAddress = (data) => {

    this.setState({ state: "loading" })

    updateHome(data, (err, result) => {

      if (err) {
        this.setState({ state: "error", err: err })
        setTimeout(() => {
          this.setState({ state: "default"})
        }, 3000)
        return
      }


      this.setState({ state: "success" })
      getUser(Meteor.userId(), this.props.dispatch)
        .then(() => {
          this.setState({ state: "default"})
        })

    })


  }

  render () {

    const { home } = this.props.person
    const { state } = this.state

    switch (state) {
      case "error":
        return <Err msg="Looks like there was a problem" error={error} />
      case "loading":
        return <Loading msg="Updating your information..." />
      case "success":
        return <Success msg="Your information has been updated!" />
      default:
        return <Layout home={home} update={this.updateAddress} />
    }

  }
}
