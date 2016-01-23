import { Component, PropTypes} from "react"
import Moment from "moment"
import { Link } from "react-router"

import { Spinner } from "../../../../core/components/loading"
import Split, { Left, Right } from "../../../../core/blocks/split"
import { Card } from "../../../../core/components"

import { AccountType } from "../../../components"

export default class Layout extends Component {

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

    const { schedule, stop, state } = this.props

    return (
      <Split nav={true} >
        <Right background="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/series_newspring/v4.sermonseries.graphics.1to1.more_1700_1700_90_c1_1700_1700_90_c1.jpg"
 mobile={false}>

        </Right>

        <Left scroll={true} ref="container">

          <div className="constrain-copy soft soft-double@lap-and-up push-double@lap-and-up" >

            {() => {

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
                    <span className="text-dark-secondary">
                      {this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}
                    </span>, I give <span className="text-dark-secondary">
                      {this.monentize(schedule.details[0].amount)}
                    </span> to <span className="text-primary">
                      {schedule.details[0].account.name}
                    </span>. This began on <span className="text-dark-secondary">
                      {this.formatDate(schedule.start)}
                    </span> using my <span className="text-dark-secondary">
                      {schedule.payment.paymentType.toLowerCase()}
                    </span> ending in <span className="text-dark-secondary">
                      {schedule.payment.accountNumber.slice(-4)}
                    </span>
                  </h3>
                  {() => {
                    if (state.isActive) {
                      return (
                        <button className="btn--alert btn--thin btn--small" onClick={stop}>Stop gift</button>
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
    )
  }
}
