import { Component, PropTypes} from "react"
import Moment from "moment"
import { Link } from "react-router"
// import { VelocityComponent } from "velocity-react"

import { Spinner } from "../../../../core/components/loading"
import Split, { Left, Right } from "../../../../core/blocks/split"
import SideBySide from "../../../../core/components/cards/SideBySide"
import Meta from "../../../../core/components/meta"

import { AccountType } from "../../../components"

export default class Layout extends Component {

  static contextTypes = {
    shouldAnimate: PropTypes.bool
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

    const { schedule, stop, state, person, active, complete } = this.props

    return (

        <div>
          <Split nav={true} classes={["background--light-primary"]}>

            <Meta title="Giving Schedule" />

            <Right background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/heroes/newspring/campuses/Florence.1.2x1_1700_850_90_c1.jpg"
     mobile={false}>

            </Right>
          </Split>
          <Left scroll={true} classes={["background--light-secondary"]} ref="container">

            <div className="soft-double-sides@lap-and-up soft-double-ends@lap-and-up soft background--light-primary">
              <Link to="/give/schedules" className="locked-top locked-left soft-double@lap-and-up soft h7 text-dark-secondary plain" >
                <i className="icon-arrow-back soft-half-right display-inline-block" style={{verticalAlign: "middle"}}></i>
                <span className="display-inline-block" style={{verticalAlign: "middle", marginBottom: "2px"}}>Back</span>
              </Link>
              <div className="text-left soft-double-top hard-left@lap-and-up soft-half-bottom soft@anchored ">
                <div className="soft-double-ends@anchored">
                  {function() {

                    if (!schedule) {
                      // loading
                      return (
                        <div className="text-center soft">
                          <Spinner styles={{width: "40px", height: "40px"}}/>
                        </div>
                      )
                    }

                    return (
                      <div className="text-center">
                        <p className="push-half-bottom"><em>Started on {this.formatDate(schedule.start)}</em></p>

                        <h4 className="text-dark-secondary flush-bottom">{this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}</h4>
                        <h3 className="text-primary">{schedule.details[0].account.name}</h3>

                        <h1 className="text-dark-primary">{this.monentize(schedule.details[0].amount)}</h1>


                        {function() {
                          const detail = schedule.payment
                          if (detail && detail.accountNumber) {
                            return (
                              <h4 className="text-dark-secondary soft-half-top">
                                {detail.accountNumber.slice(-4)}&nbsp;

                                {function() {
                                  if (detail.paymentType && detail.paymentType === "ACH") {
                                    return (
                                      <AccountType width="30px" height="20px" type="Bank"/>
                                    )
                                  } else if (detail.paymentType) {
                                    return (
                                      <AccountType width="30px" height="20px" type={detail.paymentType} />
                                    )
                                  }
                                }()}

                              </h4>
                            )
                          }
                        }()}

                        {(function() {

                          if (complete) {
                            return (
                              <h6 className="text-brand">
                                Schedule Completed
                              </h6>
                            )
                          }



                          if (active) {
                            return (
                              <h6 className="text-alert" onClick={stop} style={{cursor: "pointer"}}>
                                Stop Contribution
                              </h6>
                            )

                          }


                          return (
                            <h6 className="text-brand">
                              Contribution Stopped
                            </h6>
                          )

                        }())}

                        <p className="text-center soft-ends soft-double@anchored flush-bottom soft-ends soft-sides@portable">
                          Thank you so much for your contributions! It is because of your generosity we are able to continue telling stories of the greatness of Jesus and seeing peoples lives changed.
                        </p>
                      </div>
                    )

                  }()}

                </div>
              </div>
            </div>

            <div className="soft-half soft-sides@portable soft-double-sides@anchored">

              <h4 className="soft soft-double-ends text-center@lap-and-up flush-bottom">
                Read Some Recent Stories
              </h4>
              <div className="grid">
                <div className="grid__item one-whole push-half-bottom push-bottom@portable hard-bottom">
                  <SideBySide
                    link="https://newspring.cc/stories/jen-feagles"
                    image={{
                      url: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/stories/JenFeagles.hero_1700_723_90_c1.jpg"
                    }}
                  >
                    <h4 className="push-half-top@portable push-top@anchored">
                      Jennifer Feagles Story
                    </h4>
                    <p>
                      Jennifer Feagles shares about how Jesus gave her more than she could have imagined when she put him first in her…
                    </p>
                    <Link
                      to="https://newspring.cc/stories/jen-feagles"
                      className="h6 btn--small btn--dark-tertiary soft-sides@portable one-whole@handheld"
                    >
                      Watch Story
                    </Link>

                  </SideBySide>
                </div>
                <div className="grid__item one-whole push-half-bottom push-bottom@portable hard-bottom">
                  <SideBySide
                    link="https://newspring.cc/stories/brooke-brissey"
                    image={{
                      url: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/stories/BrookeBrissey_Hero_1700_723_90_c1.jpg"
                    }}
                  >
                    <h4 className="push-half-top@portable push-top@anchored">
                      Brooke Brissey's Story
                    </h4>
                    <p>
                      Brooke Brissey discovered the power of a financial plan to obey God's call on her life. This is her story in her own…                  </p>
                    <Link
                      to="https://newspring.cc/stories/brooke-brissey"
                      className="h6 btn--small btn--dark-tertiary soft-sides@portable one-whole@handheld"
                    >
                      Read Story
                    </Link>

                  </SideBySide>
                </div>
              </div>
            </div>

          </Left>
        </div>
    )
  }
}

  // <div className="soft-ends push-half-ends hard-sides constrain-mobile">
  //
  //
  //   <h3 className="text-dark-tertiary" style={{lineHeight: "1.75"}}>
  //     <span className="text-dark-secondary">
  //       {this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}
  //
  //
  //     </span> using my <span className="text-dark-secondary">
  //       {schedule.payment.paymentType.toLowerCase()}
  //     </span> ending in <span className="text-dark-secondary">
  //       {schedule.payment.accountNumber.slice(-4)}
  //     </span>
  //   </h3>
  //   {() => {
  //     if (state.isActive) {
  //       return (
  //         <button className="btn--alert btn--thin btn--small" onClick={stop}>
  //           Cancel gift
  //         </button>
  //       )
  //     }
  //   }()}
  // </div>
  //
  // <p className="text-center soft-ends soft-double@anchored flush-bottom soft-ends soft-sides@portable">
  //   Thank you so much for your gift! It is because of your generosity we are able to continue telling stories of the greatness of Jesus and seeing peoples lives changed.
  // </p>
