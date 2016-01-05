import { Component, PropTypes} from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-redux"

import Global from "./global"
import { storeRoutes } from "../../../lib/store"
import { onBoard as onBoardActions } from "../../actions"
import { People } from "../../../../rock/lib/collections"

import { onBoard } from "../../../../rock/client/middlewares"
import { addMiddleware } from "../../middlewares"

addMiddleware(
  onBoard
)

const bindMeteorPerson = (props) => {
  const { dispatch } = props

  let handle = {}
  Tracker.autorun((computation) => {
    handle = computation

    const user = Meteor.user()
    if (user) {
      Meteor.subscribe("people")
      dispatch(onBoardActions.person(People.find().fetch()[0]))

    }

    props.dispatch(onBoardActions.authorize(user != null))

  })

  return { handle }

}

@connect()
class Layout extends Component {

  componentWillMount(){
    let { handle, authorized } = bindMeteorPerson(this.props)
    this.handle = handle

  }

  componentWillUnmount(){
    this.handle.stop()
  }

  // getMeteorData() {
  //
  //   const user = Meteor.user()
  //
  //   if (user && (this.data.user && user._id != this.data.user._id) || (!this.data.user)) {
  //     Meteor.subscribe("people")
  //     this.setLoggedIn(user)
  //   } else if (!user) {
  //     this.setLoggedIn(null)
  //   }
  //
  //   return {
  //     user
  //   }
  // }
  //
  // setLoggedIn = (user) => {
  //   this.props.dispatch(onBoardActions.authorize(user != null))
  // }

  render() { return this.props.children }

}

class App extends Component {
  render () {
    return (
      <Global>
        <Layout>
          {this.props.children}
        </Layout>
      </Global>
    )

  }
}

export default App
