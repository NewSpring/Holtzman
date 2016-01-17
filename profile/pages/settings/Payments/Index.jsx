import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { nav } from "../../../../core/store"
import { Loading } from "../../../../core/components"

import { PaymentDetails } from "../../../../give/collections"

import Layout from "./Layout"

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/
@connect()
@ReactMixin.decorate(ReactMeteorData)
export default class GiveNow extends Component {

  componentWillMount(){
    this.props.dispatch(nav.setLevel("CONTENT"))
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }

  getMeteorData() {
    let paymentDetails

    Meteor.subscribe("paymentDetails")

    return {
      paymentDetails: PaymentDetails.find().fetch()
    }
  }

  remove = (e) => {
    e.preventDefault()

    const { id } = e.target

    Meteor.call("PaymentAccounts.remove", id, (err, response) => {
      console.log(err, response)
    })
  }

  render () {

    if (!this.data.paymentDetails) {
      return <Loading/>
    }

    return <Layout details={this.data.paymentDetails} remove={this.remove} />
  }
}
