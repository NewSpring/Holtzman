import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Link } from "react-router"

import { api, endpoints } from "../../../../rock/lib/api"
import { Split, Left, Right } from "../../../../core/client/layouts/split"
import { Card } from "../../../../core/client/components"
import { Spinner } from "../../../../core/client/components/loading"

import { give as giveActions } from "../../actions"
import { Accounts as Acc } from "../../../lib/collections"
import { AddToCart } from "../../blocks"

const mapArrayToObj = (array) => {
  let obj = {}

  for (let item of array) {
    obj[item.Id] = item
  }

  return obj
}

const bindAccounts = (props) => {
  const { dispatch } = props

  let handle = {}
  Tracker.autorun((computation) => {
    // return computation for dismount
    handle = computation

    // subscribe to sections
    Meteor.subscribe("accounts")
    let accounts = Acc.find().fetch()

    // persist in the store
    dispatch(giveActions.setAccounts(mapArrayToObj(accounts)))

  })

  return { handle }

}

const map = (state) => ({ accounts: state.give.accounts })

@connect(map)
export default class Home extends Component {

  componentWillMount(){

    // if (Meteor.isServer) {
    //   let accounts = api.get.sync(endpoints.accounts)
    //   this.props.dispatch(giveActions.setAccounts(mapArrayToObj(accounts)))
    // }

    if (Meteor.isClient) {
      let { handle } = bindAccounts(this.props)
      this.handle = handle
    }

  }

  componentWillUnmount(){
    if (this.handle) {
      this.handle.stop()
    }

  }



  render () {
    let accounts = []
    for (let account in this.props.accounts) {
      accounts.push(this.props.accounts[account])
    }



    return (
      <Split nav={true}>

        <Right
          background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/giveyourbrainabreak2_1000_1000_90.jpg">
        </Right>

        <Left scroll={true} >
          <div className="soft soft-double@lap-and-up push-double@lap-wide-and-up">

            <div className="text-left">

              {() => {
                if (!accounts.length) {
                  return (
                    <div className="one-whole text-center soft-ends">
                      <Spinner styles={{width: "40px", height: "40px"}}/>
                    </div>
                  )
                }

                return (
                  <AddToCart
                    accounts={accounts}
                  />
                )
              }()}


            </div>

            <div className="soft-double-ends@lap-and-up">
             <div className="outlined--light outlined--top push-double-ends"></div>
           </div>

            <h4 className="push-bottom@lap-and-up">Or, give to one of our campaigns...</h4>
            <div className="grid">
              {() => {
                if (!accounts.length) {
                  return (
                    <div className="one-whole text-center soft-ends">
                      <Spinner styles={{width: "40px", height: "40px"}}/>
                    </div>
                  )
                }
              }()}
              {accounts.map((account, i) => {
                if (!account.Url || !account.Description) {
                  return null
                }

                return (
                  <div key={i} className="grid__item one-whole one-half@anchored push-bottom">
                    <Card
                      link={`/give/campaign/${encodeURI(account.Name)}`}
                      image={{
                        url: account.Url
                      }}
                    >
                      <h4>{account.PublicName || account.Name}</h4>
                      <p>
                        {account.Description}
                      </p>
                      <Link
                        to={`/give/campaign/${encodeURI(account.Name)}`}
                        className="h6 btn--small btn--dark-tertiary soft-sides@portable"
                      >
                        Learn more
                      </Link>

                    </Card>
                  </div>
                )
              })}
            </div>

          </div>
        </Left>

      </Split>

    )
  }
}
