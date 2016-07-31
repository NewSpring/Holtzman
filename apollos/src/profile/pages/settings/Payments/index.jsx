import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import gql from "graphql-tag";

import { nav } from "../../../../core/store"
import { Loading } from "../../../../core/components"

import { give as giveActions } from "../../../../give/store"

import Layout from "./Layout"

// XXX remove cache: false once we feel good about caching
const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query PaymentDetails {
        accounts: savedPayments(cache: false) {
          id: entityId
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

  state = { accounts: [] }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("BASIC_CONTENT"))
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }

  componentWillReceiveProps(nextProps){
    if (this.props.data.loading && !nextProps.data.loading) {
      this.setState({ accounts: nextProps.data.accounts })
    }
  }


  remove = (e) => {
    e.preventDefault()
    const { id } = e.target

    let accounts = this.state.accounts.filter(x => x.id != id);

    this.setState({ accounts })
    Meteor.call("PaymentAccounts.remove", id, (err, response) => {
      // XXX mutation
      this.props.data.refetch(); // clear out data store for newly missing account
    })
  }

  render () {
    const { accounts } = this.state;
    return <Layout loading={this.props.data.loading} details={accounts} remove={this.remove} />

  }
}
