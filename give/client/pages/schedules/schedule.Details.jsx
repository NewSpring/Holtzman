import { Component, PropTypes} from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-redux"
import Moment from "moment"
import { Link } from "react-router"

// loading state
import { Spinner } from "../../../../core/client/components/loading"
import { nav as navActions } from "../../../../core/client/actions"
import { Split, Left, Right } from "../../../../core/client/layouts/split"
import { Card } from "../../../../core/client/components"


import { AccountType } from "../../components"
import { ScheduledTransactions } from "../../../lib/collections"

const map = (state) => ({ person: state.onBoard.person })
@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class Details extends Component {

  state = {
    isActive: true
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  getMeteorData() {
    Meteor.subscribe("scheduledTransactions")
    const { id } = this.props.params
    const schedule = ScheduledTransactions.findOne({Id: Number(id)});
    console.log(schedule)
    return {
      schedule
    };

  }

  stop = (e) => {
    e.preventDefault()

    const { Id, GatewayScheduleId } = this.data.schedule
    console.log(Id, GatewayScheduleId)
    this.setState({isActive: false})
    Meteor.call("Give.schedule.cancel", {Id, GatewayScheduleId }, (err, response) => {

    })
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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
              const { schedule } = this.data

              if (!schedule) {
                // loading
                return (
                  <div className="text-center soft">
                    <Spinner styles={{width: "40px", height: "40px"}}/>
                  </div>
                )
              }

              return (

                <div className="soft-ends push-half-ends hard-sides constrain-mobile">


                  <h3 className="text-dark-tertiary" style={{lineHeight: "1.75"}}>
                    <span className="text-dark-secondary">{this.capitalizeFirstLetter(schedule.TransactionFrequencyValue.Description.toLowerCase())}</span>, I give <span className="text-dark-secondary">{this.monentize(schedule.ScheduledTransactionDetails[0].Amount)}</span> to <span className="text-primary">{schedule.ScheduledTransactionDetails[0].Account.PublicName}</span>. This began on <span className="text-dark-secondary">{this.formatDate(schedule.StartDate)}</span> using my <span className="text-dark-secondary">{schedule.FinancialPaymentDetail.CreditCardTypeValue.Description.toLowerCase()}</span> ending in <span className="text-dark-secondary">{schedule.FinancialPaymentDetail.AccountNumberMasked.slice(-4)}</span>
                  </h3>
                  {() => {
                    if (this.state.isActive) {
                      return (
                        <button className="btn--alert btn--thin btn--small" onClick={this.stop}>Stop gift</button>
                      )
                    }
                  }()}

                </div>

              )
            }()}
            <div className="outlined--light outlined--top push-double-ends"></div>
            <p>
              Thank you so much for your gifts! It is because of your generosity we are able to continue telling stories of the greatness of Jesus and seeing peoples lives changed.
            </p>

          </div>



        </Left>
      </Split>
    );
  }
}
