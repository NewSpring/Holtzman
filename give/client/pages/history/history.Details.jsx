import { Component, PropTypes} from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-redux"
import Moment from "moment"
import { Link } from "react-router"

// loading state
import { Loading } from "../../../../core/client/components"
import { nav as navActions } from "../../../../core/client/actions"
import { Split, Left, Right } from "../../../../core/client/layouts/split"
import { Card } from "../../../../core/client/components"


import { AccountType } from "../../components"
import { Transactions } from "../../../lib/collections"

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
    const { id } = this.props.params
    const transaction = Transactions.findOne({Id: Number(id)});

    return {
      transaction
    };

  }

  formatDate = (date) => {
    return Moment(date).format("MMM D, YYYY")
  }

  monentize = (value, fixed) => {

    if (typeof value === "number") {
      value = `${value}`
    }

    if (!value.length) {
      return `$0.00`
    }

    value = value.replace(/[^\d.-]/g, "")

    let decimals = value.split(".")[1]
    if ((decimals && decimals.length >= 2) || fixed) {
      value = Number(value).toFixed(2)
      value = String(value)
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `$${value}`
  }


  render () {

    return (

      <Split nav={true} >
        <Right background="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/series_newspring/v4.sermonseries.graphics.1to1.more_1700_1700_90_c1_1700_1700_90_c1.jpg"
 mobile={false}>

        </Right>

        <Left scroll={true} ref="container">

          <div className="constrain-copy soft soft-double@lap-and-up push-double@lap-and-up" >
            {() => {
              const { transaction } = this.data
              const { person } = this.props
              console.log(transaction)
              if (!transaction) {
                // loading
                return (
                  <div>
                    Loading...
                  </div>
                )
              }

              return (
                <div className="text-center push-bottom@lap-and-up">
                  <p className="push-half-bottom"><em>{this.formatDate(transaction.CreatedDateTime)}</em></p>
                  <h3 className="text-dark-secondary">{transaction.TransactionDetails[0].Account.PublicName}</h3>

                  <h1 className="text-dark-primary">{this.monentize(transaction.TransactionDetails[0].Amount)}</h1>

                  <h6 className="push-bottom text-dark-tertiary">{person.FirstName} {person.LastName}</h6>

                  {() => {
                    const detail = transaction.FinancialPaymentDetail
                    if (detail.AccountNumberMasked) {
                      return (
                        <h4 className="text-dark-secondary">
                          {detail.AccountNumberMasked.replace(/\*/g, "")}
                          <AccountType width="30px" height="20px" type={detail.CreditCardTypeValue.Value}/>
                        </h4>
                      )
                    }
                  }()}
                </div>
              )
            }()}

            <div className="outlined--light outlined--top push-double-ends"></div>
            <p>
              Thank you so much for your gift! It is because of your generosity we are able to continue telling stories of the greatness of Jesus and seeing peoples lives changed.
            </p>
            <h3>Read Some Recent Stories</h3>
            <div className="grid">
              <div className="grid__item one-whole one-half@anchored">
                <Card
                  link="https://newspring.cc/stories/jen-feagles"
                  image={{
                    url: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/stories/JenFeagles.hero_1700_723_90_c1.jpg"
                  }}
                >
                  <h4>Jennifer Feagles Story</h4>
                  <p>
                    Jennifer Feagles shares about how Jesus gave her more than she could have imagined when she put him first in her…
                  </p>
                  <Link
                    to="https://newspring.cc/stories/jen-feagles"
                    className="h6 btn--small btn--dark-tertiary soft-sides@portable"
                  >
                    Watch Story
                  </Link>

                </Card>
              </div>
              <div className="grid__item one-whole one-half@anchored">
                <Card
                  link="https://newspring.cc/stories/brooke-brissey"
                  image={{
                    url: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/stories/BrookeBrissey_Hero_1700_723_90_c1.jpg"
                  }}
                >
                  <h4>Brooke Brissey's Story</h4>
                  <p>
                    Brooke Brissey discovered the power of a financial plan to obey God's call on her life. This is her story in her own…                  </p>
                  <Link
                    to="https://newspring.cc/stories/brooke-brissey"
                    className="h6 btn--small btn--dark-tertiary soft-sides@portable"
                  >
                    Read Story
                  </Link>

                </Card>
              </div>
            </div>
          </div>



        </Left>
      </Split>
    );
  }
}
