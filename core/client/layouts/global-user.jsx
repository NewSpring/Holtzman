import { Component, PropTypes} from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-redux"

import Global from "./global"
import { storeRoutes } from "../../lib/store"
import { onBoard as onBoardActions } from "../actions"

import { onBoard } from "../../../rock/client/middlewares"
import { addMiddleware } from "../middlewares"

addMiddleware(
  onBoard
)

@connect()
@ReactMixin.decorate(ReactMeteorData)
class Layout extends Component {

  getMeteorData() {

    const user = Meteor.user()

    if (user && (this.data.user && user._id != this.data.user._id) || (!this.data.user)) {
      Meteor.subscribe("people")
      this.setLoggedIn(user)
    } else if (!user) {
      this.setLoggedIn(null)
    }

    return {
      user
    }
  }

  setLoggedIn = (user) => {
    this.props.dispatch(onBoardActions.authorize(user != null))
  }

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
