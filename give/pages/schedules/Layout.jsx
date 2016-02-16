
import { Component, PropTypes} from "react"
import ReactDom from "react-dom"
import Meta from "react-helmet"
import Moment from "moment"
import { Link } from "react-router"

import { Spinner } from "../../../core/components/loading"
import { AddSchedule } from "../../blocks"
import Split, { Left, Right } from "../../../core/blocks/split"

import Confirm from "../../blocks/ActionButtons"
import { AccountType } from "../../components"


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

        <Meta
          title="Reccuring Giving"
          titleTemplate="%s | NewSpring Church"
        />

        <Right
          background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/giveyourbrainabreak2_1000_1000_90.jpg"
          mobile={false}>
        </Right>

        <Left scroll={true} classes={["background--light-secondary"]} ref="container">
          <div className="soft-double-sides@lap-and-up soft-double-ends@lap-and-up soft background--light-primary">
            <div className="text-left soft-double-top hard-left@lap-and-up soft-half-bottom soft@anchored ">
              <div className="soft-double-ends@anchored">
                <AddSchedule accounts={accounts}/>
              </div>
            </div>
          </div>

          <div className="soft-half soft-sides@portable soft-double-sides@anchored soft-double-bottom@anchored soft-bottom@portable">
            <h4 className="soft soft-double-ends text-center@lap-and-up flush-bottom">
              My Gifts
            </h4>

            {(() => {
              let count = 0
              if (recoverableSchedules.length) {
                return (
                  <div>
                    {recoverableSchedules.map((schedule, i) => {
                      count ++
                      if (!schedule.details[0].account) {
                        return null
                      }

                      return (
                        <div key={i} className="card">
                          <div className="soft">
                            <div className="grid " style={{verticalAlign: "middle"}} key={i}>

                              <div className="grid__item two-thirds" style={{verticalAlign: "middle"}}>
                                <h6 className="text-dark-tertiary push-half-bottom">
                                  {this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}
                                </h6>
                                <h5 className="flush text-primary">
                                  {schedule.details[0].account.name}
                                </h5>
                                <p className="flush soft-half-top text-dark-tertiary">
                                  <small>
                                    <em>
                                      This began on {this.formatDate(schedule.start)}
                                    </em>
                                  </small>
                                </p>

                              </div>

                              <div className="grid__item one-third text-right" style={{verticalAlign: "middle"}}>
                                <div className="soft-half-right">
                                  <h4 className="text-dark-tertiary flush">
                                    {this.monentize(schedule.details[0].amount)}
                                  </h4>
                                </div>

                              </div>

                            </div>
                          </div>

                          <div className="grid flush one-whole">
                            <Confirm
                              theme="soft h6 grid__item one-half background--primary text-light-primary"
                              onClick={confirm}
                              value={schedule.id}
                              text="Recover"
                              hideCard={true}
                              style={{margin: 0}}
                            />
                            <button className="hard grid__item one-half background--alert" onClick={cancelSchedule} data-id={schedule.id}>
                              <h6 className="soft flush text-light-primary">Cancel</h6>
                            </button>
                          </div>


                        </div>
                      )
                    })}
                    <p className="soft text-center">
                      <small>
                        <em>
                          The gifts above need recovering to continue. This may be because of a payment exipration, or this gift has not been reactived since we moved giving platforms.
                        </em>
                      </small>
                    </p>
                  </div>

                )
              }
            }())}

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
                  <div className="text-center soft-sides">
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
                      <div key={i} className="soft card">

                        <Link to={`/give/recurring/${schedule.id}`}>

                          <div className="grid" style={{verticalAlign: "middle"}} key={i}>

                            <div className="grid__item two-thirds" style={{verticalAlign: "middle"}}>
                              <h6 className="text-dark-tertiary push-half-bottom">
                                {this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}
                              </h6>
                              <h5 className="flush">
                                {schedule.details[0].account.name}
                              </h5>
                              <p className="flush soft-half-top text-dark-tertiary">
                                <small>
                                  <em>
                                    This started on {this.formatDate(schedule.start)}
                                  </em>
                                </small>
                              </p>

                            </div>


                            <div className="grid__item one-third text-right" style={{verticalAlign: "middle"}}>
                              <div className="soft-half-right">
                                <h4 className="text-dark-tertiary flush soft-right@handheld soft-double-right@lap-and-up">
                                  {this.monentize(schedule.details[0].amount)}
                                  <span className="text-primary icon-arrow-next locked" style={{
                                      right: "-5px",
                                      top: "1px"
                                    }}></span>
                                </h4>
                              </div>

                            </div>

                          </div>
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
