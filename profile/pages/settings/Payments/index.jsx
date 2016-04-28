import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../../core/graphql"
import { nav } from "../../../../core/store"
import { Loading } from "../../../../core/components"

import { collections as collectionActions } from "../../../../core/store"
import { give as giveActions } from "../../../../give/store"

import Layout from "./Layout"

@connect()
export default class GiveNow extends Component {

  state = {
    accounts: [],
    loaded: false
  }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("BASIC_CONTENT"))
  }

  componentDidMount(){
    let query = `
      query PaymentDetails {
        accounts: allSavedPaymentAccounts(cache: false){
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
    this.props.dispatch(collectionActions.delete("savedAccounts", Number(id)))
    Meteor.call("PaymentAccounts.remove", id, (err, response) => {
      console.log(err, response)
    })
  }

  render () {

    return <Layout details={this.state.accounts} remove={this.remove} />

    // if (!this.state.loaded) {
    //   return (
    //     <div className="locked-ends locked-sides floating">
    //       <div className="floating__item">
    //         <Loading/>
    //       </div>
    //     </div>
    //   )
    // }
    // console.log(this.state)
    // try {
    //   return <Layout details={this.state.accounts} remove={this.remove} />
    // } catch (e) {
    //   console.log(e)
    // }

  }
}
