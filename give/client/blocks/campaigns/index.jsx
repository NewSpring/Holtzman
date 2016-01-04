import { Component, PropTypes} from "react"

import { Card } from "../../../../core/client/components"

export default class Campaigns extends Component {

  getMeteorData() {
    Meteor.subscribe("accounts")
    const accounts = Accounts.find().fetch()
    return {
      accounts
    }
  }

  render () {

  }
}
