
import { Component, PropTypes} from "react"
import ReactDom from "react-dom"

import Moment from "moment"
import { Link } from "react-router"

import { Spinner } from "../../../core/components/loading"
import { AddSchedule } from "../../blocks"
import Split, { Left, Right } from "../../../core/blocks/split"

import Confirm from "../../blocks/ActionButtons"

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

    const {
      schedules,
      accounts,
      ready,
      recoverableSchedules,
      cancelSchedule,
      confirm,
    } = this.props

    return (

      <Split nav={true} >
        <Right
          background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/giveyourbrainabreak2_1000_1000_90.jpg"
          mobile={false}>
        </Right>

        <Left scroll={true} ref="container">


          <div className="constrain-copy soft-double-sides@lap-and-up soft-double@lap-and-up soft">

            <div className="text-left soft-double-top hard-left@lap-and-up soft-half-bottom">
                <AddSchedule accounts={accounts}/>
              </div>

          </div>

          {(() => {
            let count = 0
            if (recoverableSchedules.length) {
              return (
                <div className="background--light-secondary">
                  <div className="constrain-copy soft soft-double-sides@lap-and-up hard-top" ref="history">
                    <h4 className="soft-double-top text-center">Gifts to Recover</h4>

                      {recoverableSchedules.map((schedule, i) => {
                        count ++
                        if (!schedule.details[0].account) {
                          return null
                        }

                        let classes = "soft-ends push-half-ends hard-sides constrain-mobile"
                        if (count != recoverableSchedules.length) {
                          classes += " outlined--light outlined--bottom"
                        }
                        return (
                          <div key={i} className={classes}>


                            <h4 className="text-dark-tertiary" style={{lineHeight: "1.75"}}>
                              <span className="text-dark-secondary">
                                {this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}
                              </span>, I give <span className="text-dark-secondary">
                                {this.monentize(schedule.details[0].amount)}
                              </span> to <span className="text-primary">
                                {schedule.details[0].account.name}
                              </span>. This began on <span className="text-dark-secondary">
                                {this.formatDate(schedule.start)}.
                              </span>
                            </h4>

                            <Confirm
                              text="Confirm"
                              classes={["one-whole@handheld push-half-top"]}
                              onClick={confirm}
                              value={schedule.id}
                            />

                            <button
                              className="btn btn-alert btn--small text-alert one-whole@handheld push-half-top@handheld"
                              data-id={schedule.id}
                              onClick={cancelSchedule}
                            >
                              Cancel Schedule
                            </button>

                          </div>

                        )
                      })}


                  </div>
                </div>
              )
            }
          }())}

          <div className="constrain-copy soft soft-double-sides@lap-and-up hard-top outlined--light outlined--top" ref="history">
            <h4 className="soft-double-top text-center">My Active Gifts</h4>
            {() => {

              if (!schedules.length && !ready) {
                // loading
                return (
                  <div className="text-center soft">
                    <Spinner styles={{width: "40px", height: "40px"}}/>
                  </div>
                )
              }

              if (!schedules.length && ready) {
                return (
                  <div className="text-center soft">
                    <p><em>You don't have any active recurring gifts</em></p>
                  </div>
                )

              }


              return (
                <div>
                  {schedules.map((schedule, i) => {

                    if (!schedule.details[0].account) {
                      return null
                    }
                    return (
                      <div key={i} className="soft-ends push-half-ends hard-sides outlined--light outlined--bottom constrain-mobile">


                        <h4 className="text-dark-tertiary" style={{lineHeight: "1.75"}}>
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
                        </h4>

                        <Link to={`/give/recurring/${schedule.id}`} className="btn">
                          View Details
                        </Link>

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
