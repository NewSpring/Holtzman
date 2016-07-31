
import { Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import Moment from "moment"
import { Link } from "react-router"

import { Spinner } from "../../../../core/components/loading"
import { Error as ErrIcon } from "../../../../core/components/icons"
import AddSchedule from "../../../blocks/AddSchedule"
import Split, { Left, Right } from "../../../../core/blocks/split"
import Meta from "../../../../core/components/meta"

import Confirm from "../../../blocks/ActionButtons"
import { AccountType } from "../../../components"


export default class Layout extends Component {

  static contextTypes = { shouldAnimate: PropTypes.bool }
  state = { expandedSchedule: null }

  componentWillMount() {
    if (this.props.recoverableSchedules.length) {
      let id = this.props.recoverableSchedules[0].id
      this.setState({
        expandedSchedule: Number(id)
      })
    }
  }

  expandSchedule = (e) => {
    e.preventDefault()

    const { dataset } = e.currentTarget
    const { id } = dataset

    if (this.state.expandedSchedule === Number(id)) {
      this.collapseSchedule()
      return
    }

    this.setState({
      expandedSchedule: Number(id)
    })
  }

  collapseSchedule = () => {
    this.setState({
      expandedSchedule: null
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

    const {
      accounts,
      ready,
      recoverableSchedules,
      cancelSchedule,
      confirm,
      person
    } = this.props

    return (

        <div>
          <Split nav={true} classes={recoverableSchedules.length ? ["background--light-secondary"] : ["background--light-primary"]} >

            <Meta title="Transfer Your Giving Schedule" />

            <Right
              background="//s3.amazonaws.com/ns.assets/apollos/29516.marketing.cen.webad.thebestisyettocome_1x2.png"
              mobile={false}>
            </Right>

          </Split>
          <Left scroll={true} classes={recoverableSchedules.length ? ["background--light-secondary"] : ["background--light-primary"]} ref="container">
            <Link to="/give/schedules" className="locked-top locked-left soft-double@lap-and-up soft h7 text-dark-secondary plain" >
              <i className="icon-arrow-back soft-half-right display-inline-block" style={{verticalAlign: "middle"}}></i>
              <span className="display-inline-block" style={{verticalAlign: "middle", marginBottom: "2px"}}>Back</span>
            </Link>

            {(() => {
              let count = 0
              if (recoverableSchedules && recoverableSchedules.filter(x => !x.gateway).length) {
                return (
                  <div>
                    <div className="background--light-primary soft-half soft-sides@portable soft-double-sides@anchored soft-double-top">
                      <div className="soft-ends soft-double-ends@lap-and-up push-top">
                        <h4 className="soft-half-sides soft-half-bottom">Hey { person.nickName || person.firstName }!</h4>
                        <h5 className="soft-half-sides">
                           We have found giving schedules from our previous giving system that need to be transferred! To transfer a schedule, click below and enter your payment details.
                        </h5>
                      </div>
                    </div>

                    <div className="soft-half soft-sides@portable soft-double-sides@anchored">

                      {/*

                      <h4 className="soft soft-double-bottom text-light-primary text-center flush-bottom soft-double@lap-and-up">
                        Schedules to Transfer
                      </h4>

                      */}
                      {recoverableSchedules.filter(x => !x.gateway).map((schedule, i) => {
                        count ++
                        if (!schedule.details || !schedule.details[0].account) {
                          return null
                        }

                        let arrow = "icon-arrow-down"
                        if (Number(schedule.id) === this.state.expandedSchedule) {
                          arrow = "icon-arrow-up"
                        }
                        return (
                          <div key={i} className="card" >
                            <div className="soft" onClick={this.expandSchedule} data-id={schedule.id} style={{cursor: "pointer"}}>
                              <div className="grid" style={{verticalAlign: "middle"}} key={i}>

                                <div className="grid__item two-thirds" style={{verticalAlign: "middle"}}>
                                  {/*
                                  <div className="display-inline-block soft-right visuallyhidden@handheld" style={{verticalAlign: "middle"}}>
                                    <ErrIcon/>
                                  </div>
                                  */}
                                  <div className="display-inline-block" style={{verticalAlign: "middle"}}>
                                    <h6 className="text-dark-tertiary push-half-bottom">
                                      {this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}
                                    </h6>
                                    <h5 className="flush text-dark">
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
                                </div>

                                <div className="grid__item one-third text-right" style={{verticalAlign: "middle"}}>
                                  <div className="soft-half-right">
                                    <h4 className="text-dark-tertiary flush" style={{paddingRight: "25px"}}>
                                      {this.monentize(schedule.details[0].amount)}
                                      <span className={`text-dark-tertiary ${arrow} locked`} style={{
                                          right: "-3px",
                                          top: "1px"
                                        }}></span>
                                    </h4>
                                  </div>

                                </div>

                              </div>
                            </div>


                            {(() => {
                              if (Number(schedule.id) === this.state.expandedSchedule) {
                                return (
                                  <div className="text-light-primary soft outlined--light outlined--top flush one-whole">
                                    <AddSchedule accounts={accounts} existing={schedule} text="Transfer" onClick={confirm} dataId={schedule.id}/>
                                    <h6
                                      className="outlined--light outlined--bottom display-inline-block text-dark-tertiary push-top"
                                      style={{cursor: "pointer"}}
                                      onClick={cancelSchedule}
                                      data-id={schedule.id}
                                    >
                                      Stop Contribution
                                    </h6>
                                  </div>
                                )
                              }
                            })()}


                          </div>
                        )
                      })}
                      <div className="card">
                        <div className="card__item">
                          <p className="soft text-center soft-double-sides@lap-and-up hard-bottom">
                            <small>
                              <em>
                                Please be aware that your existing schedule will continue to charge the account on file until you transfer it to our new system.
                              </em>
                            </small>
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                )
              }

              return (
                <div>
                  <div className="background--light-primary soft-half soft-sides@portable soft-double-sides@anchored soft-double-ends">
                    <div className="soft soft-double@lap-and-up push-top@lap-and-up">
                      <h2 className="soft-half-bottom">Thank you { person.nickName || person.firstName || "so much" }!</h2>
                      <p>
                        <strong>Your gift matters!</strong>
                      </p>
                      <p>
                        We believe that every number has a name, every name has a story, and every story matters to God. Because you give, we are able to see thousands of life change stories every year at NewSpring Church. There is no organization with more potential to change the world than the local church. Thank you for being a difference maker!                      </p>

                      <p>
                        <em>
                        “Every number has a name, every name has a story, and every story matters to God.”
                        </em>

                        </p>

                    </div>
                  </div>
                </div>

              )
            })()}

          </Left>
        </div>
    );
  }
}
