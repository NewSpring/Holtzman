import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import gql from "graphql-tag";

import { nav } from "../../../../core/store"
import { Loading } from "../../../../core/components"

import { give as giveActions } from "../../../../give/store"

import Layout from "./Layout"

const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query PaymentDetails {
        accounts: savedPayments {
          id
          name
          payment {
            id
            accountNumber
            paymentType
          }
        }
      }
    `,
  },
});
let defaultAccounts = []
@connect({ mapQueriesToProps })
export default class GiveNow extends Component {

  state = { accountsRemoved: [] }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("BASIC_CONTENT"))
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }


  remove = (e) => {
    e.preventDefault()
    const { id } = e.target

    let accountsRemoved = [...this.state.accountsRemoved, [id]]

    this.setState({ accountsRemoved: accounts })
    Meteor.call("PaymentAccounts.remove", id, (err, response) => {
      console.log(err, response)
      this.props.data.refetch(); // clear out data store for newly missing account
    })
  }

  render () {
    const { accounts } = this.props.data;
    return <Layout loading={this.props.data.loading} details={accounts} remove={this.remove} />

  }
}
