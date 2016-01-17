import { Component, PropTypes} from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-redux"

import { nav as navActions } from "../../../../core/store"
import { Transactions } from "../../../collections"

import Layout from "./Layout"

const map = (state) => ({ person: state.onBoard.person })
@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class Details extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  getMeteorData() {
    Meteor.subscribe("transactions")
    const { id, account } = this.props.params
    const transaction = Transactions.findOne({Id: Number(id)});

    if (transaction) {
      let { TransactionDetails } = transaction

      if (TransactionDetails.length) {
        for (let detail of TransactionDetails) {

          if (detail.AccountId === Number(account)) {
            TransactionDetails = [detail]
            break
          }
        }
      }
      transaction.TransactionDetails = TransactionDetails

    }

    return {
      transaction
    };

  }


  render () {

    return <Layout transaction={this.data.transaction} person={this.props.person} />
  }
}
