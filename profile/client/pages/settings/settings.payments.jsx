import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { nav } from "../../../../core/client/actions"
import { Loading } from "../../../../core/client/components"

import { PaymentDetails } from "../../../../give/lib/collections"
import { AccountType } from "../../../../give/client/components"

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


  render () {

    if (!this.data.paymentDetails) {
      return (
        <Loading/>
      )
    }

    return (
      <div className="text-center push-double-top soft-double-top@lap-and-up">
        <div className="one-whole two-thirds@anchored display-inline-block">
          <h3>Saved Accounts</h3>
          <div className="soft-sides soft-double-sides@lap-and-up">
            {this.data.paymentDetails.map((account, key) => {
              return (
                <div key={key} className="soft-ends text-left hard-sides outlined--light outlined--bottom constrain-mobile">
                  <h6 className="soft-half-bottom flush-bottom">{account.Name}</h6>

                  <h5 className="hard one-whole">{account.FinancialPaymentDetail.AccountNumberMasked} <span className="float-right soft-half-right"><AccountType width="30px" height="20px" type={account.FinancialPaymentDetail.CreditCardTypeValue.Value}/></span></h5>

                </div>
              )
            })}

            <p className="soft-ends text-left">
              To add a saved account, click the option to save account on your next gift!
            </p>
          </div>

        </div>

      </div>

    )
  }
}
