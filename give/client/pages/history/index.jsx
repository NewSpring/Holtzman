import { Component, PropTypes} from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"
import Moment from "moment"

// loading state
import { Loading } from "../../../../core/client/components"
import { nav as navActions } from "../../../../core/client/actions"
import { Split, Left, Right } from "../../../../core/client/layouts/split"

import { Transactions } from "../../../lib/collections"

@connect()
@ReactMixin.decorate(ReactMeteorData)
export default class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  getMeteorData() {
    Meteor.subscribe("transactions")
    const transactions = Transactions.find({}, {
      limit: 30,
      sort: { CreatedDateTime: -1 }
    }).fetch();

    return {
      transactions
    };

  }

  formatDate = (date) => {
    return Moment(date).format("MMM D, YYYY")
  }


  render () {
    // console.log(Moment)

    return (

      <Split nav={true}>
        <Right background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/_fpo/NScollege-cip-0033_1700_1133_90_c1.jpg"
 mobile={false}>
        </Right>

        <Left scroll={true} >
          <div className="constrain-copy soft-double@lap-and-up">
            <div className="soft soft-double-top@lap-and-up">
              <h2 className="flush hard">Giving History</h2>
            </div>
          </div>


          <div className="background--light-secondary">
            <div className="constrain-copy soft@lap-and-up">
              <div className="soft">
              </div>
            </div>
          </div>

          <div className="constrain-copy soft soft-double-sides@lap-and-up">
            {() => {
              const { transactions } = this.data

              if (!transactions || !transactions.length) {
                // loading
                return (
                  <div>
                    Loading...
                  </div>
                )
              }

              return (
                <div>
                  {this.data.transactions.map((transaction, i) => {

                    return (
                      <div key={i} className="soft-ends push-half-ends hard-sides outlined--light outlined--bottom constrain-mobile">

                        <div to={`/give/history/${transaction.Id}`}>

                          <div className="grid" style={{verticalAlign: "middle"}}>

                            <div className="grid__item five-eighths" style={{verticalAlign: "middle"}}>
                              <h5 className="text-dark-tertiary flush">
                                {transaction.TransactionDetails[0].Account.PublicName}
                              </h5>
                              <p className="flush soft-half-top italic small text-dark-tertiary">
                                {this.formatDate(transaction.CreatedDateTime)}
                              </p>
                            </div>

                            <div className="grid__item three-eighths text-right" style={{verticalAlign: "middle"}}>
                              <h4 className="text-dark-tertiary flush">
                                ${transaction.TransactionDetails[0].Amount}
                              </h4>

                            </div>

                          </div>

                        </div>

                      </div>

                    )
                  })}

                </div>
              )
            }()}
          </div>


        </Left>
      </Split>
    );
  }
}


const Routes = [
  { path: "history", component: Template }
]

export default {
  Template,
  Routes
}
