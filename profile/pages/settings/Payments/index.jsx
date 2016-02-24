import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../../core/graphql"
import { nav } from "../../../../core/store"
import { Loading } from "../../../../core/components"

import { give as giveActions } from "../../../../give/store"

import Layout from "./Layout"

@connect()
export default class GiveNow extends Component {

  state = {
    accounts: [],
    loaded: false
  }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("CONTENT"))
  }

  componentDidMount(){
    let query = `
      query PaymentDetails($mongoId: String){
        accounts: allSavedPaymentAccounts(mongoId: $mongoId, cache: false){
          id
          name
          payment {
            id
            accountNumber
            paymentType
          }
        }
      }
    `

    return GraphQL.query(query)
      .then(({ accounts }) => {
        this.setState({ accounts, loaded: true })
      })
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }


  remove = (e) => {
    e.preventDefault()

    const { id } = e.target

    let accounts = this.state.accounts.filter((x) => (
      x.id != id
    ))

    this.setState({ accounts: accounts })
    this.props.dispatch(giveActions.clearAccount())
    Meteor.call("PaymentAccounts.remove", id, (err, response) => {
      console.log(err, response)
    })
  }

  render () {

    if (!this.state.loaded) {
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading/>
          </div>
        </div>
      )
    }

    return <Layout details={this.state.accounts} remove={this.remove} />
  }
}
