import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Link } from "react-router"

import { Accounts } from "../../../lib/collections"
import { Split, Left, Right } from "../../../../core/client/layouts/split"

import { Card } from "../../../../core/client/components"

@connect()
@ReactMixin.decorate(ReactMeteorData)
export default class Home extends Component {

  getMeteorData() {
    Meteor.subscribe("accounts")
    const accounts = Accounts.find().fetch()
    return {
      accounts
    }
  }

  showModal = () => {
    this.props.dispatch(modal.render(OnBoard))
    this.props.dispatch(modal.show())
  }

  render () {
    return (
      <Split nav={true}>

        <Right
          background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/giveyourbrainabreak2_1000_1000_90.jpg">
        </Right>

        <Left scroll={true} >
          <div className="soft soft-double@lap-and-up push-double@lap-wide-and-up">

            <div className="soft-double-ends@lap-and-up">
             <div className="outlined--light outlined--top push-double-ends"></div>
           </div>

            <h4 className="push-bottom@lap-and-up">Or, give to one of our campaigns...</h4>
            <div className="grid">
              {this.data.accounts.map((account, i) => {
                if (!account.Url || !account.Description) {
                  return null
                }

                return (
                  <div key={i} className="grid__item one-whole one-half@lap-and-up">
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
